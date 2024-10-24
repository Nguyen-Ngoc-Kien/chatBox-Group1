const elementSearchInput = document.querySelector(".search-user-input");
const elementSearchBtn = document.querySelector(".search-btn");

elementSearchBtn.addEventListener("click",async()=>{
    const username = elementSearchUser
    const response = await fetch('http://localhost:8080/user/search-by-username', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
    });

    if (!response.ok) {
        throw new Error('Login failed! Please check your credentials.');
    }
})

