import {test} from '@playwright/test'

test.beforeAll(async({page}) => {
    
})


test.describe('My suite 1', () => {
    test.beforeEach(async({page}) => {
        page.goto('https://google.kz')
    })

    test('search habr test', async ({page}) => {
        await page.getByLabel('Іздеу', { exact: true }).click();
        await page.getByLabel('Іздеу', { exact: true }).fill('habr.com');
        await page.goto('https://habr.com/ru/articles/');
        await page.getByRole('link', { name: 'Моя лента' }).click();
        await page.getByRole('link', { name: 'Все потоки' }).click();
        await page.getByRole('link', { name: 'Разработка', exact: true }).click();
        await page.getByRole('link', { name: 'Администрирование' }).click();
        await page.getByRole('link', { name: 'Дизайн' }).click();
        await page.getByRole('link', { name: 'Менеджмент' }).click();
        await page.getByRole('link', { name: 'Маркетинг' }).click();
        await page.getByRole('link', { name: 'Маркетинг', exact: true }).click();
        await page.getByRole('link', { name: 'Научпоп' }).click();
        await page.locator('[data-test-id="news_block_more"]').click();
        await page.getByRole('button', { name: 'Войти' }).click();
        await page.locator('input[name="email"]').click();
        await page.locator('input[name="email"]').fill('testtesttest@email.com');
        await page.locator('input[name="email"]').press('Tab');
        await page.locator('input[name="password"]').fill('test123456');
    })
})