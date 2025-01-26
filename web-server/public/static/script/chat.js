document.getElementById("send-button").addEventListener("click", async () => {
    const userInput = document.getElementById("user-input");
    const chatMessages = document.getElementById("chat-messages");
    const userMessage = userInput.value.trim();

    if (!userMessage) {
        alert("Please type a message!");
        return;
    }

    const userMsgElement = document.createElement("div");
    userMsgElement.className = "message user-message";
    userMsgElement.textContent = userMessage;
    chatMessages.appendChild(userMsgElement);

    chatMessages.scrollTop = chatMessages.scrollHeight;

    userInput.value = "";

    const loadingMessageElement = document.createElement("div");
    loadingMessageElement.className = "message bot-message";
    loadingMessageElement.textContent = "Bot is typing...";
    chatMessages.appendChild(loadingMessageElement);
    console.log("Bot is typing...");

    try {
        const response = await fetch("/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: userMessage }),
        });

        const data = await response.json();

        chatMessages.removeChild(loadingMessageElement);

        if (data.response) {
            const botMsgElement = document.createElement("div");
            botMsgElement.className = "message bot-message";
            botMsgElement.textContent = data.response;
            chatMessages.appendChild(botMsgElement);

            chatMessages.scrollTop = chatMessages.scrollHeight;
        } else {
            alert("Error: " + data.error);
        }
    } catch (error) {
        chatMessages.removeChild(loadingMessageElement);
        alert("An error occurred: " + error);
    }
});
