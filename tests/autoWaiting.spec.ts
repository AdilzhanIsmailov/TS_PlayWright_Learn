import {test, expect} from '@playwright/test'
import { timeout } from 'rxjs-compat/operator/timeout'


test.beforeEach(async({page}, testInfo) => {
    await page.goto('http://uitestingplayground.com/ajax')
    await page.getByText('Button Triggering AJAX Request').click()
    testInfo.setTimeout(testInfo.timeout + 2000)
})

test('auto waiting', async({page}) => {
    const successButton = page.locator('.bg-success')
    //await successButton.click()
    const text = await successButton.textContent()
    await successButton.waitFor({state:"attached"})
    //const text = await successButton.allTextContents() --this method NOT support autowaitngs
    expect(text).toContain('Data loaded with AJAX get request.')
    await expect(successButton).toHaveText('Data loaded with AJAX get request.', {timeout:20000})
})


test('alternative waits', async({page}) => {
    const successButton = page.locator('.bg-success')
    //wait for element
    await page.waitForSelector('.bg-success')
    //wait for particular response
    await page.waitForResponse('http://uitestingplayground.com/ajaxdata')
    //wait for network calls to be completed ('NOT RECOMMENDED)
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(5000)
    await page.waitForURL('https://PARTICULAR URL TO TRIGGER TO UNWAIT')
    
    const text = await successButton.allTextContents()
    expect(text).toContain('Data loaded with AJAX get request.')
})


// timeouts
// Global Timeout is for entire test/suite. (default no timeout)
// Test Timeout is the time limit for single test execution (default 30seconds/300000ms)
// Action Timeout - time limit for the action command
//ex .click() .fill() .textContent(), etc.. (default no timeout)
// Navigation Timeout - time limit for the action command ex: page.goto('/) (default no timeout)
// Expect Timeout - time limit for "expect" locator assertions
// ex: expect(locator).toHaveText('Hello world') (default: 5s/5000ms)
//uses only in LOCATOR assertions -- GENERIC assertions don't have any timeout

test('timeouts', async({page}) => {
    //test.setTimeout(10000)
    test.slow()
    const successButton = page.locator('.bg-success')
    await successButton.click()
})

//to change timeouts setting go to playwright.config.ts
//and in define config can be add/changed: timeout: 10000, globalTimeout: 60000, expect:{timeout: 2000},
//also in 'use' section can be add/changed: actionTimeout: 10000, navigationTimeout: 10000
//and we can add timeout like this in beforeEach:
// test.beforeEach(async({page}, testInfo) => {
//     testInfo.setTimeout(testInfo.timeout + 2000)
// })


