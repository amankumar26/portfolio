import React, { useEffect } from 'react';
import { Button } from './Button';
import { X, Download, FileText } from 'lucide-react';

interface ResumeModalProps {
    isOpen: boolean;
    onClose: () => void;
    resumeUrl: string;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose, resumeUrl }) => {
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div
                className="bg-slate-900 border border-slate-700 rounded-lg w-full max-w-4xl h-[85vh] flex flex-col shadow-2xl animate-in zoom-in-95 duration-200"
                onClick={e => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-slate-700">
                    <div className="flex items-center gap-2 text-slate-200">
                        <FileText size={20} />
                        <h3 className="font-semibold">Resume Preview</h3>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="primary"
                            size="sm"
                            onClick={() => window.open(resumeUrl, '_blank')}
                        >
                            <Download size={16} className="mr-2" />
                            Download
                        </Button>
                        <Button variant="ghost" size="sm" onClick={onClose}>
                            <X size={20} />
                        </Button>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 bg-slate-800 relative">
                    <object
                        data={resumeUrl}
                        type="application/pdf"
                        className="w-full h-full"
                    >
                        <div className="flex flex-col items-center justify-center h-full text-slate-400 gap-4">
                            <p>Unable to display PDF directly in this browser.</p>
                            <Button
                                variant="primary"
                                onClick={() => window.open(resumeUrl, '_blank')}
                            >
                                <Download size={16} className="mr-2" />
                                Download Resume
                            </Button>
                        </div>
                    </object>
                </div>
            </div>
        </div>
    );
};
