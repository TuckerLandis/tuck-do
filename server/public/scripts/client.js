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
    $('#completed-tasks-table').on('click', '.delete-btn', deleteTask)
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

/**When a complete button is pressed on the dom, sends a PUT to update the task's complete property and sets complete date to 
 * present server time
 */
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
    
    $.ajax({
        method: 'GET',
        url: '/tasks',
    }).then(response => {
        console.log('GET response:', response);
        renderTasks(response)
    })
} 

/** Takes in a parameter of the response of the above GET, and loops over it, appending td with the text, buttons including the id
 * also runs dueCheck and coming soon: completeCheck, for append styling
 * @param  {} tasks
 */
function renderTasks(tasks) {
    console.log(tasks);

    $('#tasks-table').empty();
    $(`#completed-tasks-table`).empty();
    $(`#due-tasks-table`).empty();

    tasks.forEach(task => {
        
        if (dueCheck(task)) {
            dueAppender(task);
            // return ?
        }

       if (completeCheck(task)) {
           completeAppender(task);
       } else if (!dueCheck(task)){
           incompleteAppender(task);
       }
    });
}

/** Runs a due check compared to today, if task is due, set task.due to true
 * @param  {} task
 */
function dueCheck(task) {
    task.dueDate = new Date(task.dueDate);
    

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

/**Called in renderTasks, performs simple true false logic
 * @param  {} task
 */
function completeCheck(task) {
    if (task.complete) {
        return true;
    } else if (!task.complete){
        return false;
    }
}

/**If current task in the tasks loop in renderTasks is incomplete, this is called on that task
 * it appends it to a table near the top of the DOM, and displays the date it is due
 * @param  {} task
 */
function incompleteAppender(task) {
    task.dueDate = new Date(task.dueDate);

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

/**If current task in the tasks loop in renderTasks is complete, this is called on that task
 * it appends it to a seperate table below, and displays the date it was completed
 * @param  {} task
 */
 function completeAppender(task) {
   
    task.completeDate = new Date(task.completeDate);
    
    let options = {
        weekday: 'long',
        month: 'long',
        day: 'numeric'
    };

    let cD = task.completeDate;
    cD = cD.toLocaleString('default', options); // sets date to just day and month, with weekday included

    $('#completed-tasks-table').append(`
    <tr class="complete tdc space">
        <td class="task-text">${task.text}</td>
        <td></td>
        <td></td>
        <td><button class="complete-btn btn btn-success box-shadow" data-id="${task.id}"> ✔️ </button></td>
     </tr>
     
     <tr class="complete-no-strike tdc space">
        <td class="task-date"> Completed: ${cD}</td>
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


/**If current task in the tasks loop in renderTasks is due today, this is called on that task
 * it appends it to the due today table
 * @param  {} task
 */
 function dueAppender(task) {
   
    task.dueDate = new Date(task.dueDate);

    let options = {
        weekday: 'long',
        month: 'long',
        day: 'numeric'
    };
    
    let d = task.dueDate
    d = d.toLocaleString('default', options); // sets date to just day and month, with weekday included

    $('#due-tasks-table').append(`
    <tr class="due tdc space">
        <td class="task-text">${task.text}</td>
        <td></td>
        <td></td>
        <td><button class="complete-btn btn btn-success box-shadow" data-id="${task.id}"> ✔️ </button></td>
     </tr>
     
     <tr class="due tdc space">
        <td class="task-date"> Due Today! ${d}</td>
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