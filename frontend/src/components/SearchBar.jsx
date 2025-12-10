const SearchBar = ({ searchTerm, onSearchChange }) => {
  return (
    <div style={{ marginTop: "1rem", marginBottom: "1rem" }}>
      <input
        type="text"
        placeholder="Hae tehtäviä sisällön perusteella..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        style={{ width: "100%" }}
      />
    </div>
  );
};

export default SearchBar;