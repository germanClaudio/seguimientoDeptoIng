function updateTime() {
    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString();
    const timeString = `Fecha: ${date} - Hora: ${time}`;
    document.getElementById("clock").textContent = timeString;
}
setInterval(updateTime, 1000);
