import { test, expect } from "@playwright/test";

test("Indonesian is the server-rendered default, regardless of browser preference", async ({
  page,
  request,
}) => {
  const response = await request.get("/", {
    headers: { "Accept-Language": "en-US,en;q=0.9" },
  });
  const html = await response.text();
  expect(html).toContain('lang="id"');
  expect(html).toContain("Satu ruang kecil.");
  await page.goto("/");
  await expect(
    page.getByRole("combobox", { name: "Pilih bahasa" }),
  ).toHaveValue("id");
  await expect(
    page.getByRole("heading", { name: "Satu ruang kecil. Sepenuhnya kamu." }),
  ).toBeVisible();
  await expect(page).toHaveTitle(/Satu ruang kecil/);
});

test("language selection persists through navigation, reload, and server rendering", async ({
  page,
  context,
}) => {
  await page.goto("/");
  await page.getByRole("combobox", { name: "Pilih bahasa" }).selectOption("en");
  await expect(
    page.getByRole("heading", { name: "A little space. All of you." }),
  ).toBeVisible();
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page).toHaveTitle(/A little space/);
  await page.getByRole("link", { name: "Log in", exact: true }).click();
  await expect(page.getByLabel("Email address")).toBeVisible();
  await page.reload();
  await expect(
    page.getByRole("combobox", { name: "Choose language" }),
  ).toHaveValue("en");
  const cookies = await context.cookies();
  expect(cookies.find((c) => c.name === "linkspace-locale").value).toBe("en");
  await page
    .getByRole("combobox", { name: "Choose language" })
    .selectOption("id");
  await expect(page.getByLabel("Alamat email")).toBeVisible();
  await page.getByLabel("Alamat email").fill("salah");
  await page.getByRole("button", { name: "Periksa format email" }).click();
  await expect(
    page.getByText("Masukkan alamat email yang valid."),
  ).toBeVisible();
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("lang", "id");
});

test("switching language keeps unsaved profile content and translates notices", async ({
  page,
}) => {
  await page.goto("/dashboard/builder");
  await page.getByLabel("Nama tampilan").fill("Nama Karyaku");
  await page
    .getByLabel("Bio", { exact: true })
    .fill("My bio stays exactly as written.");
  await page.getByRole("tab", { name: "Tautan", exact: true }).click();
  await page
    .getByRole("button", { name: "Tambah tautan", exact: true })
    .click();
  await page
    .locator(".link-editor")
    .last()
    .getByLabel("Judul tautan")
    .fill("My new link");
  await page.getByRole("combobox", { name: "Pilih bahasa" }).selectOption("en");
  await expect(
    page.getByRole("tab", { name: "Links", exact: true }),
  ).toBeVisible();
  await expect(
    page.locator(".link-editor").last().getByLabel("Link title"),
  ).toHaveValue("My new link");
  await expect(
    page
      .locator(".preview-panel")
      .getByRole("link", { name: "My new link", exact: true }),
  ).toBeVisible();
  await page.getByRole("tab", { name: "Profile", exact: true }).click();
  await expect(page.getByLabel("Display name")).toHaveValue("Nama Karyaku");
  await expect(page.getByLabel("Bio", { exact: true })).toHaveValue(
    "My bio stays exactly as written.",
  );
  await page
    .getByRole("combobox", { name: "Choose language" })
    .selectOption("id");
  await page.getByRole("button", { name: "Simpan draf demo" }).click();
  await expect(page.locator(".notice[role=status]")).toContainText(
    "Draf hanya tersimpan di browser ini",
  );
  await page.reload();
  await expect(page.getByLabel("Nama tampilan")).toHaveValue("Nama Karyaku");
});

for (const width of [375, 390, 768, 1024, 1440]) {
  test(`Indonesian pages fit ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    for (const route of [
      "/",
      "/login",
      "/signup",
      "/dashboard",
      "/dashboard/builder",
      "/pricing",
      "/alexrivera",
    ]) {
      await page.goto(route);
      await expect(
        page.getByRole("combobox", { name: "Pilih bahasa" }),
      ).toHaveValue("id");
      if (route.includes("builder"))
        await expect(page.getByLabel("Nama tampilan")).toBeVisible();
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
      ).toBe(true);
    }
    await page.goto("/dashboard/builder");
    if (width < 768) {
      await page
        .getByRole("button", { name: "Pratinjau", exact: true })
        .click();
      await expect(page.locator(".preview-panel .phone")).toBeVisible();
      await page.getByRole("button", { name: "Edit", exact: true }).click();
    }
    await page.getByRole("tab", { name: "Tampilan", exact: true }).click();
    await page
      .getByRole("button", { name: "Gelap Malam", exact: true })
      .click();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
  });
}

test("unsupported locale falls back to Indonesian", async ({
  context,
  page,
}) => {
  await context.addCookies([
    { name: "linkspace-locale", value: "fr", url: "http://127.0.0.1:3000" },
  ]);
  await page.goto("/pricing");
  await expect(page.locator("html")).toHaveAttribute("lang", "id");
  await expect(
    page.getByRole("heading", { name: "Mulai kecil. Bermimpi besar." }),
  ).toBeVisible();
});
