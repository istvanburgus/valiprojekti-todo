import { useEffect, useState } from "react";
import taskService from "./services/tasks";
import TaskList from "./components/TaskList";
import AddTaskForm from "./components/AddTaskForm";
import SearchBar from "./components/SearchBar";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newContent, setNewContent] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Haetaan tehtävät backEndistä alussa
  useEffect(() => {
    taskService
      .getAll()
      .then((data) => {
        setTasks(data);
      })
      .catch((error) => {
        console.error("Virhe haettaessa tehtäviä:", error);
      });
  }, []);

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newContent.trim()) return;

    const newTask = {
      content: newContent.trim(),
    };

    taskService
      .create(newTask)
      .then((created) => {
        setTasks([created, ...tasks]);
        setNewContent("");
      })
      .catch((error) => {
        console.error("Virhe lisättäessä tehtävää:", error);
      });
  };

  const handleToggleDone = (id, currentIsDone) => {
    taskService
      .update(id, { isDone: !currentIsDone })
      .then((updated) => {
        setTasks(tasks.map((t) => (t.id === id ? updated : t)));
      })
      .catch((error) => {
        console.error("Virhe päivitettäessä tehtävää:", error);
      });
  };

  const handleDeleteTask = (id) => {
    taskService
      .remove(id)
      .then(() => {
        setTasks(tasks.filter((t) => t.id !== id));
      })
      .catch((error) => {
        console.error("Virhe poistettaessa tehtävää:", error);
      });
  };

  const filteredTasks = tasks.filter((t) =>
    t.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "1rem" }}>
      <h1>Tehtävienhallinta</h1>

      <AddTaskForm
        onSubmit={handleAddTask}
        content={newContent}
        onContentChange={setNewContent}
      />

      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      <TaskList
        tasks={filteredTasks}
        onToggleDone={handleToggleDone}
        onDelete={handleDeleteTask}
      />
    </div>
  );
}

export default App;
