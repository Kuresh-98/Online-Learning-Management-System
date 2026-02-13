import React, { useState } from 'react';
import api from '../../utils/api';
import toast from 'react-hot-toast';
import { HiLockClosed, HiArrowRight } from 'react-icons/hi';

const ChangePassword = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            toast.error('New passwords do not match');
            return;
        }
        setIsLoading(true);
        try {
            const res = await api.post('/auth/change-password', { oldPassword, newPassword });
            if (res.data.success) {
                toast.success('Password changed successfully');
                setOldPassword('');
                setNewPassword('');
                setConfirmPassword('');
            } else {
                toast.error(res.data.message || 'Failed to change password');
            }
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to change password');
        }
        setIsLoading(false);
    };

    return (
        <div className="p-6 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Change Password</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                    <input
                        type="password"
                        value={oldPassword}
                        onChange={e => setOldPassword(e.target.value)}
                        required
                        className="input-field"
                        placeholder="Current password"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                    <input
                        type="password"
                        value={newPassword}
                        onChange={e => setNewPassword(e.target.value)}
                        required
                        className="input-field"
                        placeholder="New password"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        required
                        className="input-field"
                        placeholder="Confirm new password"
                    />
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                        <>
                            Change Password
                            <HiArrowRight className="w-5 h-5" />
                        </>
                    )}
                </button>
            </form>
        </div>
    );
};

export default ChangePassword;
