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

/**Takes the return of createTaskObject and sends it to the server via an ajax POST, then empties the input
 */
function addTask () {
    
    newTask = createTaskObject();
     console.log('created new task!', newTask);
     
    $.ajax({
        method: 'POST',
        url: '/tasks',
        data: newTask
    }).then(response => {
        $('#text-in').val('');
        $('#datepicker').val('');   
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
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                method: 'DELETE',
                url: '/tasks',
                data: {id: taskID}
            }).then(response => {
                refreshTasks();
            })

        }
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
    
    let setClass ='';
   
    $('#tasks-table').empty();
    tasks.forEach(task => {

     

    console.log('tdd', task.dueDate);
    

    
    let d = new Date(task.dueDate);
   

    let today = new Date();
    today = today.setHours(00, 00, 00, 00);
     today = new Date(today);
   

    console.log(d);
    
    console.log(today);

    if (d < today) {
        console.log('its due today!');
        setClass = "due-today"
        
    } else {
        console.log('got some time');
        
    }
    
    
    if(task.complete){
        setClass = "complete"
    } else {
        setClass = "incomplete"
    }
    
    

    let options = { weekday: 'long', month: 'long', day: 'numeric' };
    d = d.toLocaleString('default', options );

    
 

        $('#tasks-table').append(`
            <tr class="${setClass} space">
                    <td>${task.text}</td>
                    <td>${d}</td>
                    <td><button class="complete-btn btn btn-success" data-id="${task.id}"> ✔️ </button></td>
                    <td><button class="delete-btn btn btn-danger" data-id="${task.id}"> ❌ </button></td>
             </tr>
        `)

       

    });
}



