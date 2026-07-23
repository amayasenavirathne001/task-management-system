import { useEffect, useState } from "react";
import api from "../services/api";

import StatsCards from "../components/StatsCards";
import TaskForm from "../components/TaskForm";
import TaskTable from "../components/TaskTable";


function Dashboard() {

  const [tasks, setTasks] = useState([]);

  // Search and filter states
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");


  useEffect(() => {
    loadTasks();
  }, []);


  const loadTasks = async () => {

    try {

      const response = await api.get("/tasks");

      setTasks(response.data);

    } catch(error) {

      console.error(error);

    }

  };


  const user = JSON.parse(localStorage.getItem("user"));


  // Search + filter logic
  const filteredTasks = tasks.filter((task) => {


    const matchesSearch =
      task.title
        ?.toLowerCase()
        .includes(search.toLowerCase());


    const matchesStatus =
      statusFilter === "" ||
      task.status === statusFilter;


    const matchesPriority =
      priorityFilter === "" ||
      task.priority === priorityFilter;


    return (
      matchesSearch &&
      matchesStatus &&
      matchesPriority
    );

  });



  return (

    <div style={{padding:"30px"}}>


      <h1>
        Task Management Dashboard
      </h1>


      <h3>
        Welcome, {user?.name}
      </h3>



      <button
        onClick={()=>{
          localStorage.clear();
          window.location.href="/";
        }}
      >
        Logout
      </button>



      <hr />



      <StatsCards 
        tasks={tasks}
      />



      <TaskForm 
        refreshTasks={loadTasks}
      />



      {/* Search and Filters */}

      <div style={{margin:"20px 0"}}>

        <h2>
          Search & Filter Tasks
        </h2>


        {/* Search by title */}

        <input
          type="text"
          placeholder="Search task title"
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
          style={{
            padding:"8px",
            marginRight:"10px"
          }}
        />



        {/* Status Filter */}

        <select
          value={statusFilter}
          onChange={(e)=>setStatusFilter(e.target.value)}
          style={{
            padding:"8px",
            marginRight:"10px"
          }}
        >

          <option value="">
            All Status
          </option>

          <option value="Pending">
            Pending
          </option>

          <option value="Completed">
            Completed
          </option>

        </select>




        {/* Priority Filter */}

        <select
          value={priorityFilter}
          onChange={(e)=>setPriorityFilter(e.target.value)}
          style={{
            padding:"8px"
          }}
        >

          <option value="">
            All Priority
          </option>

          <option value="High">
            High
          </option>

          <option value="Medium">
            Medium
          </option>

          <option value="Low">
            Low
          </option>


        </select>



      </div>




      <TaskTable

        tasks={filteredTasks}

        refreshTasks={loadTasks}

      />



    </div>

  );

}


export default Dashboard;