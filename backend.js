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

// Pull out the list of fields currently in the database

const sortedQuery = query(fieldInfo, orderByChild('order'));
const currentFields = document.getElementById("current-fields");

onValue(fieldInfo, function(snapshot) {
    
    let itemsArray = Object.entries(snapshot.val());
    itemsArray.sort(compareByOrder);
    
    
    currentFields.innerHTML = ""
    
    function compareByOrder(a, b) {
        return a[1].order - b[1].order;
    }
    
    /* let dummyArray = [];
    
    for (let i = 0; i < itemsArray.length; i++) {
        dummyArray.push(Number(itemsArray[i][1].order));
    } */
    
    for (let i = 0; i < itemsArray.length; i++) {
        let item = itemsArray[i][1]
             
        // Create a wrapper div for field-category and the Remove button
        const wrapperDiv = document.createElement("div");
        wrapperDiv.classList.add("wrapper-div");

        // Append field-category to the wrapper div
        const fieldCategoryDiv = document.createElement("div");
        fieldCategoryDiv.classList.add("field-category");
        fieldCategoryDiv.innerHTML = 
        `
        <div class="sub-field"><p class="sub-field-descriptor">field:</p><p class="current-item-identifier">${i}</p></div>
        <div class="sub-field"><p class="sub-field-descriptor">field-key:</p><p class="current-item-identifier">${itemsArray[i][0]}</p></div>
        <div class="indent">
            <div  class="sub-field"><p class="sub-field-descriptor">order #:</p><p class="current-item">${item.order}</p></div>
            <div  class="sub-field"><p class="sub-field-descriptor">name:</p><p class="current-item">${item.field}</p></div>
            <div  class="sub-field"><p class="sub-field-descriptor">price:</p><p class="current-item">${item.type}</p></div>
        </div>
        `
        wrapperDiv.appendChild(fieldCategoryDiv);
        
        // Create and append the Remove button to the wrapper div
        const removeButton = document.createElement("button");
        removeButton.textContent = "remove";
        removeButton.classList.add("remove-btn");
        wrapperDiv.appendChild(removeButton);
        
        // Append the wrapper div to the currentFields div
        currentFields.appendChild(wrapperDiv);
        
        removeButton.addEventListener("click", function() {
            let exactLocationOfItemInDB = ref(database, `Field-info/${itemsArray[i][0]}`)
            
            remove(exactLocationOfItemInDB);
        })
    }
})