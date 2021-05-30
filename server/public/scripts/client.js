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


function sqlToJsDate(sqlDate){
    //sqlDate in SQL DATETIME format ("yyyy-mm-dd hh:mm:ss.ms")
    let sqlDateArr1 = sqlDate.split("-");
    //format of sqlDateArr1[] = ['yyyy','mm','dd hh:mm:ms']
    let sYear = sqlDateArr1[0];
    let sMonth = (Number(sqlDateArr1[1]) - 1).toString();
    let sqlDateArr2 = sqlDateArr1[2].split(" ");
    //format of sqlDateArr2[] = ['dd', 'hh:mm:ss.ms']
    let sDay = sqlDateArr2[0];
    let sqlDateArr3 = sqlDateArr2[1].split(":");
    //format of sqlDateArr3[] = ['hh','mm','ss.ms']
    let sHour = sqlDateArr3[0];
    let sMinute = sqlDateArr3[1];
    let sqlDateArr4 = sqlDateArr3[2].split(".");
    //format of sqlDateArr4[] = ['ss','ms']
    let sSecond = sqlDateArr4[0];
    let sMillisecond = sqlDateArr4[1];
     
    return new Date(sYear,sMonth,sDay,sHour,sMinute,sSecond,sMillisecond);
}



/** Takes in a parameter of the response of the above GET, and loops over it, appending td with the text, buttons including the id
 * @param  {} tasks
 */
function renderTasks(tasks) {
    console.log(tasks);
    
    let completeClass
   
    $('#tasks-table').empty();
    tasks.forEach(task => {

       if(task.complete){
        completeClass = "complete"
    } else {
        completeClass = "incomplete"
    }

    console.log('tdd', task.dueDate);
    
    // task.dueDate = sqlToJsDate(task.dueDate);
    // let options = { weekday: 'long', month: 'long', day: 'numeric' };
    // task.dueDate = d.toLocaleString('default', options );
    
    var d = new Date(task.dueDate);

    let options = { weekday: 'long', month: 'long', day: 'numeric' };
    d = d.toLocaleString('default', options );

    
   // if style logic for due date = this date

        $('#tasks-table').append(`
            <tr class="${completeClass} space">
                    <td>${task.text}</td>
                    <td>${d}</td>
                    <td><button class="complete-btn btn btn-success" data-id="${task.id}"> ✔️ </button></td>
                    <td><button class="delete-btn btn btn-danger" data-id="${task.id}"> ❌ </button></td>
             </tr>
        `)

       

    });
}



