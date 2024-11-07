import {expect, test} from '@playwright/test'

test.beforeEach(async({page}) => {
    await page.goto('http://localhost:4200/')
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
})


test('Locator syntax rules', async({page}) => {
    //by Tag name
    await page.locator('input').first().click()

    //by ID
    page.locator('#inputEmail1')
    await page.locator('#inputFirstName').fill('Adilzhan')
    await page.locator('#inputLastName').fill('Ismailov')
    await page.locator('#inputEmail').fill('lekakz007@gmail.com')
    await page.locator('#inputWebsite').fill('animationhub.kz')
    await page.locator('[class="appearance-filled size-medium shape-rectangle status-basic nb-transition"]').click()

    //by Class value
    page.locator('.nb-transition')

    //by Attribute
    page.locator('[placeholder="Email"]')

    //by Class Value (full)
    page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]')

    //combine different selectors
    page.locator('input[placeholder="Email"].nb-transition')

    //by XPath (NOT RECOMMENDED)
    page.locator('//*[@id="inputEmail1"]')

    //by partial text match
    page.locator(':text("Using")')

    //by exact text match
    page.locator(':text-is("Using the Grid")')
})


test.describe.skip('suite 3', () => {
    test('Locator syntax rules1', async({page}) => {
        //by Tag name
        page.locator('input')

        //by ID
        page.locator('#inputEmail1')

        //by Class value
        page.locator('.nb-transition')

        //by Attribute
        page.locator('[placeholder="Email"]')

        //by Class Value (full)
        page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]')

        //combine different selectors
        page.locator('input[placeholder="Email"].nb-transition')

        //by XPath
        page.locator('//*[@id="inputEmail1"]')

        //by partial text match
        page.locator(':text("Using")')

        //by exact text match
        page.locator(':text-is("Using the Grid")')
    })
})



test('User facing locators', async({page}) =>  {
    await page.getByRole('textbox', {name: "Email"}).first().click()
    await page.getByRole('button', {name: "Sign in"}).first().click()
    await page.getByRole('textbox', {name: "Message"}).fill('simple message')
    await page.getByLabel('Email address').first().fill('someemail@gmail.com')
    await page.getByLabel('First Name').fill('Adilzhan')
    await page.getByPlaceholder('Jane Doe').click()
    await page.getByText('Using the Grid').click()
    await page.getByTestId('SignIn').click()
    await page.getByTitle('IoT Dashboard').click()    
})

test('user facing locators 2', async({page}) => {
    await page.getByPlaceholder('Jane Doe').fill('Adilzhan Ismailov')
    await page.getByPlaceholder('Email').first().fill('lekakz007@gmail.com')

    await page.getByLabel('Email').first().fill('lekakz007@gmail.com')
    await page.getByLabel('Password').first().fill('test123')

    await page.locator('#exampleInputEmail1').fill('lekakz007@gmail.com')
    await page.locator('#exampleInputPassword1').fill('test123')

    await page.getByRole('textbox', {name:"Recipients"}).fill('test123')
    await page.getByRole('textbox', {name:"Subject"}).fill('test321')
    await page.getByRole('textbox', {name:"Message"}).fill('test123321')

    await page.locator('#inputFirstName').fill('Adilzhan')
    await page.locator('#inputLastName').fill('Ismailov')
    await page.locator('#inputEmail').fill('lekakz007@gmail.com')
    await page.getByLabel('Website').fill('animationhub.kz')
})


test('locating child elements', async({page}) => {
    //find locator with child elements (with the spaces you go down in DOM: nb-card --> nb-radio --> :text-is("Something"))
    await page.locator('nb-card nb-radio :text-is("Option 1")').click()
    //these is NO COMPACT (TRY TO AVOID THIS METHOD)
    await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 2")').click()
    //how to use locator & facing together
    await page.locator('nb-card').getByRole('button', {name:"Sign in"}).first().click()
    //provide index by NTH to particular element (TRY TO AVOID THIS METHOD)
    await page.locator('nb-card').nth(3).getByRole('button').click()
})


test('locating parent elements', async({page}) => {
    //to find a web element using locator method we can use 'hasText/has'
    await page.locator('nb-card', {hasText:"Using the Grid"}).getByRole('textbox', {name: "Email"}).click()
    await page.locator('nb-card', {has: page.locator('#inputEmail1')}).getByRole('textbox', {name: "Email"}).click()
    //or we can use .filter method to do exact same thing
    await page.locator('nb-card').filter({hasText:"Basic form"}).getByRole('textbox', {name: "Email"}).click()
    await page.locator('nb-card').filter({has:page.locator('.status-danger')}).getByRole('textbox', {name: "Password"}).click()
    //or we can use alternative .filter to .filter MORE
    await page.locator('nb-card').filter({has:page.locator('nb-checkbox')}).filter({hasText:"Sign in"}).getByRole('textbox', {name: "Email"}).click()
    //and we can use xpath to 1 lvl up in the DOM and then find child element
    await page.locator(':text-is("Using the Grid")').locator('..').getByRole('textbox', {name: "Email"}).click()
})


test('locating elements', async({page}) => {
    await page.getByTitle('Forms').click()
    await page.getByTitle('Datepicker').click()
    await page.locator('nb-card', {hasText:"Common Datepicker"}).getByPlaceholder('Form Picker').click()
    await page.locator('#cdk-overlay-0 > nb-datepicker-container > nb-overlay-container > nb-calendar > nb-base-calendar > nb-card > nb-card-body > nb-calendar-day-picker > div > nb-calendar-picker > nb-calendar-picker-row:nth-child(3) > nb-calendar-day-cell:nth-child(3) > div').click()
})


test('locating elements more', async({page}) => {
    await page.getByTitle('Modal & Overlays').click()
    await page.getByTitle('Popover').click()
    await page.locator('nb-card', {has: page.locator('.status-success')}).getByRole('button', {name:"on click"}).click()
    await page.locator('nb-card', {hasText:'Component Popovers'}).getByRole('button', {name:"With card"}).click()
})


test('Reusing the locators', async({page}) => {
    //we can make a const with locators to fastly reuse them in code/tests
    const basicForm = page.locator('nb-card').filter({hasText:"Basic form"})
    const emailField = basicForm.getByRole('textbox', {name: "Email"})
    //here you can look how to reuse them
    await emailField.fill('test@test.com')
    await basicForm.getByRole('textbox', {name: "Password"}).fill('welcome123')
    await basicForm.locator('nb-checkbox').click()
    await basicForm.getByRole('button').click()
    //first assertion
    await expect(emailField).toHaveValue('test@test.com')
})


test('extracting values', async({page}) => {
    //how to get a single text value
    const basicForm = page.locator('nb-card').filter({hasText:"Basic form"})
    const buttonText = await basicForm.locator('button').textContent()
    expect(buttonText).toEqual('Submit')

    //how to get all text values
    const allRadioButtonsLabels = await page.locator('nb-radio').allTextContents()
    expect(allRadioButtonsLabels).toContain("Option 1")
    console.log(allRadioButtonsLabels)

    //how to find the value of input field
    const emailField = basicForm.getByRole('textbox', {name: "Email"})
    await emailField.fill('test@test.com')
    const emailValue = await emailField.inputValue()
    expect(emailValue).toEqual('test@test.com')

    //how to get a value from the attribute
    const placeholderValue = await emailField.getAttribute('placeholder')
    expect(placeholderValue).toEqual('Email')
})


test('assertions', async({page}) => {
    //General assertions (very simple - comparing)
    const value = 5
    expect(value).toEqual(5)
    //inside expect method provide argument to assert 
    //then choose method and provide expectration
    const basicFormButton = page.locator('nb-card').filter({hasText:"Basic Form"}).locator('button')
    const text = await basicFormButton.textContent()
    expect(text).toEqual('Submit')

    //Locator assertions
    await expect(basicFormButton).toHaveText('Submit')
    //Soft assertions (to continiue make steps after fail)
    await expect.soft(basicFormButton).toHaveText('Submit5')
    await basicFormButton.click()
})



test('mine test after reusing & extracting & assertions', async({page}) => {
    //for reuse locators
    const form = page.locator('nb-card').filter({hasText:"Form without labels"})
    const input1 = form.getByRole('textbox', {name:"Recipients"})
    const input2 = form.getByRole('textbox', {name:"Subject"})
    const input3 = form.getByRole('textbox', {name:"Message"})
    //for extract value
    const inputsText = await form.locator('nb-card nb-card-body').allTextContents()
    console.log(inputsText)
    expect.soft(input1).toBeEmpty()

    await input1.fill('some text')
    await input2.fill('some new text')
    await input3.fill('some sh text again')
    const input1Value = await input1.inputValue()
    const input2Value = await input2.inputValue()
    const input3Value = await input3.inputValue()
    const input2Attribute = await input2.getAttribute('placeholder')

    expect(form).toHaveText('Form without labelsSend')
    
    expect(input1Value).toEqual('some text')
    expect(input2Value).toContain('some new text')
    expect(input3Value).toEqual('some sh text again')
    expect(input2Attribute).toEqual('Subject')
})

