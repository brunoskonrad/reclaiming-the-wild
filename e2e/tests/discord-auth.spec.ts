import { test, expect } from "@playwright/test";
import { DiscordOAuth } from "../pom/DiscordOAuth";
import { NewCharacterPage } from "../pom/NewCharacterPage";

test("authenticate with Discord", async ({ page }) => {
  await page.goto("http://localhost:3000");
  await expect(page.getByTestId("username")).not.toBeVisible();

  await page.goto("http://localhost:3000/api/auth/signin");
  await expect(page).toHaveTitle("Sign In");

  await page.getByText("Sign in with Discord").click({
    timeout: 10_000,
  });

  const discordOAuth = new DiscordOAuth(page);

  await discordOAuth.login(
    process.env.E2E_DISCORD_EMAIL!,
    process.env.E2E_DISCORD_PASSWORD!
  );
  await discordOAuth.authorise();

  await expect(page).toHaveTitle("Create Next App");
  await expect(page.getByTestId("username")).toHaveText("brunoskonrad-testing");
});

test("create a new character, then", async ({ page }) => {
  const newCharacterPage = new NewCharacterPage(page);

  await newCharacterPage.goto();
  await newCharacterPage.traits.set("combat", 2);
  await newCharacterPage.traits.set("hearts", 3);
  await newCharacterPage.traits.set("athletics", 1);
  await newCharacterPage.traits.set("athletics", 1);
  await newCharacterPage.traits.set("athletics", 1);
  await newCharacterPage.traits.set("athletics", 1);
});
