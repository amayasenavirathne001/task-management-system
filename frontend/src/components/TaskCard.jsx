import api from "../services/api";

function TaskCard({ task, refreshTasks }) {


  const deleteTask = async () => {

    try {

      await api.delete(`/tasks/${task.id}`);

      refreshTasks();

    } catch(error) {

      console.error(error);

    }

  };


  const editTask = async () => {

    try {

      await api.put(`/tasks/${task.id}`, {

        title: task.title,
        priority: task.priority,
        status: "Completed"

      });


      refreshTasks();


    } catch(error) {

      console.error(error);

    }

  };


  return (

    <tr>

      <td>{task.title}</td>

      <td>{task.priority}</td>

      <td>{task.status}</td>

      <td>{task.due_date}</td>


      <td>

        <button onClick={editTask}>
          Complete
        </button>


        <button onClick={deleteTask}>
          Delete
        </button>

      </td>


    </tr>

  );

}


export default TaskCard;