import { BasePage } from "./BasePage";
import { Locator, Page } from "@playwright/test";

export class NewCharacterPage extends BasePage {
  readonly traits: TraitForm;

  constructor(page: Page) {
    super(page);

    this.traits = new TraitForm(this.page);
  }

  async goto() {
    await this.page.goto("http://localhost:3000/characters/new");
  }
}

class TraitForm extends BasePage {
  findTrait(name: Trait): Locator {
    return this.page.locator(`input[name="${name}"]`);
  }

  async set(name: Trait, level: number) {
    await this.findTrait(name).fill(level.toString());
  }

  async get(name: Trait): Promise<number> {
    try {
      return parseInt(await this.findTrait(name).inputValue());
    } catch (_err) {
      return NaN;
    }
  }

  async availableTokens(): Promise<number> {
    const value = await this.page.getByTestId("available-tokens").textContent();

    if (!value) return NaN;

    return parseInt(value);
  }
}

type Trait =
  | "combat"
  | "hearts"
  | "athletics"
  | "civilization"
  | "fortitude"
  | "intimidate"
  | "mechanics"
  | "smithing"
  | "willpower"
  | "magic"
  | "arcana"
  | "perception"
  | "influence"
  | "perform"
  | "discipline"
  | "enchanting"
  | "accuracy"
  | "stamina"
  | "nature"
  | "agility"
  | "command"
  | "insight"
  | "guile"
  | "cooking";
