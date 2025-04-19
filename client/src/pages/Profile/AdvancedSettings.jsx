import { toast } from "sonner";
import { TriangleAlert } from "lucide-react";

function AdvancedSettings({ onClose }) {
  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );
    if (confirmed) {
      try {
        // Implement account deletion logic here
        toast.success("Account deletion initiated. Check your email for confirmation.");
        onClose();
      } catch (error) {
        toast.error(error.message || "Failed to delete account");
      }
    }
  };

  return (
    <div className="settings-advanced">
      <div className="settings-danger-zone">
        <h3>Close account</h3>
        <p>
          Pressing the button below deletes your account and all associated data.&nbsp;
          <b>Attention, this is not reversible.</b>
        </p>
        <button className="settings-delete-account" onClick={handleDeleteAccount}>
          <TriangleAlert size={18} /> Delete Account
        </button>
      </div>
    </div>
  );
}

export default AdvancedSettings;
