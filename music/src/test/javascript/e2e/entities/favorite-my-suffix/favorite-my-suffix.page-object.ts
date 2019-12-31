import { element, by, ElementFinder } from 'protractor';

export class FavoriteComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-favorite-my-suffix div table .btn-danger'));
  title = element.all(by.css('jhi-favorite-my-suffix div h2#page-heading span')).first();

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

export class FavoriteUpdatePage {
  pageTitle = element(by.id('jhi-favorite-my-suffix-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  userInput = element(by.id('field_user'));
  songInput = element(by.id('field_song'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setUserInput(user: string): Promise<void> {
    await this.userInput.sendKeys(user);
  }

  async getUserInput(): Promise<string> {
    return await this.userInput.getAttribute('value');
  }

  async setSongInput(song: string): Promise<void> {
    await this.songInput.sendKeys(song);
  }

  async getSongInput(): Promise<string> {
    return await this.songInput.getAttribute('value');
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

export class FavoriteDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-favorite-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-favorite'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
