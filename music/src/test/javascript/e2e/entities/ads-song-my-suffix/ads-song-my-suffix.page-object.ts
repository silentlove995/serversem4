import { element, by, ElementFinder } from 'protractor';

export class AdsSongComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-ads-song-my-suffix div table .btn-danger'));
  title = element.all(by.css('jhi-ads-song-my-suffix div h2#page-heading span')).first();

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

export class AdsSongUpdatePage {
  pageTitle = element(by.id('jhi-ads-song-my-suffix-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  contentInput = element(by.id('field_content'));
  imageInput = element(by.id('field_image'));
  songIdInput = element(by.id('field_songId'));

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

  async setSongIdInput(songId: string): Promise<void> {
    await this.songIdInput.sendKeys(songId);
  }

  async getSongIdInput(): Promise<string> {
    return await this.songIdInput.getAttribute('value');
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

export class AdsSongDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-adsSong-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-adsSong'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
