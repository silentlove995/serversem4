import { element, by, ElementFinder } from 'protractor';

export class PostsComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-posts-my-suffix div table .btn-danger'));
  title = element.all(by.css('jhi-posts-my-suffix div h2#page-heading span')).first();

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

export class PostsUpdatePage {
  pageTitle = element(by.id('jhi-posts-my-suffix-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  titleInput = element(by.id('field_title'));
  contentInput = element(by.id('field_content'));
  commentInput = element(by.id('field_comment'));
  imageInput = element(by.id('field_image'));
  likeInput = element(by.id('field_like'));
  songAddressInput = element(by.id('field_songAddress'));
  pagesSelect = element(by.id('field_pages'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setTitleInput(title: string): Promise<void> {
    await this.titleInput.sendKeys(title);
  }

  async getTitleInput(): Promise<string> {
    return await this.titleInput.getAttribute('value');
  }

  async setContentInput(content: string): Promise<void> {
    await this.contentInput.sendKeys(content);
  }

  async getContentInput(): Promise<string> {
    return await this.contentInput.getAttribute('value');
  }

  async setCommentInput(comment: string): Promise<void> {
    await this.commentInput.sendKeys(comment);
  }

  async getCommentInput(): Promise<string> {
    return await this.commentInput.getAttribute('value');
  }

  async setImageInput(image: string): Promise<void> {
    await this.imageInput.sendKeys(image);
  }

  async getImageInput(): Promise<string> {
    return await this.imageInput.getAttribute('value');
  }

  async setLikeInput(like: string): Promise<void> {
    await this.likeInput.sendKeys(like);
  }

  async getLikeInput(): Promise<string> {
    return await this.likeInput.getAttribute('value');
  }

  async setSongAddressInput(songAddress: string): Promise<void> {
    await this.songAddressInput.sendKeys(songAddress);
  }

  async getSongAddressInput(): Promise<string> {
    return await this.songAddressInput.getAttribute('value');
  }

  async pagesSelectLastOption(): Promise<void> {
    await this.pagesSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async pagesSelectOption(option: string): Promise<void> {
    await this.pagesSelect.sendKeys(option);
  }

  getPagesSelect(): ElementFinder {
    return this.pagesSelect;
  }

  async getPagesSelectedOption(): Promise<string> {
    return await this.pagesSelect.element(by.css('option:checked')).getText();
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

export class PostsDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-posts-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-posts'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
