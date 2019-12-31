import { element, by, ElementFinder } from 'protractor';

export class PagesComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-pages-my-suffix div table .btn-danger'));
  title = element.all(by.css('jhi-pages-my-suffix div h2#page-heading span')).first();

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

export class PagesUpdatePage {
  pageTitle = element(by.id('jhi-pages-my-suffix-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  nameInput = element(by.id('field_name'));
  avatarInput = element(by.id('field_avatar'));
  idolInput = element(by.id('field_idol'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setNameInput(name: string): Promise<void> {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput(): Promise<string> {
    return await this.nameInput.getAttribute('value');
  }

  async setAvatarInput(avatar: string): Promise<void> {
    await this.avatarInput.sendKeys(avatar);
  }

  async getAvatarInput(): Promise<string> {
    return await this.avatarInput.getAttribute('value');
  }

  async setIdolInput(idol: string): Promise<void> {
    await this.idolInput.sendKeys(idol);
  }

  async getIdolInput(): Promise<string> {
    return await this.idolInput.getAttribute('value');
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

export class PagesDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-pages-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-pages'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
