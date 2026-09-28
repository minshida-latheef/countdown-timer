// Get HTML elements
const dateInput = document.getElementById("dateInput");

const daysElement = document.getElementById("days");
const hoursElement = document.getElementById("hours");
const minutesElement = document.getElementById("minutes");
const secondsElement = document.getElementById("seconds");

const startBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");

const errorMessage = document.getElementById("errorMessage");
const message = document.getElementById("message");

// Store the timer
let countdownInterval;

// Start Countdown
startBtn.addEventListener("click", function () {

    // Clear previous messages
    errorMessage.textContent = "";
    message.textContent = "";

    // Check if user selected a date
    if (dateInput.value === "") {
        errorMessage.textContent = "Please select a date and time.";
        return;
    }

    // Convert selected date into milliseconds
    const targetDate = new Date(dateInput.value).getTime();

    // Get current time
    const currentTime = new Date().getTime();

    // Check if selected date is in the past
    if (targetDate <= currentTime) {
        errorMessage.textContent = "Please select a future date and time.";
        return;
    }

    // Stop any previous countdown
    clearInterval(countdownInterval);

    // Update timer immediately
    updateCountdown(targetDate);

    // Update timer every second
    countdownInterval = setInterval(function () {
        updateCountdown(targetDate);
    }, 1000);
});


// Countdown calculation
function updateCountdown(targetDate) {

    const currentTime = new Date().getTime();

    // Find remaining time
    const difference = targetDate - currentTime;

    // If countdown reaches zero
    if (difference <= 0) {

        clearInterval(countdownInterval);

        daysElement.textContent = "00";
        hoursElement.textContent = "00";
        minutesElement.textContent = "00";
        secondsElement.textContent = "00";

        message.textContent = "Time's Up!";

        return;
    }

    // Calculate days, hours, minutes and seconds
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));

    const hours = Math.floor(
        (difference / (1000 * 60 * 60)) % 24
    );

    const minutes = Math.floor(
        (difference / (1000 * 60)) % 60
    );

    const seconds = Math.floor(
        (difference / 1000) % 60
    );

    // Display values
    daysElement.textContent = formatTime(days);
    hoursElement.textContent = formatTime(hours);
    minutesElement.textContent = formatTime(minutes);
    secondsElement.textContent = formatTime(seconds);
}


// Add leading zero
function formatTime(time) {
    return time < 10 ? "0" + time : time;
}


// Reset button
resetBtn.addEventListener("click", function () {

    // Stop countdown
    clearInterval(countdownInterval);

    // Clear input
    dateInput.value = "";

    // Reset timer display
    daysElement.textContent = "00";
    hoursElement.textContent = "00";
    minutesElement.textContent = "00";
    secondsElement.textContent = "00";

    // Clear messages
    errorMessage.textContent = "";
    message.textContent = "";
});