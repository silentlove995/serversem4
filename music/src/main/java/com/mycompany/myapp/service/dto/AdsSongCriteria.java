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
 * Criteria class for the {@link com.mycompany.myapp.domain.AdsSong} entity. This class is used
 * in {@link com.mycompany.myapp.web.rest.AdsSongResource} to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /ads-songs?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
public class AdsSongCriteria implements Serializable, Criteria {

    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private StringFilter content;

    private StringFilter image;

    private IntegerFilter songId;

    public AdsSongCriteria(){
    }

    public AdsSongCriteria(AdsSongCriteria other){
        this.id = other.id == null ? null : other.id.copy();
        this.content = other.content == null ? null : other.content.copy();
        this.image = other.image == null ? null : other.image.copy();
        this.songId = other.songId == null ? null : other.songId.copy();
    }

    @Override
    public AdsSongCriteria copy() {
        return new AdsSongCriteria(this);
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

    public IntegerFilter getSongId() {
        return songId;
    }

    public void setSongId(IntegerFilter songId) {
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
        final AdsSongCriteria that = (AdsSongCriteria) o;
        return
            Objects.equals(id, that.id) &&
            Objects.equals(content, that.content) &&
            Objects.equals(image, that.image) &&
            Objects.equals(songId, that.songId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(
        id,
        content,
        image,
        songId
        );
    }

    @Override
    public String toString() {
        return "AdsSongCriteria{" +
                (id != null ? "id=" + id + ", " : "") +
                (content != null ? "content=" + content + ", " : "") +
                (image != null ? "image=" + image + ", " : "") +
                (songId != null ? "songId=" + songId + ", " : "") +
            "}";
    }

}
