import { element, by, ElementFinder } from 'protractor';

export class AlbumComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-album-my-suffix div table .btn-danger'));
  title = element.all(by.css('jhi-album-my-suffix div h2#page-heading span')).first();

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

export class AlbumUpdatePage {
  pageTitle = element(by.id('jhi-album-my-suffix-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  titleInput = element(by.id('field_title'));
  descriptionInput = element(by.id('field_description'));
  vocalInput = element(by.id('field_vocal'));
  thumbnailInput = element(by.id('field_thumbnail'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setTitleInput(title: string): Promise<void> {
    await this.titleInput.sendKeys(title);
  }

  async getTitleInput(): Promise<string> {
    return await this.titleInput.getAttribute('value');
  }

  async setDescriptionInput(description: string): Promise<void> {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput(): Promise<string> {
    return await this.descriptionInput.getAttribute('value');
  }

  async setVocalInput(vocal: string): Promise<void> {
    await this.vocalInput.sendKeys(vocal);
  }

  async getVocalInput(): Promise<string> {
    return await this.vocalInput.getAttribute('value');
  }

  async setThumbnailInput(thumbnail: string): Promise<void> {
    await this.thumbnailInput.sendKeys(thumbnail);
  }

  async getThumbnailInput(): Promise<string> {
    return await this.thumbnailInput.getAttribute('value');
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

export class AlbumDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-album-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-album'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
