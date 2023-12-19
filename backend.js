import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, onValue, remove, query, orderByChild } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
    databaseURL: "https://raf-ace-default-rtdb.europe-west1.firebasedatabase.app/"
};

const app = initializeApp(appSettings);
const database = getDatabase(app);

// Details on database to manage field information for webform itself
const fieldInfo = ref(database, "Field-info");
const uploadBtn = document.getElementById("upload-btn");
const fieldOrder = document.getElementById("field-order");
const fieldName = document.getElementById("field-name");
const fieldType = document.getElementsByName("field-type");

console.log(fieldType);


uploadBtn.addEventListener("click", function() {
    let orderValue = fieldOrder.value;
    let fieldValue = fieldName.value;

    // Iterate through radio buttons to pull value of one selected
    let selectedValue;
    let selectedType;
    for (const selectedFieldType of fieldType) {
        if (selectedFieldType.checked) {
            console.log(selectedFieldType);
            selectedValue = selectedFieldType.value;
            selectedType = selectedFieldType;
            break;
        }
    }

    let typeValue = selectedValue;
    
    push(fieldInfo, {
        order: orderValue,
        field: fieldValue,
        type: typeValue
    });
    
    fieldOrder.value = "";
    fieldName.value = "";
    selectedType.checked = false;

})