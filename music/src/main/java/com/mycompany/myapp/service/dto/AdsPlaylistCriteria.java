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
 * Criteria class for the {@link com.mycompany.myapp.domain.AdsPlaylist} entity. This class is used
 * in {@link com.mycompany.myapp.web.rest.AdsPlaylistResource} to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /ads-playlists?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
public class AdsPlaylistCriteria implements Serializable, Criteria {

    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private StringFilter content;

    private StringFilter image;

    private IntegerFilter playlistId;

    public AdsPlaylistCriteria(){
    }

    public AdsPlaylistCriteria(AdsPlaylistCriteria other){
        this.id = other.id == null ? null : other.id.copy();
        this.content = other.content == null ? null : other.content.copy();
        this.image = other.image == null ? null : other.image.copy();
        this.playlistId = other.playlistId == null ? null : other.playlistId.copy();
    }

    @Override
    public AdsPlaylistCriteria copy() {
        return new AdsPlaylistCriteria(this);
    }

    public LongFilter getId() {
        return id;
    }

    public void setId(LongFilter id) {
        this.id = id;
    }

    public StringFilter getContent() {
        return content;
    }

    public void setContent(StringFilter content) {
        this.content = content;
    }

    public StringFilter getImage() {
        return image;
    }

    public void setImage(StringFilter image) {
        this.image = image;
    }

    public IntegerFilter getPlaylistId() {
        return playlistId;
    }

    public void setPlaylistId(IntegerFilter playlistId) {
        this.playlistId = playlistId;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        final AdsPlaylistCriteria that = (AdsPlaylistCriteria) o;
        return
            Objects.equals(id, that.id) &&
            Objects.equals(content, that.content) &&
            Objects.equals(image, that.image) &&
            Objects.equals(playlistId, that.playlistId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(
        id,
        content,
        image,
        playlistId
        );
    }

    @Override
    public String toString() {
        return "AdsPlaylistCriteria{" +
                (id != null ? "id=" + id + ", " : "") +
                (content != null ? "content=" + content + ", " : "") +
                (image != null ? "image=" + image + ", " : "") +
                (playlistId != null ? "playlistId=" + playlistId + ", " : "") +
            "}";
    }

}
