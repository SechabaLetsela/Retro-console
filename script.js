const output = document.getElementById('output');
const input = document.getElementById('command-input');
const STORAGE_KEY = 'retro-console-messages';

// Prevent user from typing during the boot sequence
let isBooting = true;
input.disabled = true;

window.onload = async function() {
    // The Animatrix-style boot sequence
    await typeWriter("INITIALIZING SYSTEM KERNEL...", 50);
    await delay(300);
    await typeWriter("MOUNTING VIRTUAL DRIVE [OK]", 30);
    await delay(200);
    await typeWriter("ESTABLISHING SECURE CONNECTION...", 40);
    await delay(400);
    await typeWriter("ACCESS GRANTED.", 60);
    await delay(200);
    await typeWriter("Welcome to Retro-Console v1.0", 30);
    await typeWriter("Type 'help' to see available commands.\n", 20);
    
    isBooting = false;
    input.disabled = false;
    input.focus();
};

// Helper function for delays
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Typewriter effect function
async function typeWriter(text, speed = 30) {
    const line = document.createElement('div');
    output.appendChild(line);
    
    for (let i = 0; i < text.length; i++) {
        line.textContent += text.charAt(i);
        output.scrollTop = output.scrollHeight; // Auto-scroll
        await delay(speed);
    }
}

// Instant print for user commands (so it doesn't feel laggy)
function printLine(text) {
    const line = document.createElement('div');
    line.textContent = text;
    output.appendChild(line);
    output.scrollTop = output.scrollHeight;
}

input.addEventListener('keydown', function(event) {
    if (event.key === 'Enter' && !isBooting) {
        const command = input.value.trim();
        input.value = '';
        
        printLine(`user@retro-console:~$ ${command}`);
        processCommand(command);
    }
});

function processCommand(cmd) {
    const lowerCmd = cmd.toLowerCase();

    if (lowerCmd === 'help') {
        printLine("AVAILABLE COMMANDS:");
        printLine("  help          - Show this message");
        printLine("  clear         - Clear the terminal screen");
        printLine("  post [msg]    - Add a message to the console");
        printLine("  read          - Read all posted messages");
        printLine("  wipe          - Delete all messages permanently");
    } 
    else if (lowerCmd === 'clear') {
        output.innerHTML = '';
    } 
    else if (lowerCmd.startsWith('post ')) {
        const message = cmd.substring(5);
        if (message === '') {
            printLine("ERROR: Message cannot be empty.");
            return;
        }
        const messages = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
        messages.push({ text: message, date: new Date().toLocaleString() });
        localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
        printLine(`[SAVED]: "${message}"`);
    } 
    else if (lowerCmd === 'read') {
        const messages = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
        if (messages.length === 0) {
            printLine("THE CONSOLE IS EMPTY. BE THE FIRST TO POST.");
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
        printLine("ALL MESSAGES HAVE BEEN PERMANENTLY WIPED FROM MEMORY.");
    }
    else if (lowerCmd === '') {
        // Do nothing
    } 
    else {
        printLine(`COMMAND NOT FOUND: ${cmd}. TYPE 'help' FOR OPTIONS.`);
    }
}