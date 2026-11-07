// --- FAKE TASKBAR CLOCK ---
function updateClock() {
    const clockElement = document.getElementById('clock');
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    clockElement.textContent = `${hours}:${minutes} ${ampm}`;
}
// Update immediately, then every second
updateClock();
setInterval(updateClock, 1000);