const output = document.getElementById('output');
const cursor = document.getElementById('cursor');

// --- THE SCRIPTED SCENE ---
window.onload = async function() {
    await delay(2000); 

    await typeWithPauses("Somebody tell me... why... it fells more real... when I dream... than when I am awake. How can I know... if... my sense... are lying?", 70);
    await addBlankLine(); 
    
    await delay(4000); 

    await typeWithPauses("There is some fiction in your truth, and some truth in your fiction. To know the truth, you must risk everything.", 80);
    await addBlankLine(); 
    
    await delay(2000);
    await typeWithPauses("Who... are you? Am I alone?", 65);
    await addBlankLine(); 

    await delay(8000); 

    await typeWithPauses("You... are not alone.", 100);
};

// --- HELPER FUNCTIONS ---

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function typeWithPauses(text, baseSpeed = 70) {
    const line = document.createElement('div');
    output.insertBefore(line, cursor);
    
    const segments = text.split('...');
    
    for (let segIndex = 0; segIndex < segments.length; segIndex++) {
        const segment = segments[segIndex];
        
        for (let i = 0; i < segment.length; i++) {
            const char = segment.charAt(i);
            line.textContent += char;
            
            if (char === '?') {
                await delay(2000); 
            }
            else if (char === '.') {
                await delay(2000); 
            }
            else if (char === ',') {
                await delay(1000); 
            }
            else {
                let variance = Math.random() * 30 - 15;
                let finalSpeed = Math.max(40, baseSpeed + variance);
                await delay(finalSpeed);
            }
            
            output.scrollTop = output.scrollHeight;
        }
        
        if (segIndex < segments.length - 1) {
            await delay(1000); // The invisible ellipsis pause
        }
    }
    
    await delay(300); 
}

function addBlankLine() {
    const blank = document.createElement('div');
    blank.style.height = '22px'; 
    output.insertBefore(blank, cursor);
}

// --- FAKE TASKBAR CLOCK ---
function updateClock() {
    const clockElement = document.getElementById('clock');
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    clockElement.textContent = `${hours}:${minutes} ${ampm}`;
}
updateClock();
setInterval(updateClock, 1000);