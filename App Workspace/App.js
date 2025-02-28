function updateCalendar(useHijri = false) {
    let now = new Date();
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    if (!useHijri) {
        // Gregorian Calendar
        document.querySelector(".month").textContent = months[now.getMonth()];
        document.querySelector(".weekdays").textContent = days[now.getDay()];
        document.querySelector(".day").textContent = now.getDate();
        document.querySelector(".year").textContent = now.getFullYear();
    } else {
        // Hijri Calendar Conversion
        fetch(`https://api.aladhan.com/v1/gToH?date=${now.getDate()}-${now.getMonth() + 1}-${now.getFullYear()}`)
            .then(response => response.json())
            .then(data => {
                let hijriDate = data.data.hijri;
                document.querySelector(".month").textContent = hijriDate.month.en; // Hijri Month
                document.querySelector(".weekdays").textContent = hijriDate.weekday.en; // Hijri Weekday
                document.querySelector(".day").textContent = hijriDate.day; // Hijri Day
                document.querySelector(".year").textContent = hijriDate.year; // Hijri Year
            })
            .catch(error => console.error("Error fetching Hijri date:", error));
    }
}

function updateClock() {
    let now = new Date();
    let hours = now.getHours().toString().padStart(2, '0');
    let minutes = now.getMinutes().toString().padStart(2, '0');
    let seconds = now.getSeconds().toString().padStart(2, '0');

    document.querySelector(".clock p").textContent = `${hours}:${minutes}:${seconds}`;
}

// Toggle between Hijri and Gregorian
let isHijri = false;
document.getElementById("toggleCalendar").addEventListener("click", function () {
    isHijri = !isHijri;
    updateCalendar(isHijri);
    this.textContent = isHijri ? "Switch to Gregorian" : "Switch to Hijri";
});

// Run functions
updateCalendar();
setInterval(updateClock, 1000); // Update clock every second
updateClock(); // Run clock immediately 
// clock toggle

// service worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js')
    .then(() => console.log("Service Worker Registered"));
}





