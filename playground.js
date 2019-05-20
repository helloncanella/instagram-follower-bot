import puppeteer from "puppeteer"

function wait(ms) {
  return new Promise(resolve => setTimeout(() => resolve(), ms))
}
;(async () => {
  const browser = await puppeteer.launch({ headless: false })
  const page = await browser.newPage()

  await page.setViewport({ width: 960, height: 768 })

  await login(page)

  await page.goto("https://www.instagram.com/vicrocha.fotografia", {
    waitUntil: "networkidle0"
  })

  const follower = ".wo9IH"

  await Promise.all([
    page.waitForSelector(follower),
    page.click("a[href='/vicrocha.fotografia/followers/']")
  ])

  async function like() {
    const followButton = "._0mzm-.sqdOP.L3NKy:not(._8A5w5)"

    const buttons = [...(await page.$$(followButton))]

    const funcs = buttons.map(button => async () => {
      await button.click(followButton, { delay: 100 })
      await wait(500)
    })

    return await promiseSerial(funcs)
  }

  await page.exposeFunction("like", like)
  await page.exposeFunction("wait", like)

  const container = ".isgrP"

  // crypto.createHash('md5').update(text).digest('hex')
  const a = await page.evaluate(async list => {
    const isEndOfList = () => {
      // const { offsetHeight, scrollTop, scrollHeight, clientHeight } = list
      return list.offsetHeight + list.scrollTop === list.scrollHeight
    }

    const scrollDown = () => {
      list.scrollBy(0, list.clientHeight)
    }

    const liking = async () => {
      await window.like()
      scrollDown()
      await window.wait(200)
      await liking()
    }

    await liking()
  }, await page.$(container))
})()

async function login(page) {
  page.once("load", () => console.log("loaded"))

  await page.goto("https://www.instagram.com/helloncanella/followers/", {
    waitUntil: "networkidle0"
  })

  const usernameInput = "input[name='username']"

  await page.waitForSelector(usernameInput)

  const compte = await page.$(usernameInput)
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

const promiseSerial = funcs =>
  funcs.reduce(
    (promise, func) =>
      promise.then(result => func().then(Array.prototype.concat.bind(result))),
    Promise.resolve([])
  )
