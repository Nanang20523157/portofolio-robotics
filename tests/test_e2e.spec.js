/**
 * Robotics Announce E2E Tests (JavaScript Playwright)
 * Tests UI flow, page elements, NIM search validation, result badges, and detail modal.
 */

const { test, expect } = require('@playwright/test');
const path = require('path');

test.describe('Robotics Announce E2E Tests', () => {
    const htmlPath = path.resolve(__dirname, '../src/html/index.html');
    const fileUrl = `file:///${htmlPath.replace(/\\/g, '/')}`;

    test.beforeEach(async ({ page }) => {
        await page.goto(fileUrl);
        await page.waitForLoadState('networkidle');
    });

    test('1. Page load and title check', async ({ page }) => {
        await expect(page).toHaveTitle(/Robotics Announce/);
    });

    test('2. Header countdown timer display', async ({ page }) => {
        const timer1 = page.locator('.timer1');
        await expect(timer1).toBeVisible();
        const dayText = await page.locator('.timer1 .day').textContent();
        expect(dayText).toBeTruthy();
    });

    test('3. Verify 6 division cards are rendered', async ({ page }) => {
        const cards = page.locator('.card');
        await expect(cards).toHaveCount(6);
    });

    test('4. Search form validation before countdown completion', async ({ page }) => {
        const searchBtn = page.locator('.btn-search');
        await searchBtn.click();
        const notice = page.locator('.notice');
        await expect(notice).toContainText(/belum memasuki waktu pengumuman|masukan tidak boleh kosong/);
    });

    test('5. Search NIM for LOLOS participant (Muhammad Ilham Sony)', async ({ page }) => {
        await page.evaluate(() => { window.tampilkan = true; });
        await page.fill('input#nim', '20539144016');
        await page.click('.btn-search');

        const resultInfo = page.locator('.div-info');
        await expect(resultInfo).toBeVisible();
        await expect(page.locator('.div-info-main span.text-green-900')).toContainText('Muhammad Ilham Sony');
        await expect(page.locator('.div-info .span-lolos')).toContainText('Lolos');
    });

    test('6. Search NIM for GAGAL participant (Muhamad Rizky Hadiningrat)', async ({ page }) => {
        await page.evaluate(() => { window.tampilkan = true; });
        await page.fill('input#nim', '1212070056');
        await page.click('.btn-search');

        const resultInfo = page.locator('.div-info');
        await expect(resultInfo).toBeVisible();
        await expect(page.locator('.div-info-main span.text-red-900')).toContainText('Muhamad Rizky Hadiningrat');
        await expect(page.locator('.div-info .span-lolos')).toContainText('Gagal');
    });

    test('7. Search unregistered NIM', async ({ page }) => {
        await page.evaluate(() => { window.tampilkan = true; });
        await page.fill('input#nim', '9999999999');
        await page.click('.btn-search');

        const notice = page.locator('.notice');
        await expect(notice).toContainText('nim mahasiswa tidak terdaftar');
    });

    test('8. Open and close detail overlay modal', async ({ page }) => {
        await page.evaluate(() => { window.tampilkan = true; });
        await page.fill('input#nim', '20539144016');
        await page.click('.btn-search');

        // Click Detail button
        await page.click('.detail-trigger');

        // Verify detail overlay modal content is visible
        const modalContent = page.locator('#display .display-iden');
        await expect(modalContent).toBeVisible();

        // Verify overlay modal content (Title & Participant Name)
        await expect(page.locator('#display')).toContainText('Data Diri Peserta');
        await expect(page.locator('#display .over-name')).toContainText('Muhammad Ilham Sony');

        // Click Close button and verify modal is removed
        await page.click('#display .close-btn');
        await expect(modalContent).toHaveCount(0);
    });
});
