import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, onValue, remove, query, orderByChild } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
    databaseURL: "https://raf-ace-default-rtdb.europe-west1.firebasedatabase.app/"
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const databaseInfo = ref(database, "Flight-info");

const numberOfInputs = 4; // Currently set how many inputs here

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

// Function to handle the input event and push data to Firebase
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

// Add event listener to each input field
inputFields.forEach((inputElement) => {
    inputElement.addEventListener('input', handleInputChange);
});

// Timestamp function to calculate time down to milliseconds
function timestamp() {
    // Create a new Date object
    const currentDate = new Date();

    // Get various components of the current date and time
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // Months are zero-based, so add 1
    const day = currentDate.getDate();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const seconds = currentDate.getSeconds();
    const milliseconds = currentDate.getMilliseconds();

    // Display the current date and time
    let time = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}:${milliseconds}`
    return time;
}

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