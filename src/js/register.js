document.getElementById("register-form").addEventListener('submit', async function (event) {
    event.preventDefault();
    console.log('User registered');

    const name = document.getElementById('name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;


    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (name === "") {
        alert("Full Name is required.");
        return;
    }

    if (!emailRegex.test(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    if (password.length < 8) {
        alert("Password must be at least 8 characters long.");
        return;
    }

    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

    try {
        const response = await fetch('http://localhost:80/api/v1/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: name,
                email: email,
                password: password
            }),
        });

        const data = await response.json();

        if (response.ok) {
            alert("Registration successful!");
            console.log('User registered:', data);
        } else {
            alert(`Error: ${data.message}`);
        }

    } catch (error) {
        console.error('Error:', error);
        alert("Failed to register.");
    }
});