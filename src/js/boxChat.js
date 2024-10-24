const userId = localStorage.getItem('userId');
const avatarImg = document.getElementById("avatar");
const avatarSearch = document.getElementById("avatarSearch");
let intervalId; 
let selectedUser = null; 

// Lấy thông tin người dùng đăng nhập
(async function getUserInfo() {
    try {
        const response = await fetch(`http://192.168.1.212:80/api/v1/users/${userId}`, {
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
        document.getElementById("fname").innerText = userInfo.result.username;

        avatarImg.src = userInfo.result.avatar ? userInfo.result.avatar : "../assets/avatar.jpg";
    } catch (error) {
        console.error('Error fetching user info:', error);
        alert("Failed to load user information.");
    }
})()

const searchInput = document.getElementById('search-input');
const resultsContainer = document.getElementById('searchUser');

searchInput.addEventListener('input', function () {
    const query = searchInput.value;

    if (query.length > 0) {
        fetch(`http://192.168.1.212:80/api/v1/users/search?username=${query}`)
            .then(response => response.json())
            .then(data => {
                displayResults(data.result);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    } else {
        resultsContainer.innerHTML = '';
    }
});

const userChatting = document.getElementById("userChatting");
const avatarUserChatting = document.getElementById("avatarUserChatting");
let currentPage = 1;
const chatMessages = document.getElementById("chatMessages");

function displayResults(users) {
    resultsContainer.innerHTML = '';

    if (users.length > 0) {
        users.forEach(user => {
            const userElement = document.createElement('div');
            const img = user.avatar ? user.avatar : "../assets/avatar.jpg";
            userElement.innerHTML =
                `<div class="flex items-center space-x-3 cursor-pointer hover:bg-slate-300">
                    <img id="avatarSearch" src="${img}" alt="Avatar" class="rounded-full w-10 h-10">
                    <div>
                         <h3 id="userSearch" class="text-sm font-semibold line-clamp-1">${user.username}</h3>
                    </div>
                </div>`;
            resultsContainer.appendChild(userElement);

            userElement.addEventListener("click", () => {
                selectedUser = user; 

                if (intervalId) {
                    clearInterval(intervalId);
                }

                chatMessages.innerHTML = '';

                intervalId = setInterval(() => {
                    renderListMessage(userId, selectedUser, currentPage);
                }, 1000);
            });
        });
    } else {
        resultsContainer.innerHTML = '<p>No results found</p>';
    }
}

const renderListMessage = (userId, user, currentPage) => {
    console.log("id th kia", user.id);

    fetch(`http://192.168.1.212:80/api/v1/private-messages/between/${userId}/${user.id}?pageNo=${currentPage}`)
        .then(response => response.json())
        .then(data => {
            chatMessages.innerHTML = "";

            avatarUserChatting.src = user.avatar ? user.avatar : "../assets/avatar.jpg";
            const resultData = data.result.items;
            resultData.forEach(item => {
                const leftMessage = `
                    <div class="flex">
                        <div class="flex-shrink-0">
                            <img src="${avatarUserChatting.src}" alt="Avatar" class="rounded-full w-10 h-10">
                        </div>
                        <div class="ml-3 bg-gray-200 p-3 rounded-lg text-sm text-gray-700">
                            ${item.message}
                        </div>
                    </div>
                `;
                const rightMessage = `
                    <div class="flex justify-end">
                        <div class="bg-blue-500 text-white p-3 rounded-lg text-sm max-w-md">
                        ${item.message}
                        </div>
                    </div>
                `;

                const itemNodeLeft = document.createElement("div");
                itemNodeLeft.innerHTML = leftMessage;
                const itemNodeRight = document.createElement("div");
                itemNodeRight.innerHTML = rightMessage;

                if (userId == item.senderId) {
                    chatMessages.appendChild(itemNodeRight);
                } else {
                    chatMessages.appendChild(itemNodeLeft);
                }
            }); 
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });

    userChatting.innerText = user.username;
}

document.querySelector("form").addEventListener("submit", function (e) {
    e.preventDefault();

    if (!selectedUser) {
        alert("Please select a user to send a message to.");
        return;
    }

    const messageInput = document.getElementById("message-input");
    const message = messageInput.value;

    fetch(`http://192.168.1.212:80/api/v1/private-messages`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            message: message,
            messageType: "TEXT",
            attachment: null,
            senderId: userId,
            receiverId: selectedUser.id 
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log("Message sent to: ", data.result);
        messageInput.value = ""; 
    })
    .catch(error => {
        console.error('Error sending message:', error);
    });
});
