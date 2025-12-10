const AddTaskForm = ({ onSubmit, content, onContentChange }) => {
  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="Uusi tehtävä"
        value={content}
        onChange={(e) => onContentChange(e.target.value)}
      />
      <button type="submit" style={{ marginLeft: "0.5rem" }}>
        Lisää tehtävä
      </button>
    </form>
  );
};

export default AddTaskForm;