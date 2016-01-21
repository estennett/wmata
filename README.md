#Washington DC Metro Information

##Overview

This app displays a geographically accurate map of the Washington DC metro using data from the WMATA API in D3.js.  When each station is clicked, live train info for each station is displayed in a pop up dialog box.

##Technologies

This was the final project of four projects in my Web Development Immersive course at General Assembly.

I used Express.js to handle my endpoints that served data from my non-relational Mongo database.  I used Mongoose as my ORM of choice.

On the front end I set up a simple Angular.js app that populated the D3.js code with data from my backend endpoints.  The D3 map was challenging in the sense that I had to parse through several WMATA API calls on the back end, and create a whole new set of data that was usable in my D3 app.  Each line is its own SVG element as is each station.

I used NgDialog to help with the pop up dialog box when each station is clicked.

##Future Plans

-Appropriately style the app, preferably using SASS.
-Persist station train arrival time in the backend database so that the data can be compared with an ideal train schedule, allowing for statistical representation of train schedule discrepancies.

##Bugs

The terminal stations on each line do not display train predictions correctly.

The rail predictions are not complete for the following stations: Metro Center, Gallery Place, and L'Enfant Plaza.

##Deployment

The app is not publicly deployed yet, however it is working fine.  Just create an ENV for the Express app portion.  Inside the ENV file add an api_key variable with a working WMATA API key and it will work on your local machine as well.  

##Please submit a PR for any issues that arise when using the app.
