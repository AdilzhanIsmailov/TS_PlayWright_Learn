import {test, expect} from '@playwright/test'

test.beforeEach(async({page}) => {
    await page.goto('http://localhost:4200/')
})


test.describe('Fill the forms page', () => {
    test('Fill the forms page', async({page}) => {
        await page.getByText('Forms').click()
        await page.getByText('Form Layouts').click()
        //FILL THE FIRST FORM
        const inlineForm = page.locator('nb-card', {hasText:"Inline form"})
        const ifName = inlineForm.getByPlaceholder('Jane Doe')
        const ifEmail = inlineForm.getByPlaceholder('Email')
        const ifCheckbox = inlineForm.getByRole('checkbox')
        const ifButton = inlineForm.getByRole('button', {name:"Submit"})
        await ifName.pressSequentially('Adilzhan Ismailov', {delay: 50})
        await ifEmail.pressSequentially('lekakz007@gmail.com', {delay:50})
        await ifCheckbox.check({force:true})
        await ifButton.click()
        //CHECK THAT ALL DATA IS SET
        await expect(ifName).toHaveValue('Adilzhan Ismailov')
        await expect(ifEmail).toHaveValue('lekakz007@gmail.com')
        expect(await ifCheckbox.isChecked()).toBeTruthy()
    })
    test('Fill the second block', async({page}) => {
        await page.getByText('Forms').click()
        await page.getByText('Form Layouts').click()

        const utg = page.locator('nb-card', {hasText:"Using the Grid"})
        const utgEmail = utg.getByRole('textbox', {name:"Email"})
        const utgPassword = utg.getByRole('textbox', {name:"Password"})
        const utgRadio1 = utg.getByRole('radio', {name:"Option 1"})
        const utgRadio2 = utg.getByRole('radio', {name:"Option 2"})
        const utgButton = utg.getByRole('button', {name:"Sign in"})

        await utgEmail.pressSequentially('lekakz007@gmail.com', {delay:50})
        await utgPassword.pressSequentially('testtesttest123', {delay:50})
        await utgRadio1.check({force:true})
        expect(await utgRadio1.isChecked()).toBeTruthy()
        await utgRadio2.check({force:true})
        expect(await utgRadio1.isChecked()).toBeFalsy()
        expect(await utgRadio2.isChecked()).toBeTruthy()
        await utgButton.click()
        await expect(utgEmail).toHaveValue('lekakz007@gmail.com')
        await expect(utgPassword).toHaveValue('testtesttest123')
        await page.close()
    })
    test('list of colors on the main page', async({page}) => {
        const header = page.locator('nb-layout-header ngx-header')
        const headerMenu = header.locator('nb-select').getByRole('button')
        await headerMenu.click()
        const headerMenuOptions = page.locator('nb-option-list nb-option')
        await expect(headerMenuOptions).toHaveText(["Light", "Dark", "Cosmic", "Corporate"])
        await headerMenuOptions.filter({hasText:"Dark"}).click()
        const headerColor = page.locator('nb-layout-header')
        await expect(headerColor).toHaveCSS('background-color', 'rgb(34, 43, 69)')

        const colors = {
            "Light": "rgb(255, 255, 255)",
            "Dark": "rgb(34, 43, 69)",
            "Cosmic": "rgb(50, 50, 89)",
            "Corporate": "rgb(255, 255, 255)"
        }
        await headerMenu.click()
        for(const color in colors){
            await headerMenuOptions.filter({hasText:color}).click()
            await expect(headerColor).toHaveCSS('background-color', colors[color])
            if(color != "corporate")
                await headerMenu.click()
        }

    })





    
})


test.describe('Form Layouts page', () => {
    test.beforeEach(async({page}) => {
        await page.getByText('Forms').click()
        await page.getByText('Form Layouts').click()
    })

    test('input fields', async({page}) => {
        const usingTheGridEmailInput = page.locator('nb-card', {hasText:"Using the Grid"}).getByRole('textbox', {name:"Email"})
        await usingTheGridEmailInput.fill('test@test.com')
        await usingTheGridEmailInput.clear()
        await usingTheGridEmailInput.pressSequentially('testNEW@test.net', {delay:150}) //slower typing for tests
        //generic assertions
        const inputValue = await usingTheGridEmailInput.inputValue()
        expect(inputValue).toEqual('testNEW@test.net')
        //locator assertion
        await expect(usingTheGridEmailInput).toHaveValue('testNEW@test.net')
    })

    test('input fields 2', async({page}) => {
        //my version with locator assertions
        const emailFieldInBasicForm = page.locator('nb-card', {hasText:"Basic form"}).getByRole('textbox', {name:"Email"})
        const passwordFieldInBasicForm = page.locator('nb-card', {hasText:"Basic form"}).getByRole('textbox', {name:"Password"})
        const checkBoxInBasicForm = page.locator('nb-card', {hasText:"Basic form"}).locator('.custom-checkbox')
        const buttonSubmitInBasicForm = page.locator('nb-card', {hasText:"Basic form"}).getByRole('button', {name:"Submit"})
        await emailFieldInBasicForm.fill('adilzhan@test.net')
        await emailFieldInBasicForm.clear()
        await emailFieldInBasicForm.pressSequentially('lekakz007@gmail.com', {delay:100})
        await expect(emailFieldInBasicForm).toHaveValue('lekakz007@gmail.com')
        await passwordFieldInBasicForm.pressSequentially('testtesttest123', {delay:100})
        await expect(passwordFieldInBasicForm).toHaveValue('testtesttest123')
        await checkBoxInBasicForm.click()
        await buttonSubmitInBasicForm.click()
        //if it would be generic assertions
        const emailInBasicFormInputValue = await emailFieldInBasicForm.inputValue()
        expect(emailInBasicFormInputValue).toEqual('lekakz007@gmail.com')
        const passwordInBasicFormInputValue = await passwordFieldInBasicForm.inputValue()
        expect(passwordInBasicFormInputValue).toEqual('testtesttest123')
    })
})

test.describe('Radio buttons', () => {
    test.beforeEach(async({page}) => {
        await page.getByText('Forms').click()
        await page.getByText('Form Layouts').click()
    })

    test('Radio buttons learn', async({page}) => {
        const usingTheGridForm = page.locator('nb-card', {hasText:"Using the Grid"})
        //need to use force:true while CHECKING because of "visually-hidden" parameter in input
        //await usingTheGridForm.getByLabel('Option 1').check({force: true})
        //we can also use getByRole and select 'radio'(type) & use check({force:true})
        await usingTheGridForm.getByRole('radio', {name:"Option 1"}).check({force: true})
        //to validate need to get information is it selected or NOT(yet) (.isChecked = true/false)
        const radioStatus = await usingTheGridForm.getByRole('radio', {name:"Option 1"}).isChecked()
        //now we can assert with expect in generic/locator assertions
        //generic assertion
        expect(radioStatus).toBeTruthy()
        //locator assertion
        await expect(usingTheGridForm.getByRole('radio', {name:"Option 1"})).toBeChecked()
        await usingTheGridForm.getByRole('radio', {name:"Option 2"}).check({force: true})
        //now we need to assert that previous check is UNchecked -- option 1 is false
        expect(await usingTheGridForm.getByRole('radio', {name:"Option 1"}).isChecked()).toBeFalsy
        expect(await usingTheGridForm.getByRole('radio', {name:"Option 2"}).isChecked()).toBeTruthy
        await expect(usingTheGridForm.getByRole('radio', {name:"Option 2"})).toBeChecked()
    })

    test('Radio buttons 2', async({page}) => {
        const radioButtonOne = page.locator('nb-card', {hasText:"Using the Grid"})
        await radioButtonOne.getByRole('radio', {name:"Option 1"}).check({force:true})
        expect(await radioButtonOne.getByRole('radio', {name:"Option 1"}).isChecked()).toBeTruthy()
        await expect(radioButtonOne.getByRole('radio', {name:"Option 1"})).toBeChecked()
    })
})

test.describe('Checkboxes learn', () => {
    test.beforeEach(async({page}) => {
        await page.getByText('Modal & Overlays').click()
        await page.getByText('Toastr').click()
    })

    test('checkboxes click', async({page}) => {
        //recommend way to click on checkbox - GETBYROLE
        //we can use .check to check the status of checkbox if it NOT, if it is non will happen
        //to uncheck need to use .uncheck
        await page.getByRole('checkbox', {name:"Hide on click"}).uncheck({force:true})
        await page.getByRole('checkbox', {name:"Prevent arising of duplicate toast"}).check({force:true})
        //if u need to check/oncheck all checkboxes - use JavaScript loop
        const allCheckBoxes = page.getByRole('checkbox')
        for(const box of await allCheckBoxes.all()){
            await box.uncheck({force:true})
            expect(await box.isChecked()).toBeFalsy()
        }
    })

    test('checkbox 2', async({page}) => {
        await page.getByText('Forms').click()
        await page.getByText('Form Layouts').click()
        await page.locator('nb-card', {hasText:"Inline form"}).getByRole('checkbox', {name:"Remember me"}).check({force:true})
        await page.getByRole('checkbox', {name:"Check me out"}).check({force:true})
        await page.locator('nb-card', {hasText:"Horizontal form"}).getByRole('checkbox', {name:"Remember me"}).check({force:true})
        expect(await page.locator('nb-card', {hasText:"Inline form"}).getByRole('checkbox', {name:"Remember me"}).isChecked())
        expect(await page.getByRole('checkbox', {name:"Check me out"}).isChecked())
        expect(await page.locator('nb-card', {hasText:"Horizontal form"}).getByRole('checkbox', {name:"Remember me"}).isChecked())

        const allCheckBoxes = page.getByRole('checkbox')
        for(const box of await allCheckBoxes.all()){
            await box.uncheck({force:true})
            expect(await box.isChecked()).toBeFalsy()
        }
    })
})


test.describe('lists & dropdowns', () => {
    test.beforeEach(async({page}) => {
        page.getByText('IoT Dashboard').click()
    })

    test('lists/dropdownns learn', async({page}) => {
        const dropdownMenu = page.locator('ngx-header nb-select')
        await dropdownMenu.click()
        page.getByRole('list') //when the list has a UL tag
        page.getByRole('listitem') //when the list has LI tag
        //const optionList = page.getByRole('list').locator('nb-option')
        const optionList = page.locator('nb-option-list nb-option')
        await expect(optionList).toHaveText(["Light", "Dark", "Cosmic", "Corporate"])
        await optionList.filter({hasText:"Cosmic"}).click()
        const header = page.locator('nb-layout-header')
        await expect(header).toHaveCSS('background-color', 'rgb(50, 50, 89)')

        const colors = {
            "Light": "rgb(255, 255, 255)",
            "Dark": "rgb(34, 43, 69)",
            "Cosmic": "rgb(50, 50, 89)",
            "Corporate": "rgb(255, 255, 255)"
        }
        await dropdownMenu.click()
        for(const color in colors){
            await optionList.filter({hasText: color}).click()
            await expect(header).toHaveCSS('background-color', colors[color])
            if(color != "Corporate")
                await dropdownMenu.click()
        }
    })

    test('lists/dropdowns 2', async({page}) => {
        const header = page.locator('nb-layout-header')
        const dropdown = page.locator('ngx-header nb-select')
        await dropdown.click()
        const options = page.locator('nb-option-list nb-option')
        await expect(options).toHaveText(["Light", "Dark", "Cosmic", "Corporate"])
        const colors = {
            "Light": "rgb(255, 255, 255)",
            "Dark": "rgb(34, 43, 69)",
            "Cosmic": "rgb(50, 50, 89)",
            "Corporate": "rgb(255, 255, 255)"
        }
        for(const color in colors){
            await options.filter({hasText: color}).click()
            await expect(header).toHaveCSS('background-color', colors[color])
            if(color != "Corporate")
                await dropdown.click()
        }
    })


})

test.describe('Tooltips', () => {
    test.beforeEach(async({page}) => {
        await page.getByText('Modal & Overlays').click()
        await page.getByText('Tooltip').click()
    })

    test('tooltips learn', async({page}) => {
        //to find TOOLTIP element need to PAUSE javaScript
        //TO PAUSE JAVASCRIPT NEED TO OPEN DEVTOOLS - SOURCES
        //THEN NEED TO CLICK COMBINATIONS OF 'COMMAND' + '\'(on mac)
        //IF YOU ARE ON WINDOWS NEED TO CLICK 'F8' to pause
        //GO BACK TO ELEMENTS AND FIND YOUR TOOLTIP
        const tooltipCard = page.locator('nb-card', {hasText:"Tooltip Placements"})
        await tooltipCard.getByRole('button', {name:"Top"}).hover()
        //page.getByRole('tooltip') NEED TO USE THIS - if you have a role tooltip created
        //if needed to GET any text you can use .textContent() to get it
        const tooltip = await page.locator('nb-tooltip').textContent()
        //after you get the text by .textContent() you can expect with .toEqual('')
        expect(tooltip).toEqual('This is a tooltip')
    })

    test('tooltip mine', async({page}) => {
        const thirdMenu = page.locator('nb-card', {hasText:'Colored Tooltips'})
        await thirdMenu.getByRole('button', {name:"PRIMARY"}).hover()
        const primaryHoverText = await page.locator('nb-tooltip').textContent()
        expect(primaryHoverText).toEqual('This is a tooltip')
    })

})


test.describe('Dialog Boxes', () => {
    test.beforeEach(async({page}) => {
        await page.getByText('Tables & Data').click()
        await page.getByText('Smart Table').click()
    })

    test('BROWSER Dialog boxes learn', async({page}) => {
        //need to accept dialog box
        page.on('dialog', dialog => {
            expect(dialog.message()).toEqual('Are you sure you want to delete?')
            dialog.accept()
            //dialog.dismiss()
            //dialog.defaultValue()
            //dialog.message()
            //dialog.page()
            //dialog.type()
        })
        //now make the click to get dialog box
        await page.getByRole('table').locator('tr', {hasText:'mdo@gmail.com'}).locator('.nb-trash').click()
        //now need to assert that this element is deleted with .not.toHaveText('')
        await expect(page.locator('table tr').first()).not.toHaveText('mdo@gmail.com')
    })


    test('Dialog boxes mine', async({page}) => {
        page.on('dialog', dialog => {
            expect(dialog.message()).toEqual('Are you sure you want to delete?')
            dialog.accept()
        })
        await page.getByRole('table').locator('tr', {hasText:"fat@yandex.ru"}).locator('.nb-trash').click()
        //await expect(page.locator('table tr').first()).not.toHaveText('fat@yandex.ru')
        const rows = page.locator('table tr');
        const rowCount = await rows.count();
        for (let i = 0; i < rowCount; i++) {
            await expect(rows.nth(i)).not.toHaveText('fat@yandex.ru');
        }

    })

})


test.describe('Web tabbles', () => {
    test.beforeEach(async({page}) => {
        await page.getByText('Tables & Data').click()
        await page.getByText('Smart Table').click()
    })

    test('Web tables part 1-2 learn', async({page}) => {
        // 1-how to get row by any text in this row
        const targetRow = page.getByRole('row', {name:"twitter@outlook.com"})
        await targetRow.locator('.nb-edit').click()
        //sometimes when you clicking to EDIT needed to create new locator with new params
        await page.locator('input-editor').getByPlaceholder('Age').clear()
        await page.locator('input-editor').getByPlaceholder('Age').fill('27')
        await page.locator('.nb-checkmark').click()
        // 2-get the row based on the value in the specific column
        await page.locator('.ng2-smart-pagination-nav').getByText('2').click()
        const targetRowById = page.getByRole('row', {name:"11"}).filter({has: page.locator('td').nth(1).getByText('11')})
        await targetRowById.locator('.nb-edit').click()
        await page.locator('input-editor').getByPlaceholder('E-mail').clear()
        await page.locator('input-editor').getByPlaceholder('E-mail').fill('lekakz007@gmail.com')
        await page.locator('.nb-checkmark').click()
        await expect(targetRowById.locator('td').nth(5)).toHaveText('lekakz007@gmail.com')
        // 3-test filter of the table
        const ages = ["20", "30", "40", "200"]
        for( let age of ages){
            await page.locator('input-filter').getByPlaceholder('Age').clear()
            await page.locator('input-filter').getByPlaceholder('Age').fill(age)
            await page.waitForTimeout(500)
            const ageRows = page.locator('tbody tr')
            for(let row of await ageRows.all()){
                const cellValue = await row.locator('td').last().textContent()
                if(age == "200"){
                    expect(await page.getByRole('table').textContent()).toContain('No data found')
                } else {
                    expect(cellValue).toEqual(age)
                }
                
            }
        }
    })

    test('Web tables mine', async({page}) => {
        await page.close()
    })

})

