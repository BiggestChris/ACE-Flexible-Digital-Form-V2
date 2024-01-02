# ACE-Flexible-Digital-Form-V2

Preface: 
A lot of code for this submission was derived from my earlier work expanding out the Leaven Pizza digital menu app, specifically linking it to Firebase for real-time data submission and collection.


Summary:
Currently the ACE Form app functions by taking a webform, and then whenever the user types in a field and makes a change, it updates to a real-time database (no 'upload'/'submit' button is pressed), with the values filled in and a timestamp to identify the latest submission (with the operator/database user filtering on this to pull out latest data). This ensures that the end-user is aware of what is currently loaded into the database at any point, so they can amend if they notice a submission mistake, or circumstances change (so the Form actually functions closer to a shared document in many respects).

The database has a new object created for each submission, this was intentional to preserve the trail of data submitted and preventing mutating an existing object over again and risking issues that way. Currently, it would be up to the operator/database user to then take information from the database and filter/interrogate.

In practice, it would be expected that a more secure communication channel and database would be needed given the military applications, but the ACE Form app should function as an MVP.

The webform itself functions on a desktop and a mobile, and has been specifically optimised for mobile use.

The backend.html is a page that can be utilised to add/remove fields as necessary to the webform that appears on index.html. The javascript in index.js can handle brand new fields being added and loaded into the Firebase database. The fields can have their type specified as an 'input' block (with a more limited character field) or 'text area' (with a significantly bigger field).

For this version, all fields take data as a string (text) intentionally to keep a consistent format as fields change. It is assumed as well that the operator/database user will be able to set up functions/apps to parse the data at a database level if needed, but the string format would mirror the free-form entry on a paper form anyway.


How to add front-end form to mobile as an app:

    Android:
        1. Go to deployed website in Chrome browser (pre-deployed at https://ace-digital-flexible-form-v2.netlify.app/)
        2. Press three dots in top right-hand-side of screen to open up menu
        3. Click 'Add to Home screen'
        4. Click 'Add' (you can change the name of the app if you desire, will be "ACE Form" by default)
        5. The front-end form can now be reached from an app button on your mobile phone

    iPhone:
        1. Go to deployed website in Safari browser (pre-deployed at https://ace-digital-flexible-form-v2.netlify.app/)
        2. Press centre button in navbar at the bottom of the page (looks like arrow going into a box)
        3. Click 'Add to Home screen'
        4. Click 'Add' (you can change the name of the app if you desire, will be "ACE Form" by default)
        5. The front-end form can now be reached from an app button on your mobile phone