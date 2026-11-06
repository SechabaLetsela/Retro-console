// Get references to our HTML elements
const output = document.getElementById('output');
const input = document.getElementById('command-input');

// The key we'll use to save data in the browser
const STORAGE_KEY = 'retro-console-messages';

// A welcome message when the terminal loads
window.onload = function() {
    printLine("Welcome to Retro-Console v1.0");
    printLine("Type 'help' to see available commands.\n");
    input.focus(); // Keep the cursor ready to type
};

// Listen for the "Enter" key
input.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        const command = input.value.trim(); // Get what the user typed
        input.value = ''; // Clear the input line
        
        // Echo the command back to the screen
        printLine(`user@retro-console:~$ ${command}`);
        
        // Process the command
        processCommand(command);
        
        // Auto-scroll to the bottom
        output.scrollTop = output.scrollHeight;
    }
});

// Function to print text to the terminal
function printLine(text) {
    const line = document.createElement('div');
    line.textContent = text;
    output.appendChild(line);
}

// Function to handle the logic
function processCommand(cmd) {
    const lowerCmd = cmd.toLowerCase();

    if (lowerCmd === 'help') {
        printLine("Available commands:");
        printLine("  help          - Show this message");
        printLine("  clear         - Clear the terminal screen");
        printLine("  post [msg]    - Add a message to the console");
        printLine("  read          - Read all posted messages");
        printLine("  wipe          - Delete all messages permanently");
    } 
    else if (lowerCmd === 'clear') {
        output.innerHTML = ''; // Wipe the visual screen only
    } 
    else if (lowerCmd.startsWith('post ')) {
        const message = cmd.substring(5); // Get everything after "post "
        
        if (message === '') {
            printLine("Error: Message cannot be empty.");
            return;
        }

        // 1. Get existing messages or start a new array
        const messages = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
        
        // 2. Create a new message object with a timestamp
        const newMessage = {
            text: message,
            date: new Date().toLocaleString()
        };
        
        // 3. Save it back to localStorage
        messages.push(newMessage);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
        
        printLine(`[SAVED]: "${message}"`);
    } 
    else if (lowerCmd === 'read') {
        const messages = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
        
        if (messages.length === 0) {
            printLine("The console is empty. Be the first to post!");
        } else {
            printLine(`--- RETRIEVING ${messages.length} MESSAGE(S) ---`);
            messages.forEach(msg => {
                printLine(`[${msg.date}] > ${msg.text}`);
            });
            printLine("--- END OF TRANSMISSION ---");
        }
    }
    else if (lowerCmd === 'wipe') {
        localStorage.removeItem(STORAGE_KEY);
        printLine("All messages have been permanently wiped from memory.");
    }
    else if (lowerCmd === '') {
        // Do nothing for empty enters
    } 
    else {
        printLine(`Command not found: ${cmd}. Type 'help' for options.`);
    }
}