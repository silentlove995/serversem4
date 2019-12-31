package com.mycompany.myapp.service.dto;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link com.mycompany.myapp.domain.AdsPlaylist} entity.
 */
public class AdsPlaylistDTO implements Serializable {

    private Long id;

    private String content;

    private String image;

    private Integer playlistId;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public Integer getPlaylistId() {
        return playlistId;
    }

    public void setPlaylistId(Integer playlistId) {
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

        AdsPlaylistDTO adsPlaylistDTO = (AdsPlaylistDTO) o;
        if (adsPlaylistDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), adsPlaylistDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "AdsPlaylistDTO{" +
            "id=" + getId() +
            ", content='" + getContent() + "'" +
            ", image='" + getImage() + "'" +
            ", playlistId=" + getPlaylistId() +
            "}";
    }
}
