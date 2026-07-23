import { useEffect, useState } from "react";
import api from "../services/api";

function TaskForm({ selectedTask, refreshTasks, clearSelection }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [status, setStatus] = useState("Pending");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    if (selectedTask) {
      setTitle(selectedTask.title);
      setDescription(selectedTask.description);
      setPriority(selectedTask.priority);
      setStatus(selectedTask.status);
      setDueDate(selectedTask.due_date?.substring(0, 10));
    } else {
      resetForm();
    }
  }, [selectedTask]);

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setPriority("Medium");
    setStatus("Pending");
    setDueDate("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const task = {
      title,
      description,
      priority,
      status,
      due_date: dueDate,
    };

    try {
      if (selectedTask) {
        await api.put(`/tasks/${selectedTask.id}`, task);
      } else {
        await api.post("/tasks", task);
      }

      refreshTasks();
      clearSelection();
      resetForm();
    } catch (err) {
      console.error(err);
      alert("Failed to save task");
    }
  };

  return (
    <div
      style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "10px",
        marginBottom: "30px",
        boxShadow: "0 2px 8px rgba(0,0,0,.1)",
      }}
    >
      <h2>{selectedTask ? "Edit Task" : "Add New Task"}</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Task Title"
          value={title}
          required
          onChange={(e) => setTitle(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "15px",
          }}
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "15px",
            height: "90px",
          }}
        />

        <div
          style={{
            display: "flex",
            gap: "15px",
            marginBottom: "15px",
          }}
        >
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            style={{ flex: 1, padding: "10px" }}
          >
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            style={{ flex: 1, padding: "10px" }}
          >
            <option>Pending</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>

          <input
            type="date"
            value={dueDate}
            required
            onChange={(e) => setDueDate(e.target.value)}
            style={{ flex: 1, padding: "10px" }}
          />
        </div>

        <button
          type="submit"
          style={{
            padding: "10px 20px",
            background: "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          {selectedTask ? "Update Task" : "Add Task"}
        </button>

        {selectedTask && (
          <button
            type="button"
            onClick={() => {
              clearSelection();
              resetForm();
            }}
            style={{
              marginLeft: "10px",
              padding: "10px 20px",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
        )}
      </form>
    </div>
  );
}

export default TaskForm;