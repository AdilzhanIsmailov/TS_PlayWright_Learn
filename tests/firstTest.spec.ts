import {test} from '@playwright/test'


test.beforeAll(() => {
    
})


test.beforeEach(async({page}) => {
    await page.goto('http://localhost:4200/')
})

test.describe.skip('suite 1 ', () => {
    test.beforeEach(async({page}) => {
        await page.getByText('Tables & Data').click()
    })
    
    test('Navigate to Smart Table', async ({page}) => {
        await page.getByText('Smart Table').click()
    })
    
    
    test('Navigate to Tree Grid', async ({page}) => {
        await page.getByText('Tree Grid').click()
    })
})

test.describe('suite 2 ', () => {
    test.beforeEach(async({page}) => {
        await page.getByText('Forms').click()
    })
    
    test('Navigate to Forms Layouts', async ({page}) => {
        await page.getByText('Form Layouts').click()
    })
    
    
    test('Navigate to Datepicker', async ({page}) => {
        await page.getByText('Datepicker').click()
        await page.getByPlaceholder('Form Picker').click();
        await page.getByText('31').click();
        await page.getByPlaceholder('Range Picker').click();
        await page.getByText('31', { exact: true }).click();
        await page.getByPlaceholder('Min Max Picker').click();
        await page.getByText('22').click();
        await page.locator('nb-layout-column').click();
    })
})


test.skip('my test name', async ({page}) => {
    await page.goto('https://google.kz/')
})

//test.afterAll(async({page}) => {
//    await page.close
//})await page.getByPlaceholder('Form Picker').click();


