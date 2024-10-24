const userId2 = localStorage.getItem('userId');
const resultContact = document.querySelector("#contact");
fetch(`http://localhost:80/api/v1/private-messages/chat-partners/${userId2}`)
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Network response was not ok.');
    })
    .then(data => {
        const privates = data.result.chatPartners;
        const group = data.result.joinedRooms;
        console.log("private", privates)
        console.log("group", group)
        // const listContact = document.createElement('div')
        privates.forEach(user => {
            const itemContact = document.createElement('div')
            const img = user.avatar ? user.avatar : "../assets/avatar.jpg";
            itemContact.innerHTML = `
            <div class="flex items-center space-x-3 cursor-pointer hover:bg-slate-300">
          <img id="avatarSearch" src="${img}" alt="Avatar" class="rounded-full w-10 h-10">
          <div>
            <h3 id="userSearch" class="text-sm font-semibold line-clamp-1">${user.username}</h3>
          </div>
        </div>`
        resultContact.appendChild(itemContact)
        });
    }
    )
    .catch(error => console.error('There was a problem with your fetch operation:', error));


