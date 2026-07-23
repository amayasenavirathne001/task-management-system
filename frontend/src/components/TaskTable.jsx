import TaskCard from "./TaskCard";


function TaskTable({ tasks, refreshTasks }) {

  return (

    <div>

      <h2>
        Tasks
      </h2>


      <table 
        border="1" 
        cellPadding="10"
        style={{
          width:"100%",
          borderCollapse:"collapse"
        }}
      >

        <thead>

          <tr>

            <th>Title</th>

            <th>Priority</th>

            <th>Status</th>

            <th>Due Date</th>

            <th>Actions</th>

          </tr>

        </thead>



        <tbody>


          {
            tasks.length > 0 ? (

              tasks.map((task)=>(

                <TaskCard

                  key={task.id}

                  task={task}

                  refreshTasks={refreshTasks}

                />

              ))

            ) : (

              <tr>

                <td 
                  colSpan="5"
                  style={{
                    textAlign:"center"
                  }}
                >

                  No tasks found

                </td>

              </tr>

            )
          }



        </tbody>


      </table>


    </div>

  );

}


export default TaskTable;