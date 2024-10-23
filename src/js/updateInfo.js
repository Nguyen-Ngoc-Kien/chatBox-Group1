const header = document.getElementById("header")

const back = document.getElementById("back")

back.addEventListener("click", function() {
    window.location.href = "boxChat.html"
    console.log("click roi")
})

const updateInfoButton = document.getElementById("updateInfoButton")
const changePasswordButton = document.getElementById("changePasswordButton")
const title = document.getElementById("title")
const updateInfoArea = document.getElementById("updateInfoArea")
const updatePasswordArea = document.getElementById("updatePasswordArea")

updatePasswordArea.style.display = "none"

changePasswordButton.addEventListener("click", function() {
    title.innerText = changePasswordButton.innerText;
    updatePasswordArea.style.display = "block"
    updateInfoArea.style.display = "none"
})

updateInfoButton.addEventListener("click", function() {
    title.innerText = updateInfoButton.innerText;
    updatePasswordArea.style.display = "none"
    updateInfoArea.style.display = "flex"
})

console.log(header)