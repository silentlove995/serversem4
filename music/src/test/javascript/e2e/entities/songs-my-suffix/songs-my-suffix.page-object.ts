import { element, by, ElementFinder } from 'protractor';

export class SongsComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-songs-my-suffix div table .btn-danger'));
  title = element.all(by.css('jhi-songs-my-suffix div h2#page-heading span')).first();

  async clickOnCreateButton(): Promise<void> {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(): Promise<void> {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons(): Promise<number> {
    return this.deleteButtons.count();
  }

  async getTitle(): Promise<string> {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class SongsUpdatePage {
  pageTitle = element(by.id('jhi-songs-my-suffix-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  titleInput = element(by.id('field_title'));
  genreSelect = element(by.id('field_genre'));
  vocalInput = element(by.id('field_vocal'));
  countrySelect = element(by.id('field_country'));
  descriptionInput = element(by.id('field_description'));
  songAddressInput = element(by.id('field_songAddress'));
  lyricInput = element(by.id('field_lyric'));
  avatarInput = element(by.id('field_avatar'));
  listenCountInput = element(by.id('field_listenCount'));
  favoriteCountInput = element(by.id('field_favoriteCount'));
  adsSelect = element(by.id('field_ads'));
  playlistSelect = element(by.id('field_playlist'));
  albumSelect = element(by.id('field_album'));
  favoriteSelect = element(by.id('field_favorite'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setTitleInput(title: string): Promise<void> {
    await this.titleInput.sendKeys(title);
  }

  async getTitleInput(): Promise<string> {
    return await this.titleInput.getAttribute('value');
  }

  async setGenreSelect(genre: string): Promise<void> {
    await this.genreSelect.sendKeys(genre);
  }

  async getGenreSelect(): Promise<string> {
    return await this.genreSelect.element(by.css('option:checked')).getText();
  }

  async genreSelectLastOption(): Promise<void> {
    await this.genreSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async setVocalInput(vocal: string): Promise<void> {
    await this.vocalInput.sendKeys(vocal);
  }

  async getVocalInput(): Promise<string> {
    return await this.vocalInput.getAttribute('value');
  }

  async setCountrySelect(country: string): Promise<void> {
    await this.countrySelect.sendKeys(country);
  }

  async getCountrySelect(): Promise<string> {
    return await this.countrySelect.element(by.css('option:checked')).getText();
  }

  async countrySelectLastOption(): Promise<void> {
    await this.countrySelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async setDescriptionInput(description: string): Promise<void> {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput(): Promise<string> {
    return await this.descriptionInput.getAttribute('value');
  }

  async setSongAddressInput(songAddress: string): Promise<void> {
    await this.songAddressInput.sendKeys(songAddress);
  }

  async getSongAddressInput(): Promise<string> {
    return await this.songAddressInput.getAttribute('value');
  }

  async setLyricInput(lyric: string): Promise<void> {
    await this.lyricInput.sendKeys(lyric);
  }

  async getLyricInput(): Promise<string> {
    return await this.lyricInput.getAttribute('value');
  }

  async setAvatarInput(avatar: string): Promise<void> {
    await this.avatarInput.sendKeys(avatar);
  }

  async getAvatarInput(): Promise<string> {
    return await this.avatarInput.getAttribute('value');
  }

  async setListenCountInput(listenCount: string): Promise<void> {
    await this.listenCountInput.sendKeys(listenCount);
  }

  async getListenCountInput(): Promise<string> {
    return await this.listenCountInput.getAttribute('value');
  }

  async setFavoriteCountInput(favoriteCount: string): Promise<void> {
    await this.favoriteCountInput.sendKeys(favoriteCount);
  }

  async getFavoriteCountInput(): Promise<string> {
    return await this.favoriteCountInput.getAttribute('value');
  }

  async adsSelectLastOption(): Promise<void> {
    await this.adsSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async adsSelectOption(option: string): Promise<void> {
    await this.adsSelect.sendKeys(option);
  }

  getAdsSelect(): ElementFinder {
    return this.adsSelect;
  }

  async getAdsSelectedOption(): Promise<string> {
    return await this.adsSelect.element(by.css('option:checked')).getText();
  }

  async playlistSelectLastOption(): Promise<void> {
    await this.playlistSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async playlistSelectOption(option: string): Promise<void> {
    await this.playlistSelect.sendKeys(option);
  }

  getPlaylistSelect(): ElementFinder {
    return this.playlistSelect;
  }

  async getPlaylistSelectedOption(): Promise<string> {
    return await this.playlistSelect.element(by.css('option:checked')).getText();
  }

  async albumSelectLastOption(): Promise<void> {
    await this.albumSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async albumSelectOption(option: string): Promise<void> {
    await this.albumSelect.sendKeys(option);
  }

  getAlbumSelect(): ElementFinder {
    return this.albumSelect;
  }

  async getAlbumSelectedOption(): Promise<string> {
    return await this.albumSelect.element(by.css('option:checked')).getText();
  }

  async favoriteSelectLastOption(): Promise<void> {
    await this.favoriteSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async favoriteSelectOption(option: string): Promise<void> {
    await this.favoriteSelect.sendKeys(option);
  }

  getFavoriteSelect(): ElementFinder {
    return this.favoriteSelect;
  }

  async getFavoriteSelectedOption(): Promise<string> {
    return await this.favoriteSelect.element(by.css('option:checked')).getText();
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class SongsDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-songs-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-songs'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
