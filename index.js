import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, onValue, remove, query, orderByChild } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
    databaseURL: "https://raf-ace-default-rtdb.europe-west1.firebasedatabase.app/"
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const databaseInfo = ref(database, "Flight-info");

const numberOfInputs = 4; // Currently set how many inputs here
const delayTimer = 2000; // Milliseconds to delay download of database info after change

let fieldsAndInputs = [];
for (let i = 0; i < numberOfInputs; i++)
{
    fieldsAndInputs[i] = {};
    fieldsAndInputs[i].field = document.getElementById(`field-${i+1}`);
    fieldsAndInputs[i].input = document.getElementById(`input-${i+1}`);
}

// Upload to firebase whenever an input is changed (no button press needed)
// This creates a new object in FireBase whenever data is updated, assume timestamp would be used to sort as it stands

// Put inputElements into an array for current Event Listener function further below
let inputFields = [];
for (let i = 0; i < fieldsAndInputs.length; i++)
{
    inputFields[i] = fieldsAndInputs[i].input;
}

let downloadTimeout;

// Function for the initial data download
function initialDataDownload() {
    // Your logic to pull data from the database

    // Function to pull info from Database, specifically the object data from the most recent timestamp
    onValue(databaseInfo, function(snapshot) {
        let itemsArray = Object.entries(snapshot.val());

        // Sort the array based on the 'timestamp' property (as strings)
        itemsArray.sort((a, b) => {
            const timestampA = a[1].timestamp || ''; // Use an empty string if timestamp is undefined
            const timestampB = b[1].timestamp || ''; // Use an empty string if timestamp is undefined
        
            // Using localeCompare for lexicographical comparison
            return timestampA.localeCompare(timestampB);
        });

        // Reverse the array to have the latest timestamp at index 0
        itemsArray.reverse();
        
        // Pull out the first object in the array (as first contains object title), as that will be the latest timestamp
        let item = itemsArray[0][1];

        // Need to add a check that the field is present
        for (let i = 0; i < fieldsAndInputs.length; i++) {
            let fieldIdentifier = fieldsAndInputs[i].field.textContent;
            fieldsAndInputs[i].input.value = 1;
            if (item[fieldIdentifier]) {
                fieldsAndInputs[i].input.value = item[fieldIdentifier];
            }
        }
    });
}

// Function for the delayed data download after an input change
function delayedDataDownload() {
    clearTimeout(downloadTimeout); // Clear any existing timeout

    downloadTimeout = setTimeout(() => {
        initialDataDownload(); // Call the function to fetch data after a delay
    }, delayTimer); // Adjust the delay time (in milliseconds) as needed
}

// Function to handle the input event and push data to Firebase with no delay
function handleInputChange() {

    let fieldValues = [];
    let inputValues = [];

    for (let i = 0; i < fieldsAndInputs.length; i++)
    {
        fieldValues[i] = fieldsAndInputs[i].field.textContent;
        inputValues[i] = fieldsAndInputs[i].input.value;
    }
    
    let databaseObject = {};

    for (let i = 0; i < fieldsAndInputs.length; i++)
    {
        databaseObject[fieldValues[i]] = inputValues[i];
    }
    databaseObject.timestamp = timestamp(); // Adds in a timestamp to the database entry for future data sorting of entries

    push(databaseInfo, databaseObject);
    
}

// Function to clear the delayed download timeout
function clearDownloadTimeout() {
    clearTimeout(downloadTimeout);
}

// Add a single event listener for all input fields to clear the timeout
inputFields.forEach((inputElement) => {
    inputElement.addEventListener('input', clearDownloadTimeout);
});

// Add event listener to each input field for immediate handling
inputFields.forEach((inputElement) => {
    inputElement.addEventListener('change', function () {
        // Handle input changes immediately
        handleInputChange();
    });
});

// Add a single event listener for all input fields for delayed data download
document.addEventListener('change', delayedDataDownload);

// Trigger the initial data download on page load
initialDataDownload();

// Timestamp function to calculate time down to milliseconds
function timestamp() {
    // Create a new Date object
    const currentDate = new Date();

    // Get various components of the current date and time
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so add 1
    const day = String(currentDate.getDate()).padStart(2, '0');
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const seconds = String(currentDate.getSeconds()).padStart(2, '0');
    const milliseconds = String(currentDate.getMilliseconds()).padStart(3, '0'); // Need to ensure a leading zero added to single digit at start

    // Display the current date and time
    let time = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}:${milliseconds}`
    return time;
}

/*
// Put in a manual refresh button, as currently still a bit janky in terms of download/upload - wanted to avoid consistent calls to the database to check
const refreshBtn = document.getElementById("refresh-btn");
refreshBtn.addEventListener("click", initialDataDownload());
*/

// Old button upload below, currently disabled but kept in in case needed

// const uploadBtn = document.getElementById("upload-btn");

/*
uploadBtn.addEventListener("click", function() {
    let field1Value = field1.textContent;
    let input1Value = input1.value;
    let field2Value = field2.textContent;
    let input2Value = input2.value;
    let field3Value = field3.textContent;
    let input3Value = input3.value;
    let field4Value = field4.textContent;
    let input4Value = input4.value;

    // Again, look at array for above and looping to cover all

    let currentTime = timestamp(); // Adds in a timestamp to the database entry for future data sorting of entries
    
    push(databaseInfo, {
        [field1Value]: input1Value,
        [field2Value]: input2Value,
        [field3Value]: input3Value,
        [field4Value]: input4Value,
        timestamp: currentTime
    });

})
*/