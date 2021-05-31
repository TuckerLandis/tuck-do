# Project Name

Tuck-Do, a to do list for Tucker.

## Description

This is a To-do app, that takes in a description of a task, and a due date, and keeps you aware of the things you presently need to be concerned about. It sorts these tasks by "due today", "upcoming", and "completed". Upon a button press, you can complete a task, and remove a task. Deleting a task will prompt to make sure you want to delete, as it also removes the task from the attached database. I used an interesting but clunky date conversion and comparison method that i would not personally suggest. 

Using the text input box and calendar button, an object is created in the front end, and upon a press of the submit button, a POST ajax request sends the object to the server, where it is parsed and placed in the database. 
Upon page load, a GET request pulls in all the tasks from the database, and performs logic and formatting in seperate fucntions to get them on the page. 
Upon deletion, a DELETE hits the server and removes the task attached to each delete button. 
Upon completion of a task, a PUT is sent to the server, that sets the complete column in the database of the selected task to TRUE, and inserts the present server time to the completedDate column. When the client loops through the response in the GET, this is referenced to display task completion and the completion date on the DOM.

An additional piece of logic I chose to include was in the render function, a "due today" check is ran on the tasks, so you can be alerted of things that you told yourself you would do today, above things that are upcoming. All tasks sorted by due date at the present moment. All functions are labeled and relations are noted. 

Coming soon : sorting ability, increased style-formatting. I also plan to rework the date comparisons as i see a couple holes in how it is performed. I will likely use moment.js to accomplish this, and query strings on the PUT to send the client's date, instead of relying on the server date, as naturally these two could be different.


Additional README details can be found [here](https://github.com/PrimeAcademy/readme-template/blob/master/README.md).
