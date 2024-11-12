import {test, expect} from '@playwright/test'

test.beforeEach(async({page}) => {
    await page.goto('https://www.globalsqa.com/demo-site/draganddrop/')
})


test.describe('Drag&Drop IFrame', () => {

    test('Drag&Drop learn', async({page}) => {
        //frist we need to switch TO IFRAME
        const frame = page.frameLocator('[rel-title="Photo Manager"] iframe')
        //then we could find WHAT to move and also WHERE to put this with .gratTo(frame.locator(locator here))
        await frame.locator('li', {hasText:"High Tatras 2"}).dragTo(frame.locator('#trash'))
        //more presice control(with mouse)
        await frame.locator('li', {hasText:"High Tatras 4"}).hover()
        await page.mouse.down()
        await frame.locator('#trash').hover()
        await page.mouse.up()
        await expect(frame.locator('#trash li h5')).toHaveText(['High Tatras 2', 'High Tatras 4'])
    })
    
    test('Drag&Drop mine', async({page}) => {
        const frame = page.frameLocator('[rel-title="Photo Manager"] iframe')
        const trashArea = frame.locator('#trash')
        await frame.locator('li', {hasText:"High Tatras"}).first().dragTo(trashArea)
        await expect(trashArea.locator('li h5')).toHaveText('High Tatras')
    })



})