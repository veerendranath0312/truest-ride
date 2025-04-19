import { useState } from "react";
import Modal from "../Home/Modal";
import SettingsTabs from "./SettingsTabs";
import ProfileForm from "./ProfileForm";
import AdvancedSettings from "./AdvancedSettings";

import "./settings.css";

function SettingsModal({ isOpen, onClose, currentUser, onUpdateUser }) {
  const [activeTab, setActiveTab] = useState("profile");

  if (!isOpen) return null;

  return (
    <Modal
      modalTitle="Settings"
      modalDescription="Update your profile information and manage account settings."
      onCloseModal={onClose}
      size="medium"
    >
      <SettingsTabs activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="settings-content">
        {activeTab === "profile" ? (
          <ProfileForm
            currentUser={currentUser}
            onUpdateUser={onUpdateUser}
            onClose={onClose}
          />
        ) : (
          <AdvancedSettings onClose={onClose} />
        )}
      </div>
    </Modal>
  );
}

export default SettingsModal;
