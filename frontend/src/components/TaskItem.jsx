const TaskItem = ({ task, onToggleDone, onDelete }) => {
  return (
    <li
      style={{
        padding: "0.5rem 0",
        borderBottom: "1px solid #ddd",
      }}
    >
      <label>
        <input
          type="checkbox"
          checked={task.isDone}
          onChange={() => onToggleDone(task.id, task.isDone)}
        />
        <span
          style={{
            textDecoration: task.isDone ? "line-through" : "none",
            marginLeft: "0.5rem",
          }}
        >
          {task.content}
        </span>
      </label>
      <br />
      {task.createdAt && (
        <small style={{ color: "#666" }}>
          {new Date(task.createdAt).toLocaleString()}
        </small>
      )}
      <br />
      <button
        onClick={() => onDelete(task.id)}
        style={{
          marginTop: "0.5rem",
          padding: "5px 10px",
          borderRadius: "4px",
          border: "none",
          backgroundColor: "#cc0000",
          color: "white",
          cursor: "pointer",
        }}
      >
        Poista
      </button>
      <br />
      <br />
    </li>
  );
};

export default TaskItem;