const TaskItem = ({ task, onToggleDone, onDelete }) => {
  return (
    <li>
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
        <small>{new Date(task.createdAt).toLocaleString()}</small>
      )}
      <br />
      <button
        onClick={() => onDelete(task.id)}
        style={{ marginTop: "0.5rem" }}
      >
        Poista
      </button>
      <br />
      <br />
    </li>
  );
};

export default TaskItem;