import puppeteer from "puppeteer"
;(async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  await page.goto("https://instagram.com", { waitUntil: "networkidle2" })

  try {
    await page.waitForSelector(".piu")
  } catch (e) {
    if (e instanceof puppeteer.errors.TimeoutError) {
      console.log(e)
    }
  }

  console.log("ki")
  await browser.close()
})()
