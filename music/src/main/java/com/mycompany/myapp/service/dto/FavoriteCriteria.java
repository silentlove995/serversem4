package com.mycompany.myapp.service.dto;

import java.io.Serializable;
import java.util.Objects;
import io.github.jhipster.service.Criteria;
import io.github.jhipster.service.filter.BooleanFilter;
import io.github.jhipster.service.filter.DoubleFilter;
import io.github.jhipster.service.filter.Filter;
import io.github.jhipster.service.filter.FloatFilter;
import io.github.jhipster.service.filter.IntegerFilter;
import io.github.jhipster.service.filter.LongFilter;
import io.github.jhipster.service.filter.StringFilter;

/**
 * Criteria class for the {@link com.mycompany.myapp.domain.Favorite} entity. This class is used
 * in {@link com.mycompany.myapp.web.rest.FavoriteResource} to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /favorites?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
public class FavoriteCriteria implements Serializable, Criteria {

    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private StringFilter user;

    private StringFilter song;

    private LongFilter songId;

    public FavoriteCriteria(){
    }

    public FavoriteCriteria(FavoriteCriteria other){
        this.id = other.id == null ? null : other.id.copy();
        this.user = other.user == null ? null : other.user.copy();
        this.song = other.song == null ? null : other.song.copy();
        this.songId = other.songId == null ? null : other.songId.copy();
    }

    @Override
    public FavoriteCriteria copy() {
        return new FavoriteCriteria(this);
    }

    public LongFilter getId() {
        return id;
    }

    public void setId(LongFilter id) {
        this.id = id;
    }

    public StringFilter getUser() {
        return user;
    }

    public void setUser(StringFilter user) {
        this.user = user;
    }

    public StringFilter getSong() {
        return song;
    }

    public void setSong(StringFilter song) {
        this.song = song;
    }

    public LongFilter getSongId() {
        return songId;
    }

    public void setSongId(LongFilter songId) {
        this.songId = songId;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        final FavoriteCriteria that = (FavoriteCriteria) o;
        return
            Objects.equals(id, that.id) &&
            Objects.equals(user, that.user) &&
            Objects.equals(song, that.song) &&
            Objects.equals(songId, that.songId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(
        id,
        user,
        song,
        songId
        );
    }

    @Override
    public String toString() {
        return "FavoriteCriteria{" +
                (id != null ? "id=" + id + ", " : "") +
                (user != null ? "user=" + user + ", " : "") +
                (song != null ? "song=" + song + ", " : "") +
                (songId != null ? "songId=" + songId + ", " : "") +
            "}";
    }

}
