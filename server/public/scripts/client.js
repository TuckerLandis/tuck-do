console.log('JS');


$( document ).ready( function(){
    console.log('JQ');
    clickListeners();
    refreshTasks();
});

function clickListeners () {
    $('#submit-btn').on('click', addTask);
}

/**This function takes the task object created in createTaskObject and sends it to the server via an ajax POST, then empties the input
 */
function addTask () {
    console.log('adding task');
    newTask = createTaskObject();
    console.log(newTask);
    
    $.ajax({
        method: 'POST',
        url: '/tasks',
        data: newTask
    }).then(response => {
        $('text-in').val('');
        refreshTasks();
    })
} // end addTask

/**This function creates a new object for a task, and sets it's .text to the input with id 'text-in', then returns that object
 */
function createTaskObject() {
    created = {
        text: $('#text-in').val()
    }
    return created;
}


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

function renderTasks(tasks) {
    console.log(tasks);
    $('#tasks-table').empty();
    tasks.forEach(task => {
       
        $('#tasks-table').append(`
            <tr>
                    <td>${task.text}</td>
                    <td><button class="complete-button"> ✔️ </button></td>
             </tr>
        `)
    });
}