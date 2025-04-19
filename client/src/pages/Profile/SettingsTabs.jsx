function SettingsTabs({ activeTab, onTabChange }) {
  return (
    <div className="settings-tabs">
      <button
        className={`settings-tab ${activeTab === "profile" ? "active" : ""}`}
        onClick={() => onTabChange("profile")}
      >
        Profile
      </button>
      <button
        className={`settings-tab ${activeTab === "advanced" ? "active" : ""}`}
        onClick={() => onTabChange("advanced")}
      >
        Advanced
      </button>
    </div>
  );
}

export default SettingsTabs;
