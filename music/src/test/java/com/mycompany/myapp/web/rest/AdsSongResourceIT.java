package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.MusicApp;
import com.mycompany.myapp.domain.AdsSong;
import com.mycompany.myapp.repository.AdsSongRepository;
import com.mycompany.myapp.repository.search.AdsSongSearchRepository;
import com.mycompany.myapp.service.AdsSongService;
import com.mycompany.myapp.service.dto.AdsSongDTO;
import com.mycompany.myapp.service.mapper.AdsSongMapper;
import com.mycompany.myapp.web.rest.errors.ExceptionTranslator;
import com.mycompany.myapp.service.dto.AdsSongCriteria;
import com.mycompany.myapp.service.AdsSongQueryService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.Collections;
import java.util.List;

import static com.mycompany.myapp.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link AdsSongResource} REST controller.
 */
@SpringBootTest(classes = MusicApp.class)
public class AdsSongResourceIT {

    private static final String DEFAULT_CONTENT = "AAAAAAAAAA";
    private static final String UPDATED_CONTENT = "BBBBBBBBBB";

    private static final String DEFAULT_IMAGE = "AAAAAAAAAA";
    private static final String UPDATED_IMAGE = "BBBBBBBBBB";

    private static final Integer DEFAULT_SONG_ID = 1;
    private static final Integer UPDATED_SONG_ID = 2;
    private static final Integer SMALLER_SONG_ID = 1 - 1;

    @Autowired
    private AdsSongRepository adsSongRepository;

    @Autowired
    private AdsSongMapper adsSongMapper;

    @Autowired
    private AdsSongService adsSongService;

    /**
     * This repository is mocked in the com.mycompany.myapp.repository.search test package.
     *
     * @see com.mycompany.myapp.repository.search.AdsSongSearchRepositoryMockConfiguration
     */
    @Autowired
    private AdsSongSearchRepository mockAdsSongSearchRepository;

    @Autowired
    private AdsSongQueryService adsSongQueryService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restAdsSongMockMvc;

    private AdsSong adsSong;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AdsSongResource adsSongResource = new AdsSongResource(adsSongService, adsSongQueryService);
        this.restAdsSongMockMvc = MockMvcBuilders.standaloneSetup(adsSongResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static AdsSong createEntity(EntityManager em) {
        AdsSong adsSong = new AdsSong()
            .content(DEFAULT_CONTENT)
            .image(DEFAULT_IMAGE)
            .songId(DEFAULT_SONG_ID);
        return adsSong;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static AdsSong createUpdatedEntity(EntityManager em) {
        AdsSong adsSong = new AdsSong()
            .content(UPDATED_CONTENT)
            .image(UPDATED_IMAGE)
            .songId(UPDATED_SONG_ID);
        return adsSong;
    }

    @BeforeEach
    public void initTest() {
        adsSong = createEntity(em);
    }

    @Test
    @Transactional
    public void createAdsSong() throws Exception {
        int databaseSizeBeforeCreate = adsSongRepository.findAll().size();

        // Create the AdsSong
        AdsSongDTO adsSongDTO = adsSongMapper.toDto(adsSong);
        restAdsSongMockMvc.perform(post("/api/ads-songs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(adsSongDTO)))
            .andExpect(status().isCreated());

        // Validate the AdsSong in the database
        List<AdsSong> adsSongList = adsSongRepository.findAll();
        assertThat(adsSongList).hasSize(databaseSizeBeforeCreate + 1);
        AdsSong testAdsSong = adsSongList.get(adsSongList.size() - 1);
        assertThat(testAdsSong.getContent()).isEqualTo(DEFAULT_CONTENT);
        assertThat(testAdsSong.getImage()).isEqualTo(DEFAULT_IMAGE);
        assertThat(testAdsSong.getSongId()).isEqualTo(DEFAULT_SONG_ID);

        // Validate the AdsSong in Elasticsearch
        verify(mockAdsSongSearchRepository, times(1)).save(testAdsSong);
    }

    @Test
    @Transactional
    public void createAdsSongWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = adsSongRepository.findAll().size();

        // Create the AdsSong with an existing ID
        adsSong.setId(1L);
        AdsSongDTO adsSongDTO = adsSongMapper.toDto(adsSong);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAdsSongMockMvc.perform(post("/api/ads-songs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(adsSongDTO)))
            .andExpect(status().isBadRequest());

        // Validate the AdsSong in the database
        List<AdsSong> adsSongList = adsSongRepository.findAll();
        assertThat(adsSongList).hasSize(databaseSizeBeforeCreate);

        // Validate the AdsSong in Elasticsearch
        verify(mockAdsSongSearchRepository, times(0)).save(adsSong);
    }


    @Test
    @Transactional
    public void getAllAdsSongs() throws Exception {
        // Initialize the database
        adsSongRepository.saveAndFlush(adsSong);

        // Get all the adsSongList
        restAdsSongMockMvc.perform(get("/api/ads-songs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(adsSong.getId().intValue())))
            .andExpect(jsonPath("$.[*].content").value(hasItem(DEFAULT_CONTENT)))
            .andExpect(jsonPath("$.[*].image").value(hasItem(DEFAULT_IMAGE)))
            .andExpect(jsonPath("$.[*].songId").value(hasItem(DEFAULT_SONG_ID)));
    }
    
    @Test
    @Transactional
    public void getAdsSong() throws Exception {
        // Initialize the database
        adsSongRepository.saveAndFlush(adsSong);

        // Get the adsSong
        restAdsSongMockMvc.perform(get("/api/ads-songs/{id}", adsSong.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(adsSong.getId().intValue()))
            .andExpect(jsonPath("$.content").value(DEFAULT_CONTENT))
            .andExpect(jsonPath("$.image").value(DEFAULT_IMAGE))
            .andExpect(jsonPath("$.songId").value(DEFAULT_SONG_ID));
    }


    @Test
    @Transactional
    public void getAdsSongsByIdFiltering() throws Exception {
        // Initialize the database
        adsSongRepository.saveAndFlush(adsSong);

        Long id = adsSong.getId();

        defaultAdsSongShouldBeFound("id.equals=" + id);
        defaultAdsSongShouldNotBeFound("id.notEquals=" + id);

        defaultAdsSongShouldBeFound("id.greaterThanOrEqual=" + id);
        defaultAdsSongShouldNotBeFound("id.greaterThan=" + id);

        defaultAdsSongShouldBeFound("id.lessThanOrEqual=" + id);
        defaultAdsSongShouldNotBeFound("id.lessThan=" + id);
    }


    @Test
    @Transactional
    public void getAllAdsSongsByContentIsEqualToSomething() throws Exception {
        // Initialize the database
        adsSongRepository.saveAndFlush(adsSong);

        // Get all the adsSongList where content equals to DEFAULT_CONTENT
        defaultAdsSongShouldBeFound("content.equals=" + DEFAULT_CONTENT);

        // Get all the adsSongList where content equals to UPDATED_CONTENT
        defaultAdsSongShouldNotBeFound("content.equals=" + UPDATED_CONTENT);
    }

    @Test
    @Transactional
    public void getAllAdsSongsByContentIsNotEqualToSomething() throws Exception {
        // Initialize the database
        adsSongRepository.saveAndFlush(adsSong);

        // Get all the adsSongList where content not equals to DEFAULT_CONTENT
        defaultAdsSongShouldNotBeFound("content.notEquals=" + DEFAULT_CONTENT);

        // Get all the adsSongList where content not equals to UPDATED_CONTENT
        defaultAdsSongShouldBeFound("content.notEquals=" + UPDATED_CONTENT);
    }

    @Test
    @Transactional
    public void getAllAdsSongsByContentIsInShouldWork() throws Exception {
        // Initialize the database
        adsSongRepository.saveAndFlush(adsSong);

        // Get all the adsSongList where content in DEFAULT_CONTENT or UPDATED_CONTENT
        defaultAdsSongShouldBeFound("content.in=" + DEFAULT_CONTENT + "," + UPDATED_CONTENT);

        // Get all the adsSongList where content equals to UPDATED_CONTENT
        defaultAdsSongShouldNotBeFound("content.in=" + UPDATED_CONTENT);
    }

    @Test
    @Transactional
    public void getAllAdsSongsByContentIsNullOrNotNull() throws Exception {
        // Initialize the database
        adsSongRepository.saveAndFlush(adsSong);

        // Get all the adsSongList where content is not null
        defaultAdsSongShouldBeFound("content.specified=true");

        // Get all the adsSongList where content is null
        defaultAdsSongShouldNotBeFound("content.specified=false");
    }
                @Test
    @Transactional
    public void getAllAdsSongsByContentContainsSomething() throws Exception {
        // Initialize the database
        adsSongRepository.saveAndFlush(adsSong);

        // Get all the adsSongList where content contains DEFAULT_CONTENT
        defaultAdsSongShouldBeFound("content.contains=" + DEFAULT_CONTENT);

        // Get all the adsSongList where content contains UPDATED_CONTENT
        defaultAdsSongShouldNotBeFound("content.contains=" + UPDATED_CONTENT);
    }

    @Test
    @Transactional
    public void getAllAdsSongsByContentNotContainsSomething() throws Exception {
        // Initialize the database
        adsSongRepository.saveAndFlush(adsSong);

        // Get all the adsSongList where content does not contain DEFAULT_CONTENT
        defaultAdsSongShouldNotBeFound("content.doesNotContain=" + DEFAULT_CONTENT);

        // Get all the adsSongList where content does not contain UPDATED_CONTENT
        defaultAdsSongShouldBeFound("content.doesNotContain=" + UPDATED_CONTENT);
    }


    @Test
    @Transactional
    public void getAllAdsSongsByImageIsEqualToSomething() throws Exception {
        // Initialize the database
        adsSongRepository.saveAndFlush(adsSong);

        // Get all the adsSongList where image equals to DEFAULT_IMAGE
        defaultAdsSongShouldBeFound("image.equals=" + DEFAULT_IMAGE);

        // Get all the adsSongList where image equals to UPDATED_IMAGE
        defaultAdsSongShouldNotBeFound("image.equals=" + UPDATED_IMAGE);
    }

    @Test
    @Transactional
    public void getAllAdsSongsByImageIsNotEqualToSomething() throws Exception {
        // Initialize the database
        adsSongRepository.saveAndFlush(adsSong);

        // Get all the adsSongList where image not equals to DEFAULT_IMAGE
        defaultAdsSongShouldNotBeFound("image.notEquals=" + DEFAULT_IMAGE);

        // Get all the adsSongList where image not equals to UPDATED_IMAGE
        defaultAdsSongShouldBeFound("image.notEquals=" + UPDATED_IMAGE);
    }

    @Test
    @Transactional
    public void getAllAdsSongsByImageIsInShouldWork() throws Exception {
        // Initialize the database
        adsSongRepository.saveAndFlush(adsSong);

        // Get all the adsSongList where image in DEFAULT_IMAGE or UPDATED_IMAGE
        defaultAdsSongShouldBeFound("image.in=" + DEFAULT_IMAGE + "," + UPDATED_IMAGE);

        // Get all the adsSongList where image equals to UPDATED_IMAGE
        defaultAdsSongShouldNotBeFound("image.in=" + UPDATED_IMAGE);
    }

    @Test
    @Transactional
    public void getAllAdsSongsByImageIsNullOrNotNull() throws Exception {
        // Initialize the database
        adsSongRepository.saveAndFlush(adsSong);

        // Get all the adsSongList where image is not null
        defaultAdsSongShouldBeFound("image.specified=true");

        // Get all the adsSongList where image is null
        defaultAdsSongShouldNotBeFound("image.specified=false");
    }
                @Test
    @Transactional
    public void getAllAdsSongsByImageContainsSomething() throws Exception {
        // Initialize the database
        adsSongRepository.saveAndFlush(adsSong);

        // Get all the adsSongList where image contains DEFAULT_IMAGE
        defaultAdsSongShouldBeFound("image.contains=" + DEFAULT_IMAGE);

        // Get all the adsSongList where image contains UPDATED_IMAGE
        defaultAdsSongShouldNotBeFound("image.contains=" + UPDATED_IMAGE);
    }

    @Test
    @Transactional
    public void getAllAdsSongsByImageNotContainsSomething() throws Exception {
        // Initialize the database
        adsSongRepository.saveAndFlush(adsSong);

        // Get all the adsSongList where image does not contain DEFAULT_IMAGE
        defaultAdsSongShouldNotBeFound("image.doesNotContain=" + DEFAULT_IMAGE);

        // Get all the adsSongList where image does not contain UPDATED_IMAGE
        defaultAdsSongShouldBeFound("image.doesNotContain=" + UPDATED_IMAGE);
    }


    @Test
    @Transactional
    public void getAllAdsSongsBySongIdIsEqualToSomething() throws Exception {
        // Initialize the database
        adsSongRepository.saveAndFlush(adsSong);

        // Get all the adsSongList where songId equals to DEFAULT_SONG_ID
        defaultAdsSongShouldBeFound("songId.equals=" + DEFAULT_SONG_ID);

        // Get all the adsSongList where songId equals to UPDATED_SONG_ID
        defaultAdsSongShouldNotBeFound("songId.equals=" + UPDATED_SONG_ID);
    }

    @Test
    @Transactional
    public void getAllAdsSongsBySongIdIsNotEqualToSomething() throws Exception {
        // Initialize the database
        adsSongRepository.saveAndFlush(adsSong);

        // Get all the adsSongList where songId not equals to DEFAULT_SONG_ID
        defaultAdsSongShouldNotBeFound("songId.notEquals=" + DEFAULT_SONG_ID);

        // Get all the adsSongList where songId not equals to UPDATED_SONG_ID
        defaultAdsSongShouldBeFound("songId.notEquals=" + UPDATED_SONG_ID);
    }

    @Test
    @Transactional
    public void getAllAdsSongsBySongIdIsInShouldWork() throws Exception {
        // Initialize the database
        adsSongRepository.saveAndFlush(adsSong);

        // Get all the adsSongList where songId in DEFAULT_SONG_ID or UPDATED_SONG_ID
        defaultAdsSongShouldBeFound("songId.in=" + DEFAULT_SONG_ID + "," + UPDATED_SONG_ID);

        // Get all the adsSongList where songId equals to UPDATED_SONG_ID
        defaultAdsSongShouldNotBeFound("songId.in=" + UPDATED_SONG_ID);
    }

    @Test
    @Transactional
    public void getAllAdsSongsBySongIdIsNullOrNotNull() throws Exception {
        // Initialize the database
        adsSongRepository.saveAndFlush(adsSong);

        // Get all the adsSongList where songId is not null
        defaultAdsSongShouldBeFound("songId.specified=true");

        // Get all the adsSongList where songId is null
        defaultAdsSongShouldNotBeFound("songId.specified=false");
    }

    @Test
    @Transactional
    public void getAllAdsSongsBySongIdIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        adsSongRepository.saveAndFlush(adsSong);

        // Get all the adsSongList where songId is greater than or equal to DEFAULT_SONG_ID
        defaultAdsSongShouldBeFound("songId.greaterThanOrEqual=" + DEFAULT_SONG_ID);

        // Get all the adsSongList where songId is greater than or equal to UPDATED_SONG_ID
        defaultAdsSongShouldNotBeFound("songId.greaterThanOrEqual=" + UPDATED_SONG_ID);
    }

    @Test
    @Transactional
    public void getAllAdsSongsBySongIdIsLessThanOrEqualToSomething() throws Exception {
        // Initialize the database
        adsSongRepository.saveAndFlush(adsSong);

        // Get all the adsSongList where songId is less than or equal to DEFAULT_SONG_ID
        defaultAdsSongShouldBeFound("songId.lessThanOrEqual=" + DEFAULT_SONG_ID);

        // Get all the adsSongList where songId is less than or equal to SMALLER_SONG_ID
        defaultAdsSongShouldNotBeFound("songId.lessThanOrEqual=" + SMALLER_SONG_ID);
    }

    @Test
    @Transactional
    public void getAllAdsSongsBySongIdIsLessThanSomething() throws Exception {
        // Initialize the database
        adsSongRepository.saveAndFlush(adsSong);

        // Get all the adsSongList where songId is less than DEFAULT_SONG_ID
        defaultAdsSongShouldNotBeFound("songId.lessThan=" + DEFAULT_SONG_ID);

        // Get all the adsSongList where songId is less than UPDATED_SONG_ID
        defaultAdsSongShouldBeFound("songId.lessThan=" + UPDATED_SONG_ID);
    }

    @Test
    @Transactional
    public void getAllAdsSongsBySongIdIsGreaterThanSomething() throws Exception {
        // Initialize the database
        adsSongRepository.saveAndFlush(adsSong);

        // Get all the adsSongList where songId is greater than DEFAULT_SONG_ID
        defaultAdsSongShouldNotBeFound("songId.greaterThan=" + DEFAULT_SONG_ID);

        // Get all the adsSongList where songId is greater than SMALLER_SONG_ID
        defaultAdsSongShouldBeFound("songId.greaterThan=" + SMALLER_SONG_ID);
    }

    /**
     * Executes the search, and checks that the default entity is returned.
     */
    private void defaultAdsSongShouldBeFound(String filter) throws Exception {
        restAdsSongMockMvc.perform(get("/api/ads-songs?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(adsSong.getId().intValue())))
            .andExpect(jsonPath("$.[*].content").value(hasItem(DEFAULT_CONTENT)))
            .andExpect(jsonPath("$.[*].image").value(hasItem(DEFAULT_IMAGE)))
            .andExpect(jsonPath("$.[*].songId").value(hasItem(DEFAULT_SONG_ID)));

        // Check, that the count call also returns 1
        restAdsSongMockMvc.perform(get("/api/ads-songs/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(content().string("1"));
    }

    /**
     * Executes the search, and checks that the default entity is not returned.
     */
    private void defaultAdsSongShouldNotBeFound(String filter) throws Exception {
        restAdsSongMockMvc.perform(get("/api/ads-songs?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$").isArray())
            .andExpect(jsonPath("$").isEmpty());

        // Check, that the count call also returns 0
        restAdsSongMockMvc.perform(get("/api/ads-songs/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(content().string("0"));
    }


    @Test
    @Transactional
    public void getNonExistingAdsSong() throws Exception {
        // Get the adsSong
        restAdsSongMockMvc.perform(get("/api/ads-songs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAdsSong() throws Exception {
        // Initialize the database
        adsSongRepository.saveAndFlush(adsSong);

        int databaseSizeBeforeUpdate = adsSongRepository.findAll().size();

        // Update the adsSong
        AdsSong updatedAdsSong = adsSongRepository.findById(adsSong.getId()).get();
        // Disconnect from session so that the updates on updatedAdsSong are not directly saved in db
        em.detach(updatedAdsSong);
        updatedAdsSong
            .content(UPDATED_CONTENT)
            .image(UPDATED_IMAGE)
            .songId(UPDATED_SONG_ID);
        AdsSongDTO adsSongDTO = adsSongMapper.toDto(updatedAdsSong);

        restAdsSongMockMvc.perform(put("/api/ads-songs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(adsSongDTO)))
            .andExpect(status().isOk());

        // Validate the AdsSong in the database
        List<AdsSong> adsSongList = adsSongRepository.findAll();
        assertThat(adsSongList).hasSize(databaseSizeBeforeUpdate);
        AdsSong testAdsSong = adsSongList.get(adsSongList.size() - 1);
        assertThat(testAdsSong.getContent()).isEqualTo(UPDATED_CONTENT);
        assertThat(testAdsSong.getImage()).isEqualTo(UPDATED_IMAGE);
        assertThat(testAdsSong.getSongId()).isEqualTo(UPDATED_SONG_ID);

        // Validate the AdsSong in Elasticsearch
        verify(mockAdsSongSearchRepository, times(1)).save(testAdsSong);
    }

    @Test
    @Transactional
    public void updateNonExistingAdsSong() throws Exception {
        int databaseSizeBeforeUpdate = adsSongRepository.findAll().size();

        // Create the AdsSong
        AdsSongDTO adsSongDTO = adsSongMapper.toDto(adsSong);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAdsSongMockMvc.perform(put("/api/ads-songs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(adsSongDTO)))
            .andExpect(status().isBadRequest());

        // Validate the AdsSong in the database
        List<AdsSong> adsSongList = adsSongRepository.findAll();
        assertThat(adsSongList).hasSize(databaseSizeBeforeUpdate);

        // Validate the AdsSong in Elasticsearch
        verify(mockAdsSongSearchRepository, times(0)).save(adsSong);
    }

    @Test
    @Transactional
    public void deleteAdsSong() throws Exception {
        // Initialize the database
        adsSongRepository.saveAndFlush(adsSong);

        int databaseSizeBeforeDelete = adsSongRepository.findAll().size();

        // Delete the adsSong
        restAdsSongMockMvc.perform(delete("/api/ads-songs/{id}", adsSong.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<AdsSong> adsSongList = adsSongRepository.findAll();
        assertThat(adsSongList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the AdsSong in Elasticsearch
        verify(mockAdsSongSearchRepository, times(1)).deleteById(adsSong.getId());
    }

    @Test
    @Transactional
    public void searchAdsSong() throws Exception {
        // Initialize the database
        adsSongRepository.saveAndFlush(adsSong);
        when(mockAdsSongSearchRepository.search(queryStringQuery("id:" + adsSong.getId()), PageRequest.of(0, 20)))
            .thenReturn(new PageImpl<>(Collections.singletonList(adsSong), PageRequest.of(0, 1), 1));
        // Search the adsSong
        restAdsSongMockMvc.perform(get("/api/_search/ads-songs?query=id:" + adsSong.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(adsSong.getId().intValue())))
            .andExpect(jsonPath("$.[*].content").value(hasItem(DEFAULT_CONTENT)))
            .andExpect(jsonPath("$.[*].image").value(hasItem(DEFAULT_IMAGE)))
            .andExpect(jsonPath("$.[*].songId").value(hasItem(DEFAULT_SONG_ID)));
    }
}
