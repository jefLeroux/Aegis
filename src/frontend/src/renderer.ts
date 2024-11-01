// src/renderer.ts
function sendMessageToMain() {
    const message = "Hello from renderer!";
    window.api.sendMessage(message); // Using the exposed API from preload
}

function initializeListeners() {
    window.api.onMessage((response: string) => {
        console.log("Received from main process:", response);
        const responseElement = document.createElement('p');
        responseElement.textContent = `Main process says: ${response}`;
        document.body.appendChild(responseElement);
    });
}

function init() {
    const sendButton = document.createElement('button');
    sendButton.textContent = "Send Message to Main Process";
    sendButton.addEventListener('click', () => {
        sendMessageToMain(); // Call the send function on button click
    });
    document.body.appendChild(sendButton);

    initializeListeners(); // Set up listeners for responses
}

document.addEventListener('DOMContentLoaded', init);
