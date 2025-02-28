import { useState } from 'react';

export default function SecuritySettings() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      setMessage({
        type: 'error',
        text: 'New passwords do not match'
      });
      return;
    }
    
    setIsSubmitting(true);
    setMessage(null);
    
    try {
      // In a real app, you would call an API to change the password
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulating API call
      
      setMessage({
        type: 'success',
        text: 'Password updated successfully'
      });
      
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      setMessage({
        type: 'error',
        text: 'Failed to update password. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggle2FA = async () => {
    setIsSubmitting(true);
    
    try {
      // In a real app, you would call an API to toggle 2FA
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulating API call
      
      setTwoFactorEnabled(!twoFactorEnabled);
      
      setMessage({
        type: 'success',
        text: `Two-factor authentication ${!twoFactorEnabled ? 'enabled' : 'disabled'}`
      });
    } catch (error) {
      setMessage({
        type: 'error',
        text: 'Failed to update two-factor authentication settings'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-6">Security Settings</h2>
      
      {message && (
        <div className={`p-3 mb-4 rounded ${message.type === 'success' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
          {message.text}
        </div>
      )}
      
      <div className="mb-8">
        <h3 className="text-lg font-medium mb-4">Change Password</h3>
        <form onSubmit={handlePasswordChange}>
          <div className="mb-4">
            <label className="block mb-1">Current Password</label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block mb-1">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block mb-1">Confirm New Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          
          <button 
            type="submit"
            className="btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Updating...' : 'Update Password'}
          </button>
        </form>
      </div>
      
      <div className="pt-4 border-t">
        <h3 className="text-lg font-medium mb-4">Two-Factor Authentication</h3>
        <div className="flex justify-between items-center">
          <div>
            <p className="mb-1">
              {twoFactorEnabled 
                ? 'Two-factor authentication is enabled' 
                : 'Two-factor authentication is disabled'}
            </p>
            <p className="text-sm text-gray-500">
              {twoFactorEnabled 
                ? 'Your account is more secure with 2FA enabled' 
                : 'Enable 2FA to add an extra layer of security to your account'}
            </p>
          </div>
          <button 
            onClick={handleToggle2FA}
            className={twoFactorEnabled ? 'btn-secondary' : 'btn-primary'}
            disabled={isSubmitting}
          >
            {isSubmitting 
              ? 'Processing...' 
              : (twoFactorEnabled ? 'Disable 2FA' : 'Enable 2FA')}
          </button>
        </div>
      </div>
      
      <div className="mt-8 pt-4 border-t">
        <h3 className="text-lg font-medium mb-4">Session Management</h3>
        <p className="mb-2">You are currently logged in from 1 device</p>
        <button className="text-red-500 hover:text-red-700">
          Logout from all devices
        </button>
      </div>
    </div>
  );
}
