const email = document.getElementById("email");
const password = document.getElementById("password");
const loginButton = document.getElementById("loginButton");

loginButton.addEventListener("click", async () => {
    const loginData = {
        email: email.value,
        password: password.value
    };

    try {
        const response = await fetch('http://localhost:80/api/v1/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData),
        });

        const data = await response.json();
        console.log('Login successful:', data);
        console.log('status:', data.code);

        if (response.ok) {
            window.location.href = "boxChat.html"; 
            localStorage.setItem('userId', data.result.id);
        } else {
            alert("Email hoặc mật khẩu không đúng!"); 
        }
    } catch (error) {
        console.error('Error:', error);
        alert("Email hoặc mật khẩu không đúng!");
    }
});
