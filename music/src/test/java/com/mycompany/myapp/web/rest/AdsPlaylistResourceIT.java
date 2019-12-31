package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.MusicApp;
import com.mycompany.myapp.domain.AdsPlaylist;
import com.mycompany.myapp.repository.AdsPlaylistRepository;
import com.mycompany.myapp.repository.search.AdsPlaylistSearchRepository;
import com.mycompany.myapp.service.AdsPlaylistService;
import com.mycompany.myapp.service.dto.AdsPlaylistDTO;
import com.mycompany.myapp.service.mapper.AdsPlaylistMapper;
import com.mycompany.myapp.web.rest.errors.ExceptionTranslator;
import com.mycompany.myapp.service.dto.AdsPlaylistCriteria;
import com.mycompany.myapp.service.AdsPlaylistQueryService;

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
 * Integration tests for the {@link AdsPlaylistResource} REST controller.
 */
@SpringBootTest(classes = MusicApp.class)
public class AdsPlaylistResourceIT {

    private static final String DEFAULT_CONTENT = "AAAAAAAAAA";
    private static final String UPDATED_CONTENT = "BBBBBBBBBB";

    private static final String DEFAULT_IMAGE = "AAAAAAAAAA";
    private static final String UPDATED_IMAGE = "BBBBBBBBBB";

    private static final Integer DEFAULT_PLAYLIST_ID = 1;
    private static final Integer UPDATED_PLAYLIST_ID = 2;
    private static final Integer SMALLER_PLAYLIST_ID = 1 - 1;

    @Autowired
    private AdsPlaylistRepository adsPlaylistRepository;

    @Autowired
    private AdsPlaylistMapper adsPlaylistMapper;

    @Autowired
    private AdsPlaylistService adsPlaylistService;

    /**
     * This repository is mocked in the com.mycompany.myapp.repository.search test package.
     *
     * @see com.mycompany.myapp.repository.search.AdsPlaylistSearchRepositoryMockConfiguration
     */
    @Autowired
    private AdsPlaylistSearchRepository mockAdsPlaylistSearchRepository;

    @Autowired
    private AdsPlaylistQueryService adsPlaylistQueryService;

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

    private MockMvc restAdsPlaylistMockMvc;

    private AdsPlaylist adsPlaylist;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AdsPlaylistResource adsPlaylistResource = new AdsPlaylistResource(adsPlaylistService, adsPlaylistQueryService);
        this.restAdsPlaylistMockMvc = MockMvcBuilders.standaloneSetup(adsPlaylistResource)
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
    public static AdsPlaylist createEntity(EntityManager em) {
        AdsPlaylist adsPlaylist = new AdsPlaylist()
            .content(DEFAULT_CONTENT)
            .image(DEFAULT_IMAGE)
            .playlistId(DEFAULT_PLAYLIST_ID);
        return adsPlaylist;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static AdsPlaylist createUpdatedEntity(EntityManager em) {
        AdsPlaylist adsPlaylist = new AdsPlaylist()
            .content(UPDATED_CONTENT)
            .image(UPDATED_IMAGE)
            .playlistId(UPDATED_PLAYLIST_ID);
        return adsPlaylist;
    }

    @BeforeEach
    public void initTest() {
        adsPlaylist = createEntity(em);
    }

    @Test
    @Transactional
    public void createAdsPlaylist() throws Exception {
        int databaseSizeBeforeCreate = adsPlaylistRepository.findAll().size();

        // Create the AdsPlaylist
        AdsPlaylistDTO adsPlaylistDTO = adsPlaylistMapper.toDto(adsPlaylist);
        restAdsPlaylistMockMvc.perform(post("/api/ads-playlists")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(adsPlaylistDTO)))
            .andExpect(status().isCreated());

        // Validate the AdsPlaylist in the database
        List<AdsPlaylist> adsPlaylistList = adsPlaylistRepository.findAll();
        assertThat(adsPlaylistList).hasSize(databaseSizeBeforeCreate + 1);
        AdsPlaylist testAdsPlaylist = adsPlaylistList.get(adsPlaylistList.size() - 1);
        assertThat(testAdsPlaylist.getContent()).isEqualTo(DEFAULT_CONTENT);
        assertThat(testAdsPlaylist.getImage()).isEqualTo(DEFAULT_IMAGE);
        assertThat(testAdsPlaylist.getPlaylistId()).isEqualTo(DEFAULT_PLAYLIST_ID);

        // Validate the AdsPlaylist in Elasticsearch
        verify(mockAdsPlaylistSearchRepository, times(1)).save(testAdsPlaylist);
    }

    @Test
    @Transactional
    public void createAdsPlaylistWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = adsPlaylistRepository.findAll().size();

        // Create the AdsPlaylist with an existing ID
        adsPlaylist.setId(1L);
        AdsPlaylistDTO adsPlaylistDTO = adsPlaylistMapper.toDto(adsPlaylist);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAdsPlaylistMockMvc.perform(post("/api/ads-playlists")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(adsPlaylistDTO)))
            .andExpect(status().isBadRequest());

        // Validate the AdsPlaylist in the database
        List<AdsPlaylist> adsPlaylistList = adsPlaylistRepository.findAll();
        assertThat(adsPlaylistList).hasSize(databaseSizeBeforeCreate);

        // Validate the AdsPlaylist in Elasticsearch
        verify(mockAdsPlaylistSearchRepository, times(0)).save(adsPlaylist);
    }


    @Test
    @Transactional
    public void getAllAdsPlaylists() throws Exception {
        // Initialize the database
        adsPlaylistRepository.saveAndFlush(adsPlaylist);

        // Get all the adsPlaylistList
        restAdsPlaylistMockMvc.perform(get("/api/ads-playlists?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(adsPlaylist.getId().intValue())))
            .andExpect(jsonPath("$.[*].content").value(hasItem(DEFAULT_CONTENT)))
            .andExpect(jsonPath("$.[*].image").value(hasItem(DEFAULT_IMAGE)))
            .andExpect(jsonPath("$.[*].playlistId").value(hasItem(DEFAULT_PLAYLIST_ID)));
    }
    
    @Test
    @Transactional
    public void getAdsPlaylist() throws Exception {
        // Initialize the database
        adsPlaylistRepository.saveAndFlush(adsPlaylist);

        // Get the adsPlaylist
        restAdsPlaylistMockMvc.perform(get("/api/ads-playlists/{id}", adsPlaylist.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(adsPlaylist.getId().intValue()))
            .andExpect(jsonPath("$.content").value(DEFAULT_CONTENT))
            .andExpect(jsonPath("$.image").value(DEFAULT_IMAGE))
            .andExpect(jsonPath("$.playlistId").value(DEFAULT_PLAYLIST_ID));
    }


    @Test
    @Transactional
    public void getAdsPlaylistsByIdFiltering() throws Exception {
        // Initialize the database
        adsPlaylistRepository.saveAndFlush(adsPlaylist);

        Long id = adsPlaylist.getId();

        defaultAdsPlaylistShouldBeFound("id.equals=" + id);
        defaultAdsPlaylistShouldNotBeFound("id.notEquals=" + id);

        defaultAdsPlaylistShouldBeFound("id.greaterThanOrEqual=" + id);
        defaultAdsPlaylistShouldNotBeFound("id.greaterThan=" + id);

        defaultAdsPlaylistShouldBeFound("id.lessThanOrEqual=" + id);
        defaultAdsPlaylistShouldNotBeFound("id.lessThan=" + id);
    }


    @Test
    @Transactional
    public void getAllAdsPlaylistsByContentIsEqualToSomething() throws Exception {
        // Initialize the database
        adsPlaylistRepository.saveAndFlush(adsPlaylist);

        // Get all the adsPlaylistList where content equals to DEFAULT_CONTENT
        defaultAdsPlaylistShouldBeFound("content.equals=" + DEFAULT_CONTENT);

        // Get all the adsPlaylistList where content equals to UPDATED_CONTENT
        defaultAdsPlaylistShouldNotBeFound("content.equals=" + UPDATED_CONTENT);
    }

    @Test
    @Transactional
    public void getAllAdsPlaylistsByContentIsNotEqualToSomething() throws Exception {
        // Initialize the database
        adsPlaylistRepository.saveAndFlush(adsPlaylist);

        // Get all the adsPlaylistList where content not equals to DEFAULT_CONTENT
        defaultAdsPlaylistShouldNotBeFound("content.notEquals=" + DEFAULT_CONTENT);

        // Get all the adsPlaylistList where content not equals to UPDATED_CONTENT
        defaultAdsPlaylistShouldBeFound("content.notEquals=" + UPDATED_CONTENT);
    }

    @Test
    @Transactional
    public void getAllAdsPlaylistsByContentIsInShouldWork() throws Exception {
        // Initialize the database
        adsPlaylistRepository.saveAndFlush(adsPlaylist);

        // Get all the adsPlaylistList where content in DEFAULT_CONTENT or UPDATED_CONTENT
        defaultAdsPlaylistShouldBeFound("content.in=" + DEFAULT_CONTENT + "," + UPDATED_CONTENT);

        // Get all the adsPlaylistList where content equals to UPDATED_CONTENT
        defaultAdsPlaylistShouldNotBeFound("content.in=" + UPDATED_CONTENT);
    }

    @Test
    @Transactional
    public void getAllAdsPlaylistsByContentIsNullOrNotNull() throws Exception {
        // Initialize the database
        adsPlaylistRepository.saveAndFlush(adsPlaylist);

        // Get all the adsPlaylistList where content is not null
        defaultAdsPlaylistShouldBeFound("content.specified=true");

        // Get all the adsPlaylistList where content is null
        defaultAdsPlaylistShouldNotBeFound("content.specified=false");
    }
                @Test
    @Transactional
    public void getAllAdsPlaylistsByContentContainsSomething() throws Exception {
        // Initialize the database
        adsPlaylistRepository.saveAndFlush(adsPlaylist);

        // Get all the adsPlaylistList where content contains DEFAULT_CONTENT
        defaultAdsPlaylistShouldBeFound("content.contains=" + DEFAULT_CONTENT);

        // Get all the adsPlaylistList where content contains UPDATED_CONTENT
        defaultAdsPlaylistShouldNotBeFound("content.contains=" + UPDATED_CONTENT);
    }

    @Test
    @Transactional
    public void getAllAdsPlaylistsByContentNotContainsSomething() throws Exception {
        // Initialize the database
        adsPlaylistRepository.saveAndFlush(adsPlaylist);

        // Get all the adsPlaylistList where content does not contain DEFAULT_CONTENT
        defaultAdsPlaylistShouldNotBeFound("content.doesNotContain=" + DEFAULT_CONTENT);

        // Get all the adsPlaylistList where content does not contain UPDATED_CONTENT
        defaultAdsPlaylistShouldBeFound("content.doesNotContain=" + UPDATED_CONTENT);
    }


    @Test
    @Transactional
    public void getAllAdsPlaylistsByImageIsEqualToSomething() throws Exception {
        // Initialize the database
        adsPlaylistRepository.saveAndFlush(adsPlaylist);

        // Get all the adsPlaylistList where image equals to DEFAULT_IMAGE
        defaultAdsPlaylistShouldBeFound("image.equals=" + DEFAULT_IMAGE);

        // Get all the adsPlaylistList where image equals to UPDATED_IMAGE
        defaultAdsPlaylistShouldNotBeFound("image.equals=" + UPDATED_IMAGE);
    }

    @Test
    @Transactional
    public void getAllAdsPlaylistsByImageIsNotEqualToSomething() throws Exception {
        // Initialize the database
        adsPlaylistRepository.saveAndFlush(adsPlaylist);

        // Get all the adsPlaylistList where image not equals to DEFAULT_IMAGE
        defaultAdsPlaylistShouldNotBeFound("image.notEquals=" + DEFAULT_IMAGE);

        // Get all the adsPlaylistList where image not equals to UPDATED_IMAGE
        defaultAdsPlaylistShouldBeFound("image.notEquals=" + UPDATED_IMAGE);
    }

    @Test
    @Transactional
    public void getAllAdsPlaylistsByImageIsInShouldWork() throws Exception {
        // Initialize the database
        adsPlaylistRepository.saveAndFlush(adsPlaylist);

        // Get all the adsPlaylistList where image in DEFAULT_IMAGE or UPDATED_IMAGE
        defaultAdsPlaylistShouldBeFound("image.in=" + DEFAULT_IMAGE + "," + UPDATED_IMAGE);

        // Get all the adsPlaylistList where image equals to UPDATED_IMAGE
        defaultAdsPlaylistShouldNotBeFound("image.in=" + UPDATED_IMAGE);
    }

    @Test
    @Transactional
    public void getAllAdsPlaylistsByImageIsNullOrNotNull() throws Exception {
        // Initialize the database
        adsPlaylistRepository.saveAndFlush(adsPlaylist);

        // Get all the adsPlaylistList where image is not null
        defaultAdsPlaylistShouldBeFound("image.specified=true");

        // Get all the adsPlaylistList where image is null
        defaultAdsPlaylistShouldNotBeFound("image.specified=false");
    }
                @Test
    @Transactional
    public void getAllAdsPlaylistsByImageContainsSomething() throws Exception {
        // Initialize the database
        adsPlaylistRepository.saveAndFlush(adsPlaylist);

        // Get all the adsPlaylistList where image contains DEFAULT_IMAGE
        defaultAdsPlaylistShouldBeFound("image.contains=" + DEFAULT_IMAGE);

        // Get all the adsPlaylistList where image contains UPDATED_IMAGE
        defaultAdsPlaylistShouldNotBeFound("image.contains=" + UPDATED_IMAGE);
    }

    @Test
    @Transactional
    public void getAllAdsPlaylistsByImageNotContainsSomething() throws Exception {
        // Initialize the database
        adsPlaylistRepository.saveAndFlush(adsPlaylist);

        // Get all the adsPlaylistList where image does not contain DEFAULT_IMAGE
        defaultAdsPlaylistShouldNotBeFound("image.doesNotContain=" + DEFAULT_IMAGE);

        // Get all the adsPlaylistList where image does not contain UPDATED_IMAGE
        defaultAdsPlaylistShouldBeFound("image.doesNotContain=" + UPDATED_IMAGE);
    }


    @Test
    @Transactional
    public void getAllAdsPlaylistsByPlaylistIdIsEqualToSomething() throws Exception {
        // Initialize the database
        adsPlaylistRepository.saveAndFlush(adsPlaylist);

        // Get all the adsPlaylistList where playlistId equals to DEFAULT_PLAYLIST_ID
        defaultAdsPlaylistShouldBeFound("playlistId.equals=" + DEFAULT_PLAYLIST_ID);

        // Get all the adsPlaylistList where playlistId equals to UPDATED_PLAYLIST_ID
        defaultAdsPlaylistShouldNotBeFound("playlistId.equals=" + UPDATED_PLAYLIST_ID);
    }

    @Test
    @Transactional
    public void getAllAdsPlaylistsByPlaylistIdIsNotEqualToSomething() throws Exception {
        // Initialize the database
        adsPlaylistRepository.saveAndFlush(adsPlaylist);

        // Get all the adsPlaylistList where playlistId not equals to DEFAULT_PLAYLIST_ID
        defaultAdsPlaylistShouldNotBeFound("playlistId.notEquals=" + DEFAULT_PLAYLIST_ID);

        // Get all the adsPlaylistList where playlistId not equals to UPDATED_PLAYLIST_ID
        defaultAdsPlaylistShouldBeFound("playlistId.notEquals=" + UPDATED_PLAYLIST_ID);
    }

    @Test
    @Transactional
    public void getAllAdsPlaylistsByPlaylistIdIsInShouldWork() throws Exception {
        // Initialize the database
        adsPlaylistRepository.saveAndFlush(adsPlaylist);

        // Get all the adsPlaylistList where playlistId in DEFAULT_PLAYLIST_ID or UPDATED_PLAYLIST_ID
        defaultAdsPlaylistShouldBeFound("playlistId.in=" + DEFAULT_PLAYLIST_ID + "," + UPDATED_PLAYLIST_ID);

        // Get all the adsPlaylistList where playlistId equals to UPDATED_PLAYLIST_ID
        defaultAdsPlaylistShouldNotBeFound("playlistId.in=" + UPDATED_PLAYLIST_ID);
    }

    @Test
    @Transactional
    public void getAllAdsPlaylistsByPlaylistIdIsNullOrNotNull() throws Exception {
        // Initialize the database
        adsPlaylistRepository.saveAndFlush(adsPlaylist);

        // Get all the adsPlaylistList where playlistId is not null
        defaultAdsPlaylistShouldBeFound("playlistId.specified=true");

        // Get all the adsPlaylistList where playlistId is null
        defaultAdsPlaylistShouldNotBeFound("playlistId.specified=false");
    }

    @Test
    @Transactional
    public void getAllAdsPlaylistsByPlaylistIdIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        adsPlaylistRepository.saveAndFlush(adsPlaylist);

        // Get all the adsPlaylistList where playlistId is greater than or equal to DEFAULT_PLAYLIST_ID
        defaultAdsPlaylistShouldBeFound("playlistId.greaterThanOrEqual=" + DEFAULT_PLAYLIST_ID);

        // Get all the adsPlaylistList where playlistId is greater than or equal to UPDATED_PLAYLIST_ID
        defaultAdsPlaylistShouldNotBeFound("playlistId.greaterThanOrEqual=" + UPDATED_PLAYLIST_ID);
    }

    @Test
    @Transactional
    public void getAllAdsPlaylistsByPlaylistIdIsLessThanOrEqualToSomething() throws Exception {
        // Initialize the database
        adsPlaylistRepository.saveAndFlush(adsPlaylist);

        // Get all the adsPlaylistList where playlistId is less than or equal to DEFAULT_PLAYLIST_ID
        defaultAdsPlaylistShouldBeFound("playlistId.lessThanOrEqual=" + DEFAULT_PLAYLIST_ID);

        // Get all the adsPlaylistList where playlistId is less than or equal to SMALLER_PLAYLIST_ID
        defaultAdsPlaylistShouldNotBeFound("playlistId.lessThanOrEqual=" + SMALLER_PLAYLIST_ID);
    }

    @Test
    @Transactional
    public void getAllAdsPlaylistsByPlaylistIdIsLessThanSomething() throws Exception {
        // Initialize the database
        adsPlaylistRepository.saveAndFlush(adsPlaylist);

        // Get all the adsPlaylistList where playlistId is less than DEFAULT_PLAYLIST_ID
        defaultAdsPlaylistShouldNotBeFound("playlistId.lessThan=" + DEFAULT_PLAYLIST_ID);

        // Get all the adsPlaylistList where playlistId is less than UPDATED_PLAYLIST_ID
        defaultAdsPlaylistShouldBeFound("playlistId.lessThan=" + UPDATED_PLAYLIST_ID);
    }

    @Test
    @Transactional
    public void getAllAdsPlaylistsByPlaylistIdIsGreaterThanSomething() throws Exception {
        // Initialize the database
        adsPlaylistRepository.saveAndFlush(adsPlaylist);

        // Get all the adsPlaylistList where playlistId is greater than DEFAULT_PLAYLIST_ID
        defaultAdsPlaylistShouldNotBeFound("playlistId.greaterThan=" + DEFAULT_PLAYLIST_ID);

        // Get all the adsPlaylistList where playlistId is greater than SMALLER_PLAYLIST_ID
        defaultAdsPlaylistShouldBeFound("playlistId.greaterThan=" + SMALLER_PLAYLIST_ID);
    }

    /**
     * Executes the search, and checks that the default entity is returned.
     */
    private void defaultAdsPlaylistShouldBeFound(String filter) throws Exception {
        restAdsPlaylistMockMvc.perform(get("/api/ads-playlists?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(adsPlaylist.getId().intValue())))
            .andExpect(jsonPath("$.[*].content").value(hasItem(DEFAULT_CONTENT)))
            .andExpect(jsonPath("$.[*].image").value(hasItem(DEFAULT_IMAGE)))
            .andExpect(jsonPath("$.[*].playlistId").value(hasItem(DEFAULT_PLAYLIST_ID)));

        // Check, that the count call also returns 1
        restAdsPlaylistMockMvc.perform(get("/api/ads-playlists/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(content().string("1"));
    }

    /**
     * Executes the search, and checks that the default entity is not returned.
     */
    private void defaultAdsPlaylistShouldNotBeFound(String filter) throws Exception {
        restAdsPlaylistMockMvc.perform(get("/api/ads-playlists?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$").isArray())
            .andExpect(jsonPath("$").isEmpty());

        // Check, that the count call also returns 0
        restAdsPlaylistMockMvc.perform(get("/api/ads-playlists/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(content().string("0"));
    }


    @Test
    @Transactional
    public void getNonExistingAdsPlaylist() throws Exception {
        // Get the adsPlaylist
        restAdsPlaylistMockMvc.perform(get("/api/ads-playlists/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAdsPlaylist() throws Exception {
        // Initialize the database
        adsPlaylistRepository.saveAndFlush(adsPlaylist);

        int databaseSizeBeforeUpdate = adsPlaylistRepository.findAll().size();

        // Update the adsPlaylist
        AdsPlaylist updatedAdsPlaylist = adsPlaylistRepository.findById(adsPlaylist.getId()).get();
        // Disconnect from session so that the updates on updatedAdsPlaylist are not directly saved in db
        em.detach(updatedAdsPlaylist);
        updatedAdsPlaylist
            .content(UPDATED_CONTENT)
            .image(UPDATED_IMAGE)
            .playlistId(UPDATED_PLAYLIST_ID);
        AdsPlaylistDTO adsPlaylistDTO = adsPlaylistMapper.toDto(updatedAdsPlaylist);

        restAdsPlaylistMockMvc.perform(put("/api/ads-playlists")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(adsPlaylistDTO)))
            .andExpect(status().isOk());

        // Validate the AdsPlaylist in the database
        List<AdsPlaylist> adsPlaylistList = adsPlaylistRepository.findAll();
        assertThat(adsPlaylistList).hasSize(databaseSizeBeforeUpdate);
        AdsPlaylist testAdsPlaylist = adsPlaylistList.get(adsPlaylistList.size() - 1);
        assertThat(testAdsPlaylist.getContent()).isEqualTo(UPDATED_CONTENT);
        assertThat(testAdsPlaylist.getImage()).isEqualTo(UPDATED_IMAGE);
        assertThat(testAdsPlaylist.getPlaylistId()).isEqualTo(UPDATED_PLAYLIST_ID);

        // Validate the AdsPlaylist in Elasticsearch
        verify(mockAdsPlaylistSearchRepository, times(1)).save(testAdsPlaylist);
    }

    @Test
    @Transactional
    public void updateNonExistingAdsPlaylist() throws Exception {
        int databaseSizeBeforeUpdate = adsPlaylistRepository.findAll().size();

        // Create the AdsPlaylist
        AdsPlaylistDTO adsPlaylistDTO = adsPlaylistMapper.toDto(adsPlaylist);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAdsPlaylistMockMvc.perform(put("/api/ads-playlists")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(adsPlaylistDTO)))
            .andExpect(status().isBadRequest());

        // Validate the AdsPlaylist in the database
        List<AdsPlaylist> adsPlaylistList = adsPlaylistRepository.findAll();
        assertThat(adsPlaylistList).hasSize(databaseSizeBeforeUpdate);

        // Validate the AdsPlaylist in Elasticsearch
        verify(mockAdsPlaylistSearchRepository, times(0)).save(adsPlaylist);
    }

    @Test
    @Transactional
    public void deleteAdsPlaylist() throws Exception {
        // Initialize the database
        adsPlaylistRepository.saveAndFlush(adsPlaylist);

        int databaseSizeBeforeDelete = adsPlaylistRepository.findAll().size();

        // Delete the adsPlaylist
        restAdsPlaylistMockMvc.perform(delete("/api/ads-playlists/{id}", adsPlaylist.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<AdsPlaylist> adsPlaylistList = adsPlaylistRepository.findAll();
        assertThat(adsPlaylistList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the AdsPlaylist in Elasticsearch
        verify(mockAdsPlaylistSearchRepository, times(1)).deleteById(adsPlaylist.getId());
    }

    @Test
    @Transactional
    public void searchAdsPlaylist() throws Exception {
        // Initialize the database
        adsPlaylistRepository.saveAndFlush(adsPlaylist);
        when(mockAdsPlaylistSearchRepository.search(queryStringQuery("id:" + adsPlaylist.getId()), PageRequest.of(0, 20)))
            .thenReturn(new PageImpl<>(Collections.singletonList(adsPlaylist), PageRequest.of(0, 1), 1));
        // Search the adsPlaylist
        restAdsPlaylistMockMvc.perform(get("/api/_search/ads-playlists?query=id:" + adsPlaylist.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(adsPlaylist.getId().intValue())))
            .andExpect(jsonPath("$.[*].content").value(hasItem(DEFAULT_CONTENT)))
            .andExpect(jsonPath("$.[*].image").value(hasItem(DEFAULT_IMAGE)))
            .andExpect(jsonPath("$.[*].playlistId").value(hasItem(DEFAULT_PLAYLIST_ID)));
    }
}
