const header = document.getElementById("header")

const back = document.getElementById("back")

const userId = localStorage.getItem('userId');

const updateInfoButton = document.getElementById("updateInfoButton")
const changePasswordButton = document.getElementById("changePasswordButton")
const title = document.getElementById("title")
const updateInfoArea = document.getElementById("updateInfoArea")
const updatePasswordArea = document.getElementById("updatePasswordArea")

const avatarImg = document.getElementById("avatar");
const avatarUpload = document.getElementById("avatarUpload");

updatePasswordArea.style.display = "none"

back.addEventListener("click", function() {
    window.location.href = "boxChat.html"
    console.log("click roi")
})

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

async function getUserInfo() {
    try {
        const response = await fetch(`http://localhost:80/api/v1/users/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error("Failed to fetch user data.");
        }

        const userInfo = await response.json();
        console.log('User info:', userInfo);

        document.getElementById("fname").value = userInfo.result.username;
        document.getElementById("email").value = userInfo.result.email;

        avatarImg.src = userInfo.result.avatar ? userInfo.result.avatar : "../assets/avatar.jpg";
    } catch (error) {
        console.error('Error fetching user info:', error);
        alert("Failed to load user information.");
    }
}

getUserInfo();

async function updateUserInfo(updatedData) {
    try {
        const response = await fetch(`http://localhost:80/api/v1/users/${userId}`, {
            method: 'PUT',  
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData)
        });

        if (!response.ok) {
            throw new Error("Failed to update user data.");
        }

        const result = await response.json();
        alert("User info updated successfully!");

    } catch (error) {
        console.error('Error updating user info:', error);
        alert("Failed to update user information.");
    }
}

avatarUpload.addEventListener("change", function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            avatarImg.src = e.target.result;
            uploadedAvatarData = e.target.result; 
        };
        reader.readAsDataURL(file);
    }
});

document.getElementById("updateInfoSubmit").addEventListener("click", function() {
    console.log("Submitting user info update");
    
    const updatedData = {
        username: document.getElementById("fname").value,
        email: document.getElementById("email").value,
        password: "12345678",
        avatar: uploadedAvatarData 
    };

    console.log("Updated Data:", updatedData); 
    updateUserInfo(updatedData);
});