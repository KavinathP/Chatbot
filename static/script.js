function sendMessage() {
    var userInput = document.getElementById("user-input").value;

    // Add user message to chat box
    var chatBox = document.getElementById("chat-box");
    var userMessageDiv = document.createElement("div");
    userMessageDiv.classList.add("message", "sent");
    var userMessageContent = document.createElement("div");
    userMessageContent.classList.add("message-content");
    var userMessageParagraph = document.createElement("p");
    userMessageParagraph.textContent = userInput;
    userMessageContent.appendChild(userMessageParagraph);
    userMessageDiv.appendChild(userMessageContent);
    chatBox.appendChild(userMessageDiv);

    // Clear input field
    document.getElementById("user-input").value = "";

    // Scroll to bottom of chat box
    chatBox.scrollTop = chatBox.scrollHeight;

    // Send user message to server and get bot response
    fetch('/get_response', {
        method: 'POST',
        body: JSON.stringify({user_message: userInput}),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        var botResponse = data.bot_response;
        var botMessageDiv = document.createElement("div");
        botMessageDiv.classList.add("message", "received");
        var botMessageContent = document.createElement("div");
        botMessageContent.classList.add("message-content");
        var botMessageParagraph = document.createElement("p");
        botMessageParagraph.textContent = botResponse;
        botMessageContent.appendChild(botMessageParagraph);
        botMessageDiv.appendChild(botMessageContent);
        chatBox.appendChild(botMessageDiv);
        
        // Scroll to bottom of chat box
        chatBox.scrollTop = chatBox.scrollHeight;
    });
}
