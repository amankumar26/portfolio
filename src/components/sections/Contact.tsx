import React from 'react';
import { Card } from '../ui/Card';
import { useContent } from '../../context/ContentContext';
import { Mail, Github, Linkedin, Twitter } from 'lucide-react';
import { Button } from '../ui/Button';
import { ensureAbsoluteUrl } from '../../lib/utils';
import { motion } from 'framer-motion';

export const Contact: React.FC = () => {
    const { profile } = useContent();
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto space-y-8 text-center"
        >
            <h2 className="text-3xl font-bold text-center mb-8">Get In Touch</h2>
            <Card className="p-8 max-w-2xl mx-auto">
                <p className="text-lg text-slate-300 mb-8">
                    I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
                </p>

                <div className="flex justify-center gap-6 mt-8">
                    {profile.socialLinks.github && (
                        <a href={ensureAbsoluteUrl(profile.socialLinks.github)} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">
                            <Github size={24} />
                        </a>
                    )}
                    {profile.socialLinks.linkedin && (
                        <a href={ensureAbsoluteUrl(profile.socialLinks.linkedin)} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">
                            <Linkedin size={24} />
                        </a>
                    )}
                    {profile.socialLinks.twitter && (
                        <a href={ensureAbsoluteUrl(profile.socialLinks.twitter)} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">
                            <Twitter size={24} />
                        </a>
                    )}
                </div>

                {profile.socialLinks.email && (
                    <a href={profile.socialLinks.email} className="inline-block w-full sm:w-auto">
                        <Button size="lg" className="w-full sm:w-auto">
                            <Mail className="mr-2" size={20} />
                            Say Hello
                        </Button>
                    </a>
                )}
            </Card>
        </motion.div>
    );
};
