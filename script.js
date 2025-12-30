// Chat UI functionality with auto-reply feature

const chatMessages = document.getElementById('chatMessages');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');

// Predefined responses for the chat bot
const responses = {
    greetings: [
        "Hello! How can I assist you today?",
        "Hi there! What can I help you with?",
        "Hey! Nice to chat with you. How may I help?",
        "Hello! I'm here to help. What do you need?"
    ],
    questions: [
        "That's an interesting question! Let me think about that...",
        "I'd be happy to help with that!",
        "Great question! Here's what I think...",
        "That's something I can help you with!"
    ],
    default: [
        "I understand. Tell me more about that.",
        "That's interesting! Can you elaborate?",
        "I see. How can I help you further?",
        "Got it! What else would you like to know?",
        "Thanks for sharing that. Anything else?",
        "I'm here to help. What would you like to discuss?"
    ]
};

// Keywords for detecting message types
const greetingKeywords = ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening', 'greetings'];
const questionKeywords = ['what', 'how', 'why', 'when', 'where', 'who', 'which', '?'];

// Function to get a random response from an array
function getRandomResponse(array) {
    return array[Math.floor(Math.random() * array.length)];
}

// Function to detect message type and get appropriate response
function getBotResponse(userMessage) {
    const lowerMessage = userMessage.toLowerCase().trim();
    
    // Check for greetings
    if (greetingKeywords.some(keyword => lowerMessage.includes(keyword))) {
        return getRandomResponse(responses.greetings);
    }
    
    // Check for questions
    if (questionKeywords.some(keyword => lowerMessage.includes(keyword)) || lowerMessage.includes('?')) {
        return getRandomResponse(responses.questions);
    }
    
    // Default response
    return getRandomResponse(responses.default);
}

// Function to add a message to the chat
function addMessage(text, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
    
    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.textContent = isUser ? 'You' : 'AI';
    
    const content = document.createElement('div');
    content.className = 'message-content';
    
    const messageText = document.createElement('p');
    messageText.textContent = text;
    
    const time = document.createElement('span');
    time.className = 'message-time';
    const now = new Date();
    time.textContent = now.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
    });
    
    content.appendChild(messageText);
    content.appendChild(time);
    
    messageDiv.appendChild(avatar);
    messageDiv.appendChild(content);
    
    chatMessages.appendChild(messageDiv);
    scrollToBottom();
}

// Function to show typing indicator
function showTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot-message typing-indicator';
    typingDiv.id = 'typingIndicator';
    
    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.textContent = 'AI';
    
    const dots = document.createElement('div');
    dots.className = 'message-content';
    dots.innerHTML = '<span></span><span></span><span></span>';
    
    typingDiv.appendChild(avatar);
    typingDiv.appendChild(dots);
    
    chatMessages.appendChild(typingDiv);
    scrollToBottom();
}

// Function to remove typing indicator
function removeTypingIndicator() {
    const indicator = document.getElementById('typingIndicator');
    if (indicator) {
        indicator.remove();
    }
}

// Function to scroll to bottom of chat
function scrollToBottom() {
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Function to send a message
function sendMessage() {
    const message = messageInput.value.trim();
    
    if (!message) {
        return;
    }
    
    // Add user message
    addMessage(message, true);
    messageInput.value = '';
    sendButton.disabled = true;
    
    // Show typing indicator
    showTypingIndicator();
    
    // Simulate bot thinking time (1-2 seconds)
    const thinkingTime = Math.random() * 1000 + 1000;
    
    setTimeout(() => {
        removeTypingIndicator();
        const botResponse = getBotResponse(message);
        addMessage(botResponse, false);
        sendButton.disabled = false;
        messageInput.focus();
    }, thinkingTime);
}

// Event listeners
sendButton.addEventListener('click', sendMessage);

messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});

messageInput.addEventListener('input', () => {
    sendButton.disabled = !messageInput.value.trim();
});

// Focus input on load
messageInput.focus();

// Initialize send button state
sendButton.disabled = true;

