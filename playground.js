import puppeteer from "puppeteer"
;(async () => {
  const browser = await puppeteer.launch({ headless: false })
  const page = await browser.newPage()

  page.once("load", () => console.log("hello"))
  await page.goto("https://www.instagram.com/helloncanella/followers/", {
    waitUntil: "networkidle0"
  })

  const compte = await page.$("input[name='username']")
  await compte.type("helloncanella@gmail.com", { delay: 30 })

  const password = await page.$("input[name='password']")
  await password.type("amadeus1", { delay: 30 })
  ;(await page.$("button[type='submit']")).click()

  // page.once("load", async () =>

  const wait = time => new Promise(resolve => setTimeout(resolve, time))

  page.once("domcontentloaded", async () => {
    const o = await page.$(".aOOlW.HoLwm")
    o && o.click()
  })

  // ;().click()

  // wait(500)

  // // await input.screenshot({ path: "piu.png" })
  // console.log("hllo")
  // // const oi = await page.content()

  // // console.log(oi)

  // // const o = await page.$$eval("div", as => as.map(a => a.textContent))

  // // console.log({ o })

  // console.log("ki")
  // await browser.close()
})()
