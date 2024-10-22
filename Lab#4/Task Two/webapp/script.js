document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    if (username === "tomsmith" && password === "SuperSecretPassword!") {
      document.getElementById("flash").innerText = "Login successful!";
      document.getElementById("flash").className = "flash success";
      setTimeout(function () {
        window.location.href = "home.html";
      }, 1000);
    } else {
      document.getElementById("flash").innerText =
        "Your username or password is incorrect.";
      document.getElementById("flash").className = "flash error";
      console.log("invalid credentials");
    }
  });
