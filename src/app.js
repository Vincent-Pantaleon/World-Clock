const dayjs = require('dayjs');
const timezone = require('dayjs/plugin/timezone'); // Import the timezone plugin
const utc = require('dayjs/plugin/utc'); // Import the utc plugin for timezone calculations

dayjs.extend(utc); // Extend dayjs with utc plugin
dayjs.extend(timezone); // Extend dayjs with timezone plugin

// Assuming you have these HTML elements in your document
let zone = document.querySelector(".timezone");
let time = document.querySelector(".time");
let date = document.querySelector(".date");
const openModal = document.querySelector("#edit-button");
const Modal = document.querySelector(".modal");
const timezoneOptions = document.querySelector("#timezone-selection")
const form = document.querySelector("form");
const apply = document.querySelector("#apply");

// Set default timezone and get date
let loc = dayjs.tz.guess();
const currentDate = dayjs().tz(loc);

// Function to update time
function updateTime() {
    const currentTime = dayjs().tz(loc);
    const hour = currentTime.hour();
    let formattedTime = dayjs(currentTime).format('h:mm:ss');

    if (hour > 12) {
        formattedTime += ' PM';
    }
    else {
        formattedTime += ' AM';
    }

    time.textContent = formattedTime;
}

// Display current time and date
const formattedDate = dayjs(currentDate).format('dddd, D MMM, YYYY');
updateDisplay();
date.textContent = formattedDate;

// Update time every second
setInterval(updateTime, 1000);

openModal.addEventListener("click", () => {
    Modal.showModal();
});

//populate modal options
const list =  Intl.supportedValuesOf("timeZone");;

for (const current of list) {
    const item = document.createElement("option");

    item.value = current;
    item.textContent = current.replaceAll("_", " ").replaceAll("-", " ");

    timezoneOptions.appendChild(item);
}

//apply button
form.addEventListener("submit", (e) => {
    e.preventDefault();

    loc = timezoneOptions.options[timezoneOptions.selectedIndex].value;

    changeLoc(loc);
    Modal.close();
});

function updateDisplay() {
    zone.textContent = loc.replaceAll("-", " ").replaceAll("_", " ");
} 

function changeLoc(newLoc) {
    loc = newLoc;

    updateDisplay();
}