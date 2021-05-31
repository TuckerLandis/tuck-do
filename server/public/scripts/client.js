console.log('JS');


$(document).ready(function () {
    console.log('JQ');
    clickListeners();
    refreshTasks();
});

function clickListeners() {
    $('#submit-btn').on('click', addTask);
    $('#tasks-table').on('click', '.complete-btn', completeTask);
    $('#tasks-table').on('click', '.delete-btn', deleteTask);
}

/**Takes the return of createTaskObject and sends it to the server via an ajax POST, then empties the input
 * includes form validation from sweet alert
 */
function addTask() {

    newTask = createTaskObject();
    console.log('created new task!', newTask);

    if ($('#text-in').val() == '' ) {
        Swal.fire({
            text: "What do you need to do?",
            timer: 3000
        })
        return;
    }



    if ($('#datepicker').val() == '' ) {
        Swal.fire({
            text: "When do you need to do this?",
            timer: 3000
        })
        return;
    }

    $.ajax({
        method: 'POST',
        url: '/tasks',
        data: newTask
    }).then(response => {
        $('#text-in').val('');
        $('#datepicker').val('🗓');
        refreshTasks();
    })
}


/**Creates a new object for a task, and sets it's .text to the input with id 'text-in', then returns that object
 */
function createTaskObject() {
    created = {
        text: $('#text-in').val(),
        date: $('#datepicker').val()
    }
    return created;
}

/**Deletes a task in the datatable by selecting it's id from the associated html button, included upon render, see below
 */
function deleteTask() {
    console.log('deleteclick');
    console.log($(this).data('id'));
    let taskID = $(this).data('id');

    Swal.fire({
        title: 'Did you really do it?',
        text: "Nice job",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                method: 'DELETE',
                url: '/tasks',
                data: {
                    id: taskID
                }
            }).then(response => {
                refreshTasks();
            })
        }
    })
}


function completeTask() {
    console.log('completeclick');
    let taskID = $(this).data('id');
    $.ajax({
        method: 'PUT',
        url: `/tasks/${taskID}`,
    })

    refreshTasks();

}

/**Performs a simple GET to refresh the tasks, and calls renderTasks
 */
function refreshTasks() {
    console.log('refreshing tasks');

    $.ajax({
        method: 'GET',
        url: '/tasks',
    }).then(response => {
        console.log('GET response:', response);
        renderTasks(response)
    })
} // end refreshTasks




/** Takes in a parameter of the response of the above GET, and loops over it, appending td with the text, buttons including the id
 * also runs dueCheck and coming soon: completeCheck, for append styling
 * @param  {} tasks
 */
function renderTasks(tasks) {
    console.log(tasks);

    $('#tasks-table').empty();
    $(`#completed-tasks-table`).empty();

    tasks.forEach(task => {
        console.log('tdd in ', task.dueDate);


        task.dueDate = new Date(task.dueDate); // changes sql date to JS date, this is weird, moment is likely better, as seen in duecheck function
    
        

       if (completeCheck(task)) {
           completeAppender(task);
       } else {
           incompleteAppender(task);
       }
        

        


       



    });
}

/** Runs a due check compared to today, if task is due, set task.due to true
 * @param  {} task
 */
function dueCheck(task) {
    // let d = new Date(task.dueDate); // sets task's due date value to d

    let today = new Date(); // gets today
    today = today.setHours(00, 00, 00, 00); // sets today to this morning
    today = new Date(today); //parse date again because of weirdness

    console.log('task.dueDate', task.dueDate);
    console.log('today', today);

    if (task.dueDate < today) {
        console.log('its due today!');
        return true;

    } else {
        console.log('got some time');
        return false;
    }

}

function completeCheck(task) {
    if (task.complete) {
        return true;
    } else if (!task.complete){
        return false;
    }
}


function dateCompletedCheck() {

}

function completeAppender(task) {
    let options = {
        weekday: 'long',
        month: 'long',
        day: 'numeric'
    };
    
    let d = task.dueDate
    d = d.toLocaleString('default', options); // sets date to just day and month, with weekday included


    $('#completed-tasks-table').append(`
    <tr class="complete tdc space">
        <td class="task-text">${task.text}</td>
        <td></td>
        <td></td>
        <td><button class="complete-btn btn btn-success box-shadow" data-id="${task.id}"> ✔️ </button></td>
     </tr>
     
     <tr class="complete tdc space">
        <td class="task-date"> Due: ${d}</td>
         <td></td>
         <td></td>
         <td><button class="delete-btn btn btn-danger box-shadow" data-id="${task.id}"> ✖ </button> </td>
     </tr>
    <tr class="data-space">
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    <tr>
`)
}

function incompleteAppender(task) {
    let options = {
        weekday: 'long',
        month: 'long',
        day: 'numeric'
    };
    
    let d = task.dueDate
    d = d.toLocaleString('default', options); // sets date to just day and month, with weekday included


    $('#tasks-table').append(`
    <tr class="incomplete tdc space">
        <td class="task-text">${task.text}</td>
        <td></td>
        <td></td>
        <td><button class="complete-btn btn btn-success box-shadow" data-id="${task.id}"> ✔️ </button></td>
     </tr>
     
     <tr class="incomplete tdc space">
        <td class="task-date"> Due: ${d}</td>
         <td></td>
         <td></td>
         <td><button class="delete-btn btn btn-danger box-shadow" data-id="${task.id}"> ✖ </button> </td>
     </tr>
    <tr class="data-space">
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    <tr>
`)
}