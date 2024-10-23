const email = document.getElementById("email");
const password = document.getElementById("password");
const loginButton = document.getElementById("loginButton");

loginButton.addEventListener("click", async () => {
    const loginData = {
        email: email.value,
        password: password.value
    };

    try {
        const response = await fetch('http://192.168.1.190/api/v1/users/login', {
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
        console.log('Login successful:', data);

        if (data.code === "200") {
            window.location.href = "boxChat.html"; 
        } else if (data.code === "500") {
            alert("Email hoặc mật khẩu không đúng!"); 
        }
    } catch (error) {
        console.error('Error:', error);
        alert("Email hoặc mật khẩu không đúng!");
    }
});
