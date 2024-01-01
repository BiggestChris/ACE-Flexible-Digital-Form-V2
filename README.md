# ACE-Flexible-Digital-Form-V2
 
A lot of code for this submission was derived from my earlier work expanding out the Leaven Pizza digital menu app, specifically linking it to Firebase for real-time data submission and collection.

Currently this functions by taking a webform, and then whenever the user types in it, it updates to a real-time database (no 'upload'/'submit' button is pressed), with the values filled in and a timestamp to identify the latest submission.

The webform itself functions on a desktop and a mobile, and has been specifically optimised for mobile use.

The backend.html is a page that can be utilised to add/remove fields as necessary to the webform that appears on index.html. The javascript in index.js can handle brand new fields being added and loaded into the Firebase database.



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