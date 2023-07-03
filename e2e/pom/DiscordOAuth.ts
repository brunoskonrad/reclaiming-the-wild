import { Locator, Page } from "@playwright/test";

export class DiscordOAuth {
  readonly page: Page;
  private authorizeLocator: Locator;

  constructor(page: Page) {
    this.page = page;
    // NOTE(brunoskonrad) this locator selector may change from Discord's side
    this.authorizeLocator = this.page.locator(
      ".lookFilled-1H2Jvj.colorBrand-2M3O3N"
    );
  }

  async login(email: string, password: string) {
    await this.page.locator('input[name="email"]').type(email);
    await this.page.locator('input[name="password"]').type(password);

    await this.page.locator('button[type="submit"]').click();
  }

  async authorise() {
    await this.authorizeLocator.click();
  }
}
