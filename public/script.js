document.addEventListener("DOMContentLoaded", () => {
    const messageInput = document.getElementById("messageInput");
    const sendButton = document.getElementById("send-button");
    const chatBox = document.getElementById("chat-box");
    const socket = io.connect("http://localhost:3000");

    socket.on("connect", () => {
        console.log("Connected to server");
        // Esegui azioni quando il client si connette al server
    });

    messageInput.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            const message = messageInput.value;
            if (message.trim() === "") return;

            socket.emit("chatMessage", message);
            messageInput.value = "";
        }
    });

    socket.on("chatMessage", function(message) {
        const messageElement = document.createElement("div");
        messageElement.className = "message";
        messageElement.textContent = message;

        chatBox.appendChild(messageElement);
        chatBox.scrollTop = chatBox.scrollHeight;
    });
});
