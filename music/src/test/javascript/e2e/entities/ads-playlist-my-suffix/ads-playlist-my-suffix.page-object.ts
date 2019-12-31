import { element, by, ElementFinder } from 'protractor';

export class AdsPlaylistComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-ads-playlist-my-suffix div table .btn-danger'));
  title = element.all(by.css('jhi-ads-playlist-my-suffix div h2#page-heading span')).first();

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

export class AdsPlaylistUpdatePage {
  pageTitle = element(by.id('jhi-ads-playlist-my-suffix-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  contentInput = element(by.id('field_content'));
  imageInput = element(by.id('field_image'));
  playlistIdInput = element(by.id('field_playlistId'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setContentInput(content: string): Promise<void> {
    await this.contentInput.sendKeys(content);
  }

  async getContentInput(): Promise<string> {
    return await this.contentInput.getAttribute('value');
  }

  async setImageInput(image: string): Promise<void> {
    await this.imageInput.sendKeys(image);
  }

  async getImageInput(): Promise<string> {
    return await this.imageInput.getAttribute('value');
  }

  async setPlaylistIdInput(playlistId: string): Promise<void> {
    await this.playlistIdInput.sendKeys(playlistId);
  }

  async getPlaylistIdInput(): Promise<string> {
    return await this.playlistIdInput.getAttribute('value');
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

export class AdsPlaylistDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-adsPlaylist-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-adsPlaylist'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
