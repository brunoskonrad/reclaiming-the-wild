import { test, expect } from "@playwright/test";
import { DiscordOAuth } from "../pom/DiscordOAuth";

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
