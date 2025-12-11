const AddTaskForm = ({ onSubmit, content, onContentChange }) => {
  return (
    <form
      onSubmit={onSubmit}
      style={{
        display: "flex",
        flexDirection: "row",
        gap: "0.5rem",
        marginBottom: "1rem",
      }}
    >
      <input
        type="text"
        placeholder="Uusi tehtävä"
        value={content}
        onChange={(e) => onContentChange(e.target.value)}
        style={{
          flexGrow: 1,
          padding: "8px",
          fontSize: "1em",
        }}
      />
      <button
        type="submit"
        style={{
          padding: "10px",
          fontSize: "1em",
          borderRadius: "5px",
          border: "none",
          backgroundColor: "blue",
          color: "white",
          cursor: "pointer",
          maxWidth: "120px",
        }}
      >
        Lisää tehtävä
      </button>
    </form>
  );
};

export default AddTaskForm;