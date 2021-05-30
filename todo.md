* Create a front end experience that allows a user to create a Task.

front end elements 
--header-footer
--input box <client-ID--><function> <post request>
--input box for due date
--submit button <client-function>
--table with todo items<get request>
    --each todo --
        -- mark complete + delete - <2client functions>
--check mark/ styling on completed items <client-function>

---completed items section, seperate get? seperate append? ------ya


* When the Task is created, it should be stored inside of a database (SQL)
    --database schema "weekend-to-do-app"
    -- one table - name <tbd>

    data model below
                { ID for item  --serial primary key
                    text- string/varchar
                    complete y/n : boolean
                    deleted y/n? : !unsure if needed!
                    ------
                    tuck stretch 
                    - location?
                     - date posted - date? date --> string? (would need string to date)
                } 

* Whenever a Task is created the front end should refresh to show all tasks that need to be completed.
        -- get request
        -- appender


* Each Task should have an option to 'Complete' or 'Delete'.
-- button on each row element for each of these, functions, respective ajax calls


* When a Task is complete, its visual representation should change on the front end. For example, the background of the task container could change from gray to green. The complete option should be  'checked off'. Each of these are accomplished in CSS, but will need to hook into logic to know whether or not the task is complete.

-- if property complete is true, add css class etc --- eh, completed items in own section would be cool, not sure if need two tables


* Whether or not a Task is complete should also be stored in the database.

    -yea for sure bro


* Deleting a Task should remove it both from the front end as well as the Database.
    -- accomplished in get/ render based on properties


readme
.sql
server folder
    server.js
    router time

        ROUTES 
            -GET
            -POST (object catcher / queryblaster)
            -PUT (somehow make editable???)
            -DELETE -from button
    router.js
<public folder>
        index
            <styles>
            <scripts>
                client-js
                    functions--
                    1. object getter, go back to edans notes about calculator for this <<<<-----yes do it----->>>>  set object to push to return of object getter, clear input
                    2. object push to db, ajax POST
                    3. database getter ajax GET
                    4. data renderer tied to getter
                    -per row-
                    button function for complete 
                        -ajax put
                    button function for delete - SWAL PROMPT / alert
                        -ajax delete

            <vendor>    
                --jquery
                --bootstrap
                --bootstrap-map
                --other libs?



                on date ----- take in date val from input for object --check
                change db to have date column, pulled from object newTask, also returned in GET, appended in renderer   
                figure out mime type style sheet errors     
                if date is today -- show yellow -- client
