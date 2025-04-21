import { useState } from "react";
import { toast } from "sonner";
import { TriangleAlert } from "lucide-react";
import useUserStore from "../../store/useUserStore";
import useAuthStore from "../../store/useAuthStore";
import OTPVerification from "../../components/OTPVerification";

function AdvancedSettings() {
  const { user } = useAuthStore();
  const { initiateDeleteAccount, deleteAccount } = useUserStore();
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInitiateDelete = async () => {
    setIsLoading(true);
    try {
      await initiateDeleteAccount(user.email);
      setShowOtpInput(true);
      toast.success("Please check your email for the verification code.");
    } catch (error) {
      toast.error(error.message || "Failed to initiate account deletion.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyAndDelete = async (otp) => {
    setIsLoading(true);
    try {
      await deleteAccount(user.email, otp);
      toast.success("Your account has been succcessfully deleted.");
    } catch (error) {
      toast.error(error.message || "Failed to delete account");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => setShowOtpInput(false);

  return (
    <div className="settings-advanced">
      <div className="settings-danger-zone">
        <h3>Close account</h3>
        <p>
          Pressing the button below deletes your account and all associated data.&nbsp;
          <b>Attention, this is not reversible.</b>
        </p>
        {!showOtpInput ? (
          <button
            onClick={handleInitiateDelete}
            disabled={isLoading}
            className="settings-delete-account"
          >
            {isLoading ? (
              "Processing..."
            ) : (
              <>
                <TriangleAlert size={18} /> Close Account
              </>
            )}
          </button>
        ) : (
          <div className="settings-otp-verification">
            <OTPVerification
              email={user.email}
              onVerify={handleVerifyAndDelete}
              onCancel={handleCancel}
              isLoading={isLoading}
              buttonText="Close account"
              loadingText="Closing account..."
              action="confirm account deletion"
              variant="danger"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default AdvancedSettings;
