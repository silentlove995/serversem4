package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.MusicApp;
import com.mycompany.myapp.domain.Favorite;
import com.mycompany.myapp.domain.Songs;
import com.mycompany.myapp.repository.FavoriteRepository;
import com.mycompany.myapp.repository.search.FavoriteSearchRepository;
import com.mycompany.myapp.service.FavoriteService;
import com.mycompany.myapp.service.dto.FavoriteDTO;
import com.mycompany.myapp.service.mapper.FavoriteMapper;
import com.mycompany.myapp.web.rest.errors.ExceptionTranslator;
import com.mycompany.myapp.service.dto.FavoriteCriteria;
import com.mycompany.myapp.service.FavoriteQueryService;

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
 * Integration tests for the {@link FavoriteResource} REST controller.
 */
@SpringBootTest(classes = MusicApp.class)
public class FavoriteResourceIT {

    private static final String DEFAULT_USER = "AAAAAAAAAA";
    private static final String UPDATED_USER = "BBBBBBBBBB";

    private static final String DEFAULT_SONG = "AAAAAAAAAA";
    private static final String UPDATED_SONG = "BBBBBBBBBB";

    @Autowired
    private FavoriteRepository favoriteRepository;

    @Autowired
    private FavoriteMapper favoriteMapper;

    @Autowired
    private FavoriteService favoriteService;

    /**
     * This repository is mocked in the com.mycompany.myapp.repository.search test package.
     *
     * @see com.mycompany.myapp.repository.search.FavoriteSearchRepositoryMockConfiguration
     */
    @Autowired
    private FavoriteSearchRepository mockFavoriteSearchRepository;

    @Autowired
    private FavoriteQueryService favoriteQueryService;

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

    private MockMvc restFavoriteMockMvc;

    private Favorite favorite;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final FavoriteResource favoriteResource = new FavoriteResource(favoriteService, favoriteQueryService);
        this.restFavoriteMockMvc = MockMvcBuilders.standaloneSetup(favoriteResource)
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
    public static Favorite createEntity(EntityManager em) {
        Favorite favorite = new Favorite()
            .user(DEFAULT_USER)
            .song(DEFAULT_SONG);
        return favorite;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Favorite createUpdatedEntity(EntityManager em) {
        Favorite favorite = new Favorite()
            .user(UPDATED_USER)
            .song(UPDATED_SONG);
        return favorite;
    }

    @BeforeEach
    public void initTest() {
        favorite = createEntity(em);
    }

    @Test
    @Transactional
    public void createFavorite() throws Exception {
        int databaseSizeBeforeCreate = favoriteRepository.findAll().size();

        // Create the Favorite
        FavoriteDTO favoriteDTO = favoriteMapper.toDto(favorite);
        restFavoriteMockMvc.perform(post("/api/favorites")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(favoriteDTO)))
            .andExpect(status().isCreated());

        // Validate the Favorite in the database
        List<Favorite> favoriteList = favoriteRepository.findAll();
        assertThat(favoriteList).hasSize(databaseSizeBeforeCreate + 1);
        Favorite testFavorite = favoriteList.get(favoriteList.size() - 1);
        assertThat(testFavorite.getUser()).isEqualTo(DEFAULT_USER);
        assertThat(testFavorite.getSong()).isEqualTo(DEFAULT_SONG);

        // Validate the Favorite in Elasticsearch
        verify(mockFavoriteSearchRepository, times(1)).save(testFavorite);
    }

    @Test
    @Transactional
    public void createFavoriteWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = favoriteRepository.findAll().size();

        // Create the Favorite with an existing ID
        favorite.setId(1L);
        FavoriteDTO favoriteDTO = favoriteMapper.toDto(favorite);

        // An entity with an existing ID cannot be created, so this API call must fail
        restFavoriteMockMvc.perform(post("/api/favorites")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(favoriteDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Favorite in the database
        List<Favorite> favoriteList = favoriteRepository.findAll();
        assertThat(favoriteList).hasSize(databaseSizeBeforeCreate);

        // Validate the Favorite in Elasticsearch
        verify(mockFavoriteSearchRepository, times(0)).save(favorite);
    }


    @Test
    @Transactional
    public void getAllFavorites() throws Exception {
        // Initialize the database
        favoriteRepository.saveAndFlush(favorite);

        // Get all the favoriteList
        restFavoriteMockMvc.perform(get("/api/favorites?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(favorite.getId().intValue())))
            .andExpect(jsonPath("$.[*].user").value(hasItem(DEFAULT_USER)))
            .andExpect(jsonPath("$.[*].song").value(hasItem(DEFAULT_SONG)));
    }
    
    @Test
    @Transactional
    public void getFavorite() throws Exception {
        // Initialize the database
        favoriteRepository.saveAndFlush(favorite);

        // Get the favorite
        restFavoriteMockMvc.perform(get("/api/favorites/{id}", favorite.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(favorite.getId().intValue()))
            .andExpect(jsonPath("$.user").value(DEFAULT_USER))
            .andExpect(jsonPath("$.song").value(DEFAULT_SONG));
    }


    @Test
    @Transactional
    public void getFavoritesByIdFiltering() throws Exception {
        // Initialize the database
        favoriteRepository.saveAndFlush(favorite);

        Long id = favorite.getId();

        defaultFavoriteShouldBeFound("id.equals=" + id);
        defaultFavoriteShouldNotBeFound("id.notEquals=" + id);

        defaultFavoriteShouldBeFound("id.greaterThanOrEqual=" + id);
        defaultFavoriteShouldNotBeFound("id.greaterThan=" + id);

        defaultFavoriteShouldBeFound("id.lessThanOrEqual=" + id);
        defaultFavoriteShouldNotBeFound("id.lessThan=" + id);
    }


    @Test
    @Transactional
    public void getAllFavoritesByUserIsEqualToSomething() throws Exception {
        // Initialize the database
        favoriteRepository.saveAndFlush(favorite);

        // Get all the favoriteList where user equals to DEFAULT_USER
        defaultFavoriteShouldBeFound("user.equals=" + DEFAULT_USER);

        // Get all the favoriteList where user equals to UPDATED_USER
        defaultFavoriteShouldNotBeFound("user.equals=" + UPDATED_USER);
    }

    @Test
    @Transactional
    public void getAllFavoritesByUserIsNotEqualToSomething() throws Exception {
        // Initialize the database
        favoriteRepository.saveAndFlush(favorite);

        // Get all the favoriteList where user not equals to DEFAULT_USER
        defaultFavoriteShouldNotBeFound("user.notEquals=" + DEFAULT_USER);

        // Get all the favoriteList where user not equals to UPDATED_USER
        defaultFavoriteShouldBeFound("user.notEquals=" + UPDATED_USER);
    }

    @Test
    @Transactional
    public void getAllFavoritesByUserIsInShouldWork() throws Exception {
        // Initialize the database
        favoriteRepository.saveAndFlush(favorite);

        // Get all the favoriteList where user in DEFAULT_USER or UPDATED_USER
        defaultFavoriteShouldBeFound("user.in=" + DEFAULT_USER + "," + UPDATED_USER);

        // Get all the favoriteList where user equals to UPDATED_USER
        defaultFavoriteShouldNotBeFound("user.in=" + UPDATED_USER);
    }

    @Test
    @Transactional
    public void getAllFavoritesByUserIsNullOrNotNull() throws Exception {
        // Initialize the database
        favoriteRepository.saveAndFlush(favorite);

        // Get all the favoriteList where user is not null
        defaultFavoriteShouldBeFound("user.specified=true");

        // Get all the favoriteList where user is null
        defaultFavoriteShouldNotBeFound("user.specified=false");
    }
                @Test
    @Transactional
    public void getAllFavoritesByUserContainsSomething() throws Exception {
        // Initialize the database
        favoriteRepository.saveAndFlush(favorite);

        // Get all the favoriteList where user contains DEFAULT_USER
        defaultFavoriteShouldBeFound("user.contains=" + DEFAULT_USER);

        // Get all the favoriteList where user contains UPDATED_USER
        defaultFavoriteShouldNotBeFound("user.contains=" + UPDATED_USER);
    }

    @Test
    @Transactional
    public void getAllFavoritesByUserNotContainsSomething() throws Exception {
        // Initialize the database
        favoriteRepository.saveAndFlush(favorite);

        // Get all the favoriteList where user does not contain DEFAULT_USER
        defaultFavoriteShouldNotBeFound("user.doesNotContain=" + DEFAULT_USER);

        // Get all the favoriteList where user does not contain UPDATED_USER
        defaultFavoriteShouldBeFound("user.doesNotContain=" + UPDATED_USER);
    }


    @Test
    @Transactional
    public void getAllFavoritesBySongIsEqualToSomething() throws Exception {
        // Initialize the database
        favoriteRepository.saveAndFlush(favorite);

        // Get all the favoriteList where song equals to DEFAULT_SONG
        defaultFavoriteShouldBeFound("song.equals=" + DEFAULT_SONG);

        // Get all the favoriteList where song equals to UPDATED_SONG
        defaultFavoriteShouldNotBeFound("song.equals=" + UPDATED_SONG);
    }

    @Test
    @Transactional
    public void getAllFavoritesBySongIsNotEqualToSomething() throws Exception {
        // Initialize the database
        favoriteRepository.saveAndFlush(favorite);

        // Get all the favoriteList where song not equals to DEFAULT_SONG
        defaultFavoriteShouldNotBeFound("song.notEquals=" + DEFAULT_SONG);

        // Get all the favoriteList where song not equals to UPDATED_SONG
        defaultFavoriteShouldBeFound("song.notEquals=" + UPDATED_SONG);
    }

    @Test
    @Transactional
    public void getAllFavoritesBySongIsInShouldWork() throws Exception {
        // Initialize the database
        favoriteRepository.saveAndFlush(favorite);

        // Get all the favoriteList where song in DEFAULT_SONG or UPDATED_SONG
        defaultFavoriteShouldBeFound("song.in=" + DEFAULT_SONG + "," + UPDATED_SONG);

        // Get all the favoriteList where song equals to UPDATED_SONG
        defaultFavoriteShouldNotBeFound("song.in=" + UPDATED_SONG);
    }

    @Test
    @Transactional
    public void getAllFavoritesBySongIsNullOrNotNull() throws Exception {
        // Initialize the database
        favoriteRepository.saveAndFlush(favorite);

        // Get all the favoriteList where song is not null
        defaultFavoriteShouldBeFound("song.specified=true");

        // Get all the favoriteList where song is null
        defaultFavoriteShouldNotBeFound("song.specified=false");
    }
                @Test
    @Transactional
    public void getAllFavoritesBySongContainsSomething() throws Exception {
        // Initialize the database
        favoriteRepository.saveAndFlush(favorite);

        // Get all the favoriteList where song contains DEFAULT_SONG
        defaultFavoriteShouldBeFound("song.contains=" + DEFAULT_SONG);

        // Get all the favoriteList where song contains UPDATED_SONG
        defaultFavoriteShouldNotBeFound("song.contains=" + UPDATED_SONG);
    }

    @Test
    @Transactional
    public void getAllFavoritesBySongNotContainsSomething() throws Exception {
        // Initialize the database
        favoriteRepository.saveAndFlush(favorite);

        // Get all the favoriteList where song does not contain DEFAULT_SONG
        defaultFavoriteShouldNotBeFound("song.doesNotContain=" + DEFAULT_SONG);

        // Get all the favoriteList where song does not contain UPDATED_SONG
        defaultFavoriteShouldBeFound("song.doesNotContain=" + UPDATED_SONG);
    }


    @Test
    @Transactional
    public void getAllFavoritesBySongIsEqualToSomething() throws Exception {
        // Initialize the database
        favoriteRepository.saveAndFlush(favorite);
        Songs song = SongsResourceIT.createEntity(em);
        em.persist(song);
        em.flush();
        favorite.addSong(song);
        favoriteRepository.saveAndFlush(favorite);
        Long songId = song.getId();

        // Get all the favoriteList where song equals to songId
        defaultFavoriteShouldBeFound("songId.equals=" + songId);

        // Get all the favoriteList where song equals to songId + 1
        defaultFavoriteShouldNotBeFound("songId.equals=" + (songId + 1));
    }

    /**
     * Executes the search, and checks that the default entity is returned.
     */
    private void defaultFavoriteShouldBeFound(String filter) throws Exception {
        restFavoriteMockMvc.perform(get("/api/favorites?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(favorite.getId().intValue())))
            .andExpect(jsonPath("$.[*].user").value(hasItem(DEFAULT_USER)))
            .andExpect(jsonPath("$.[*].song").value(hasItem(DEFAULT_SONG)));

        // Check, that the count call also returns 1
        restFavoriteMockMvc.perform(get("/api/favorites/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(content().string("1"));
    }

    /**
     * Executes the search, and checks that the default entity is not returned.
     */
    private void defaultFavoriteShouldNotBeFound(String filter) throws Exception {
        restFavoriteMockMvc.perform(get("/api/favorites?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$").isArray())
            .andExpect(jsonPath("$").isEmpty());

        // Check, that the count call also returns 0
        restFavoriteMockMvc.perform(get("/api/favorites/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(content().string("0"));
    }


    @Test
    @Transactional
    public void getNonExistingFavorite() throws Exception {
        // Get the favorite
        restFavoriteMockMvc.perform(get("/api/favorites/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateFavorite() throws Exception {
        // Initialize the database
        favoriteRepository.saveAndFlush(favorite);

        int databaseSizeBeforeUpdate = favoriteRepository.findAll().size();

        // Update the favorite
        Favorite updatedFavorite = favoriteRepository.findById(favorite.getId()).get();
        // Disconnect from session so that the updates on updatedFavorite are not directly saved in db
        em.detach(updatedFavorite);
        updatedFavorite
            .user(UPDATED_USER)
            .song(UPDATED_SONG);
        FavoriteDTO favoriteDTO = favoriteMapper.toDto(updatedFavorite);

        restFavoriteMockMvc.perform(put("/api/favorites")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(favoriteDTO)))
            .andExpect(status().isOk());

        // Validate the Favorite in the database
        List<Favorite> favoriteList = favoriteRepository.findAll();
        assertThat(favoriteList).hasSize(databaseSizeBeforeUpdate);
        Favorite testFavorite = favoriteList.get(favoriteList.size() - 1);
        assertThat(testFavorite.getUser()).isEqualTo(UPDATED_USER);
        assertThat(testFavorite.getSong()).isEqualTo(UPDATED_SONG);

        // Validate the Favorite in Elasticsearch
        verify(mockFavoriteSearchRepository, times(1)).save(testFavorite);
    }

    @Test
    @Transactional
    public void updateNonExistingFavorite() throws Exception {
        int databaseSizeBeforeUpdate = favoriteRepository.findAll().size();

        // Create the Favorite
        FavoriteDTO favoriteDTO = favoriteMapper.toDto(favorite);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restFavoriteMockMvc.perform(put("/api/favorites")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(favoriteDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Favorite in the database
        List<Favorite> favoriteList = favoriteRepository.findAll();
        assertThat(favoriteList).hasSize(databaseSizeBeforeUpdate);

        // Validate the Favorite in Elasticsearch
        verify(mockFavoriteSearchRepository, times(0)).save(favorite);
    }

    @Test
    @Transactional
    public void deleteFavorite() throws Exception {
        // Initialize the database
        favoriteRepository.saveAndFlush(favorite);

        int databaseSizeBeforeDelete = favoriteRepository.findAll().size();

        // Delete the favorite
        restFavoriteMockMvc.perform(delete("/api/favorites/{id}", favorite.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Favorite> favoriteList = favoriteRepository.findAll();
        assertThat(favoriteList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the Favorite in Elasticsearch
        verify(mockFavoriteSearchRepository, times(1)).deleteById(favorite.getId());
    }

    @Test
    @Transactional
    public void searchFavorite() throws Exception {
        // Initialize the database
        favoriteRepository.saveAndFlush(favorite);
        when(mockFavoriteSearchRepository.search(queryStringQuery("id:" + favorite.getId()), PageRequest.of(0, 20)))
            .thenReturn(new PageImpl<>(Collections.singletonList(favorite), PageRequest.of(0, 1), 1));
        // Search the favorite
        restFavoriteMockMvc.perform(get("/api/_search/favorites?query=id:" + favorite.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(favorite.getId().intValue())))
            .andExpect(jsonPath("$.[*].user").value(hasItem(DEFAULT_USER)))
            .andExpect(jsonPath("$.[*].song").value(hasItem(DEFAULT_SONG)));
    }
}
