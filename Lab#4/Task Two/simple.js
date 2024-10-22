const { Builder, By, Key, until } = require("selenium-webdriver");
const path = require("path");

(async function example() {
  let driver = await new Builder().forBrowser("MicrosoftEdge").build();

  try {
    const filePath = `file://${path.resolve(__dirname, "./webapp/index.html")}`;

    await driver.get(filePath);

    await driver.wait(until.titleIs("The Internet"), 10000);

    await driver.findElement(By.id("username")).sendKeys("tomsmith");
    await driver
      .findElement(By.id("password"))
      .sendKeys("SuperSecretPassword!");

    await driver.findElement(By.css("button[type='submit']")).click();

    await driver.wait(until.elementLocated(By.id("flash")), 5000);

    await driver.wait(until.elementLocated(By.id("flash")), 5000);

    const flashElement = await driver.findElement(By.id("flash"));

    let flashText = await flashElement.getText();

    if (flashText === "Login successful!") {
      console.log("Login was successful!");
    } else {
      console.error(
        "Login failed! Expected 'Login successful!', but got:",
        flashText
      );
    }

    await driver.wait(until.titleIs("Home Page"), 10000);

    await driver.findElement(By.css(".button.secondary.radius")).click();

    await driver.wait(until.titleIs("The Internet"), 10000);

    const loginTitle = await driver.getTitle();
    if (loginTitle === "The Internet") {
      console.log("Logged in successfully");
    } else {
      console.error(
        "Logout failed! Expected title 'The Internet', but got:",
        loginTitle
      );
    }
    await driver.sleep(1000);

    await driver.findElement(By.id("username")).sendKeys("Ali");
    await driver.findElement(By.id("password")).sendKeys("password");

    await driver.findElement(By.css("button[type='submit']")).click();

    await driver.wait(until.elementLocated(By.id("flash")), 5000);

    await driver.wait(until.elementLocated(By.id("flash")), 5000);

    const flashElementLogOut = await driver.findElement(By.id("flash"));

    let flashTextLogOut = await flashElementLogOut.getText();

    if (flashTextLogOut === "Your username or password is incorrect.") {
      console.log("Login failure is successful!");
    } else {
      console.error(
        "Login successfully! Expected 'Login failure is successful!', but got:",
        flashText
      );
    }
  } catch (error) {
    console.error("An error occurred:", error);
  } finally {
    await driver.sleep(1000);
    await driver.quit();
  }
})();
