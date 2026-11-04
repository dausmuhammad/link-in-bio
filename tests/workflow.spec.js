import { test, expect } from "@playwright/test";
for (const width of [375, 390, 768, 1024, 1440]) {
  test(`responsive pages at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    for (const route of [
      "/",
      "/login",
      "/signup",
      "/dashboard",
      "/dashboard/builder",
      "/alexrivera",
      "/pricing",
    ]) {
      await page.goto(route);
      if (route.includes("builder"))
        await expect(
          page.getByRole("tab", { name: "Profile", exact: true }),
        ).toBeVisible();
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
      ).toBe(true);
    }
    await page.goto("/dashboard/builder");
    if (width < 768) {
      await page.getByRole("button", { name: "Preview", exact: true }).click();
      await expect(page.locator(".preview-panel .phone")).toBeVisible();
      await page.getByRole("button", { name: "Edit", exact: true }).click();
    }
    await expect(page.getByLabel("Display name")).toBeVisible();
  });
}
test("local draft, live preview, links, ordering and validation", async ({
  page,
}) => {
  await page.goto("/dashboard/builder");
  await page.getByLabel("Display name").fill("Maya Studio");
  await expect(page.locator(".preview-panel h2")).toHaveText("Maya Studio");
  await page.getByRole("button", { name: "Save demo draft" }).click();
  await expect(page.locator(".notice[role=status]")).toContainText(
    "browser only",
  );
  await page.reload();
  await expect(page.getByLabel("Display name")).toHaveValue("Maya Studio");
  await page.getByRole("tab", { name: "Links", exact: true }).click();
  await page.getByRole("button", { name: "Add a link", exact: true }).click();
  const last = page.locator(".link-editor").last();
  await last.getByLabel("Link title").fill("New project");
  await last.getByLabel("Destination URL").fill("javascript:alert(1)");
  await page.getByRole("button", { name: "Save demo draft" }).click();
  await expect(page.locator(".notice[role=status]")).toContainText(
    "Check your name",
  );
  await expect(
    page.locator('.preview-panel a[href^="javascript:"]'),
  ).toHaveCount(0);
  await last.getByLabel("Destination URL").fill("https://example.com/new");
  await page.getByRole("button", { name: "Save demo draft" }).click();
  const handle = page.getByRole("button", {
    name: "Reorder New project",
    exact: true,
  });
  await handle.focus();
  await page.keyboard.press("Space");
  await expect(handle).toHaveAttribute("aria-pressed", "true");
  await page.keyboard.press("ArrowUp");
  await expect(page.locator("[id^=DndLiveRegion]")).toContainText(
    "over droppable area collaborate",
  );
  await page.keyboard.press("Space");
  await expect(
    page.locator(".link-editor").nth(2).getByLabel("Link title"),
  ).toHaveValue("New project");
  await page.getByRole("button", { name: "Save demo draft" }).click();
  await page.reload();
  await page.getByRole("tab", { name: "Links", exact: true }).click();
  await expect(
    page.locator(".link-editor").nth(2).getByLabel("Link title"),
  ).toHaveValue("New project");
  await page.locator(".link-editor").nth(2).getByLabel("Enabled").uncheck();
  await expect(
    page.locator(".preview-panel").getByRole("link", { name: "New project" }),
  ).toHaveCount(0);
  await page
    .getByRole("button", { name: "Delete New project", exact: true })
    .click();
  await expect(page.locator(".link-editor")).toHaveCount(3);
  await page.getByRole("tab", { name: "Appearance", exact: true }).click();
  await page
    .getByRole("button", { name: "Midnight Dark", exact: true })
    .click();
  await expect(page.locator(".preview-panel .profile-page")).toHaveClass(
    /theme-midnight-dark/,
  );
  await page.getByRole("tab", { name: "Profile", exact: true }).click();
  await page.getByLabel("Username").fill("dashboard");
  await page.getByRole("button", { name: "Save demo draft" }).click();
  await expect(page.locator(".notice[role=status]")).toContainText("reserved");
  page.once("dialog", (dialog) => dialog.dismiss());
  await page.getByRole("link", { name: "Overview", exact: true }).click();
  await expect(page).toHaveURL(/builder/);
});
test("auth is transparent and unknown profile is 404", async ({ page }) => {
  await page.goto("/login");
  await page.getByLabel("Email address").fill("bad");
  await page.getByRole("button", { name: "Check email format" }).click();
  await expect(page.getByText("Enter a valid email address.")).toBeVisible();
  await page.getByLabel("Email address").fill("hello@example.com");
  await page.getByRole("button", { name: "Check email format" }).click();
  await expect(page.locator(".notice[role=status]")).toContainText(
    "no account or session was created",
  );
  const response = await page.goto("/unknown-user");
  expect(response.status()).toBe(404);
  await expect(
    page.getByRole("heading", { name: "This space isn’t available." }),
  ).toBeVisible();
});

test("broken browser drafts and storage failures are visible", async ({
  page,
}) => {
  await page.addInitScript(() =>
    localStorage.setItem("linkspace-demo-draft-v1", "{broken"),
  );
  await page.goto("/dashboard/builder");
  await expect(page.locator(".notice[role=status]")).toContainText(
    "Could not read",
  );
  await expect(page.getByLabel("Display name")).toHaveValue("Alex Rivera");
  await page.evaluate(() => {
    Storage.prototype.setItem = () => {
      throw new Error("storage unavailable");
    };
  });
  await page.getByLabel("Display name").fill("Still here");
  await page.getByRole("button", { name: "Save demo draft" }).click();
  await expect(page.locator(".notice[role=status]")).toContainText(
    "Could not save",
  );
  await expect(page.getByLabel("Display name")).toHaveValue("Still here");
});

test("interface theme persists and sidebar can collapse", async ({ page }) => {
  await page.goto("/dashboard");
  await page.getByRole("button", { name: "Toggle color theme" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.getByRole("button", { name: "Collapse sidebar" }).click();
  await expect(page.locator(".dashboard-shell")).toHaveClass(/collapsed/);
});
