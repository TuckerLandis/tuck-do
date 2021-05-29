console.log('JS');

$( document ).ready( function(){
    console.log('JQ');
    clickListeners();
    refreshTasks();
});

function clickListeners () {
    $('#submit-btn').on('click', addTask);
    $('#tasks-table').on('click', '.complete-btn', completeTask);
    $('#tasks-table').on('click', '.delete-btn', deleteTask);
}

/**Takes the task object created in createTaskObject and sends it to the server via an ajax POST, then empties the input
 */
function addTask () {
    
    newTask = createTaskObject();
    
    $.ajax({
        method: 'POST',
        url: '/tasks',
        data: newTask
    }).then(response => {
        $('text-in').val('');
        refreshTasks();
    })
} 

/**Creates a new object for a task, and sets it's .text to the input with id 'text-in', then returns that object
 */
function createTaskObject() {
    created = {
        text: $('#text-in').val()
    }
    return created;
}
/**Deletes a task in the datatable by selecting it's id from the associated html button, included upon render, see below
 */
function deleteTask() {
    console.log('deleteclick');
    console.log($(this).data('id'));
    let taskID = $(this).data('id');

    $.ajax({
        method: 'DELETE',
        url: '/tasks',
        data: {id: taskID}
    }).then(response => {
        refreshTasks();
    })
}

function completeTask(){
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
 * @param  {} tasks
 */
function renderTasks(tasks) {
    console.log(tasks);
    
    let completeClass
   
    $('#tasks-table').empty();
    tasks.forEach(task => {
       //// big genius moment have variable set to if complete for class, only one append

       if(task.complete){
        completeClass = "complete"
    } else {
        completeClass = "incomplete"
    }




        $('#tasks-table').append(`
            <tr class="${completeClass}">
                    <td>${task.text}</td>
                    <td><button class="complete-btn" data-id="${task.id}"> ✔️ </button></td>
                    <td><button class="delete-btn" data-id="${task.id}"> ❌ </button></td>
             </tr>
        `)

       

    });
}

