function StatCards({ tasks = [] }) {

  const total = tasks.length;

  const completed = tasks.filter(
    task => task.status === "Completed"
  ).length;

  const pending = tasks.filter(
    task => task.status === "Pending"
  ).length;


  return (
    <div style={{ display: "flex", gap: "20px" }}>

      <div>
        <h3>Total Tasks</h3>
        <h2>{total}</h2>
      </div>

      <div>
        <h3>Completed</h3>
        <h2>{completed}</h2>
      </div>

      <div>
        <h3>Pending</h3>
        <h2>{pending}</h2>
      </div>

    </div>
  );
}

export default StatCards;