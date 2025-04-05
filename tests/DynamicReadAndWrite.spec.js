import { test, expect } from '@playwright/test';
const Exceljswork =  require('exceljs');
async function WriteExcel(searchText,ReplaceText, filePath)
{
   
const workBook = new Exceljswork.Workbook();
await workBook.xlsx.readFile(filePath);

const worksheet = workBook.getWorksheet('Sheet1');

const output = await ReadExcel(worksheet, searchText);

    const cell = worksheet.getCell(output.rowno, output.colno);
    cell.value=ReplaceText;
    await workBook.xlsx.writeFile(filePath);

}


async function ReadExcel(worksheet,searchText)
{
    let output = {rowno:-1, colno:-1};
    worksheet.eachRow((row, rowNumber)=>
        {
            row.eachCell((cell, colNumber)=>
                {
                    if(cell.value===searchText)
                    {
                        output.rowno = rowNumber;
                        output.colno = colNumber+2;
                    }
                })
        
        })
        return output;
}

//WriteExcel('Banana', 'WriteText',"C:/Users/csai1/Downloads/excelDownloadTest.xlsx");

test("using Playwright excel",async ({page})=>
{
    let existingText = 'Mango';
    let outputResult = 4000;
await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");
const waitToDownLoad = page.waitForEvent('download');
await page.getByRole("button",({name: 'Download'})).click();
await waitToDownLoad;
await WriteExcel(existingText, outputResult,"C:/Users/csai1/Downloads/download.xlsx");
await page.locator("#fileinput").click();
await page.locator("#fileinput").setInputFiles("C:/Users/csai1/Downloads/download.xlsx");
const givenText = await page.getByText(existingText);

const final = await page.getByRole('row').filter({has: givenText}).locator("#cell-4-undefined").textContent();

await expect(outputResult.toString()).toEqual(final)


})