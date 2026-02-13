import React, { useState } from 'react';
import { createUser } from '../../services';

const CreateUser = () => {
    const [formData, setFormData] = useState({
        username: '',
        first_name: '',
        middle_name: '',
        last_name: '',
        email: '',
        batch: '',
        course: '',
        role: 'user',
        password: ''
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: '', text: '' });

        const { data, error } = await createUser(formData);

        if (error) {
            setMessage({ type: 'error', text: error.message });
        } else {
            setMessage({ type: 'success', text: 'User created successfully!' });
            setFormData({
                username: '',
                first_name: '',
                middle_name: '',
                last_name: '',
                email: '',
                batch: '',
                course: '',
                role: 'user',
                password: ''
            });
        }
        setLoading(false);
    };

    return (
        <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-2xl p-6 lg:p-8 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Create New User</h2>

            {message.text && (
                <div className={`p-4 rounded-xl mb-6 ${message.type === 'error' ? 'bg-red-500/10 text-red-500 border border-red-500/20' : 'bg-green-500/10 text-green-500 border border-green-500/20'}`}>
                    {message.text}
                </div>
            )}

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium mb-2">Username</label>
                    <input type="text" name="username" value={formData.username} onChange={handleChange} required
                        className="w-full px-4 py-3 bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-xl outline-none focus:border-blue-500 transition-colors" />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-2">Password</label>
                    <input type="text" name="password" value={formData.password} onChange={handleChange} required
                        className="w-full px-4 py-3 bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-xl outline-none focus:border-blue-500 transition-colors" />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">First Name</label>
                    <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} required
                        className="w-full px-4 py-3 bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-xl outline-none focus:border-blue-500 transition-colors" />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-2">Middle Name</label>
                    <input type="text" name="middle_name" value={formData.middle_name} onChange={handleChange}
                        className="w-full px-4 py-3 bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-xl outline-none focus:border-blue-500 transition-colors" />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-2">Last Name</label>
                    <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} required
                        className="w-full px-4 py-3 bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-xl outline-none focus:border-blue-500 transition-colors" />
                </div>

                <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required
                        className="w-full px-4 py-3 bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-xl outline-none focus:border-blue-500 transition-colors" />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Batch</label>
                    <input type="text" name="batch" value={formData.batch} onChange={handleChange} required
                        className="w-full px-4 py-3 bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-xl outline-none focus:border-blue-500 transition-colors" />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-2">Course</label>
                    <input type="text" name="course" value={formData.course} onChange={handleChange}
                        className="w-full px-4 py-3 bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-xl outline-none focus:border-blue-500 transition-colors" />
                </div>

                <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2">Role</label>
                    <select name="role" value={formData.role} onChange={handleChange}
                        className="w-full px-4 py-3 bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-xl outline-none focus:border-blue-500 transition-colors">
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>

                <div className="md:col-span-2 mt-4">
                    <button type="submit" disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-colors disabled:opacity-50">
                        {loading ? 'Creating User...' : 'Create User'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateUser;
