package com.mycompany.myapp.service.dto;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link com.mycompany.myapp.domain.AdsSong} entity.
 */
public class AdsSongDTO implements Serializable {

    private Long id;

    private String content;

    private String image;

    private Integer songId;


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

    public Integer getSongId() {
        return songId;
    }

    public void setSongId(Integer songId) {
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

        AdsSongDTO adsSongDTO = (AdsSongDTO) o;
        if (adsSongDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), adsSongDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "AdsSongDTO{" +
            "id=" + getId() +
            ", content='" + getContent() + "'" +
            ", image='" + getImage() + "'" +
            ", songId=" + getSongId() +
            "}";
    }
}
