function CreateOptions({ options, activeTab, setActiveTab }) {
  return (
    <div className="options-tab-reusable">
      {options.map((element) => (
        <button type="button"
          key={element}
          onClick={() => setActiveTab(element)}
          className={activeTab == element ? "active" : ""}
        >
          {element}
        </button>
      ))}
    </div>
  );
}
export default CreateOptions;
