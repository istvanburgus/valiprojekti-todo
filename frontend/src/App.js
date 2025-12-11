import { useEffect, useState } from "react";
import taskService from "./services/tasks";
import TaskList from "./components/TaskList";
import AddTaskForm from "./components/AddTaskForm";
import SearchBar from "./components/SearchBar";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newContent, setNewContent] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Haetaan tehtävät backEndistä alussa
  useEffect(() => {
    taskService
      .getAll()
      .then((data) => {
        setTasks(data);
      })
      .catch((error) => {
        console.error("Virhe haettaessa tehtäviä:", error);
        setErrorMessage("Tehtäviä ei voitu hakea palvelimelta.");
      });
  }, []);

  const showError = (msg) => {
    setErrorMessage(msg);
    setTimeout(() => {
      setErrorMessage("");
    }, 5000);
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newContent.trim()) {
      showError("Tehtävän sisältö ei voi olla tyhjä.");
      return;
    }

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

        if (error.response && error.response.data && error.response.data.error) {
          showError(error.response.data.error);
        } else {
          showError("Tehtävän lisääminen epäonnistui.");
        }
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

        if (error.response && error.response.status === 404) {
          showError("Tehtävää ei löytynyt (se on ehkä jo poistettu).");
        } else {
          showError("Tehtävän päivitys epäonnistui.");
        }
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

        if (error.response && error.response.status === 404) {
          showError("Tehtävää ei löytynyt (se on ehkä jo poistettu).");
        } else {
          showError("Tehtävän poisto epäonnistui.");
        }
      });
  };

  const filteredTasks = tasks.filter((t) =>
    t.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        margin: 0,
        padding: 0,
        backgroundColor: "#f4f4f4",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "700px",
          margin: "2rem auto",
          padding: "1.5rem",
          backgroundColor: "white",
          borderRadius: "8px",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        }}
      >
        <h1>Tehtävienhallinta</h1>

        {errorMessage && (
          <div
            style={{
              backgroundColor: "#ffe0e0",
              border: "1px solid #ff4d4d",
              padding: "0.75rem",
              marginBottom: "1rem",
              borderRadius: "5px",
            }}
          >
            {errorMessage}
          </div>
        )}

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
    </div>
  );
}

export default App;
