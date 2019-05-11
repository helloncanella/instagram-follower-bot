import puppeteer from "puppeteer"
;(async () => {
  const browser = await puppeteer.launch({ headless: false })
  const page = await browser.newPage()

  await login(page)

  await page.goto("https://www.instagram.com/vicrocha.fotografia", {
    waitUntil: "networkidle0"
  })

  const followButton = "._0mzm-.sqdOP.L3NKy:not(._8A5w5)"

  await Promise.all([
    page.waitForSelector(followButton),
    page.click("a[href='/vicrocha.fotografia/followers/']")
  ])

  // await Promise.all(
  //   buttons.map(button => button.click(followButton, { delay: 30 }))
  // )

  const promiseSerial = funcs =>
    funcs.reduce(
      (promise, func) =>
        promise.then(result =>
          func().then(Array.prototype.concat.bind(result))
        ),
      Promise.resolve([])
    )

  const buttons = [...(await page.$$(followButton))]

  // convert each url to a function that returns a promise
  const funcs = buttons.map(button => () =>
    button.click(followButton, { delay: 30 })
  )

  // execute Promises in serial
  promiseSerial(funcs)
    .then(console.log.bind(console))
    .catch(console.error.bind(console))
})()

async function login(page) {
  page.once("load", () => console.log("loaded"))

  await page.goto("https://www.instagram.com/helloncanella/followers/", {
    waitUntil: "networkidle0"
  })

  const compte = await page.$("input[name='username']")
  await compte.type("helloncanella@gmail.com", { delay: 30 })

  const password = await page.$("input[name='password']")
  await password.type("amadeus1", { delay: 30 })
  ;(await page.$("button[type='submit']")).click()

  return new Promise(resolve => {
    page.once("domcontentloaded", async () => {
      const o = await page.$(".aOOlW.HoLwm")
      o && o.click()
      resolve()
    })
  })
}
