import TaskItem from "./TaskItem";

const TaskList = ({ tasks, onToggleDone, onDelete }) => {
  if (tasks.length === 0) {
    return <p>Ei tehtäviä.</p>;
  }

  return (
    <ul>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggleDone={onToggleDone}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
};

export default TaskList;