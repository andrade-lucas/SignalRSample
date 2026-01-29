var connectionChat = new signalR.HubConnectionBuilder().withUrl("/hubs/chat").build();

document.getElementById("sendMessage").disabled = true;

connectionChat.on("MessageReceived", (user, message) => {
    var li = document.createElement("li");
    document.getElementById("messagesList").appendChild(li);
    li.textContent = `${user} - ${message}`;
});

document.getElementById("sendMessage").addEventListener("click", (event) => {
    var sender = document.getElementById("senderEmail").value;
    var receiver = document.getElementById("receiverEmail").value;
    var message = document.getElementById("chatMessage").value;

    if (receiver.length > 0) {
        connectionChat.send("SendMessageToReceiver", sender, receiver, message).catch((err) => {
            console.error(err.toString());
        });
    }
    else {
        // send message to all of the users
        connectionChat.send("SendMessageToAll", sender, message).catch((err) => {
            console.error(err.toString());
        });
    }

    document.getElementById("chatMessage").value = "";
    event.preventDefault();
});


connectionChat.start().then(function () {
    document.getElementById("sendMessage").disabled = false;
});


