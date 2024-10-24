const email = document.getElementById("email");
const password = document.getElementById("password");
const loginButton = document.getElementById("loginButton");

loginButton.addEventListener("click", async (event) => {
    event.preventDefault();
    const loginData = {
        email: email.value,
        password: password.value
    };

    try {
        const response = await fetch('http://localhost:8080/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData),
        });

        if (!response.ok) {
            throw new Error('Login failed! Please check your credentials.');
        }

        const data = await response.json();
        console.log('Login successful:', data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
        if (data) {
            console.log("đã đăng nhập dc")
            window.location.href = "boxChat.html"; 
        } else {
            alert("Email hoặc mật khẩu không đúng!"); 
        }
    } catch (error) {
        console.error('Error:', error);
        alert("Email hoặc mật khẩu không đúng!");
    }
});
