import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { useContent } from '../../context/ContentContext';
import { Save } from 'lucide-react';

export const AdminProfile: React.FC = () => {
    const { profile, updateProfile } = useContent();
    const [formData, setFormData] = useState(profile);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSocialChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            socialLinks: {
                ...prev.socialLinks,
                [name]: value
            }
        }));
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const formData = new FormData();
            formData.append('file', file);

            try {
                const res = await fetch('/api/upload', {
                    method: 'POST',
                    body: formData
                });
                const data = await res.json();

                setFormData(prev => ({
                    ...prev,
                    avatarUrl: data.url
                }));
            } catch (err) {
                console.error("Upload failed", err);
                alert("Image upload failed");
            }
        }
    };

    const handleSave = () => {
        updateProfile(formData);
        alert('Profile updated successfully!');
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Edit Profile</h2>
                <Button onClick={handleSave}>
                    <Save size={20} className="mr-2" />
                    Save Changes
                </Button>
            </div>

            <div className="grid gap-6">
                <Card className="p-6 space-y-4">
                    <h3 className="text-xl font-semibold mb-4">Personal Info</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm text-slate-400">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white focus:outline-none focus:border-primary"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm text-slate-400">Title</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white focus:outline-none focus:border-primary"
                            />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <label className="text-sm text-slate-400">Bio</label>
                            <textarea
                                name="bio"
                                value={formData.bio}
                                onChange={handleChange}
                                rows={4}
                                className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white focus:outline-none focus:border-primary"
                            />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <label className="text-sm text-slate-400">Profile Picture</label>
                            <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-start">
                                {formData.avatarUrl && (
                                    <img
                                        src={formData.avatarUrl}
                                        alt="Preview"
                                        className="w-24 h-24 rounded-full object-cover border border-slate-700 shrink-0"
                                    />
                                )}
                                <div className="flex-1 w-full">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white focus:outline-none focus:border-primary file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary/90"
                                    />
                                </div>
                            </div>
                            <p className="text-xs text-slate-500">Upload an image (stored locally)</p>
                        </div>

                        <div className="space-y-2 md:col-span-2">
                            <label className="text-sm text-slate-400">Resume Upload (PDF)</label>
                            <div className="flex gap-4 items-center">
                                <input
                                    type="file"
                                    accept=".pdf"
                                    onChange={async (e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                            const formData = new FormData();
                                            formData.append('file', file);

                                            try {
                                                const res = await fetch('/api/upload', {
                                                    method: 'POST',
                                                    body: formData
                                                });
                                                const data = await res.json();

                                                setFormData(prev => ({ ...prev, resumeUrl: data.url }));
                                            } catch (err) {
                                                console.error("Upload failed", err);
                                                alert("Resume upload failed");
                                            }
                                        }
                                    }}
                                    className="w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary/90"
                                />
                                {formData.resumeUrl && (
                                    <span className="text-xs text-green-400">Resume Staged (Click Save Changes)</span>
                                )}
                            </div>
                        </div>
                    </div>
                </Card>

                <Card className="p-6 space-y-4">
                    <h3 className="text-xl font-semibold mb-4">Social Links</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm text-slate-400">GitHub URL</label>
                            <input
                                type="text"
                                name="github"
                                value={formData.socialLinks.github}
                                onChange={handleSocialChange}
                                className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white focus:outline-none focus:border-primary"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm text-slate-400">LinkedIn URL</label>
                            <input
                                type="text"
                                name="linkedin"
                                value={formData.socialLinks.linkedin}
                                onChange={handleSocialChange}
                                className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white focus:outline-none focus:border-primary"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm text-slate-400">Twitter URL</label>
                            <input
                                type="text"
                                name="twitter"
                                value={formData.socialLinks.twitter}
                                onChange={handleSocialChange}
                                className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white focus:outline-none focus:border-primary"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm text-slate-400">Email (mailto:)</label>
                            <input
                                type="text"
                                name="email"
                                value={formData.socialLinks.email}
                                onChange={handleSocialChange}
                                className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white focus:outline-none focus:border-primary"
                            />
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};
