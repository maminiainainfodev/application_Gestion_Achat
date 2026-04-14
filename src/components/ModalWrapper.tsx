"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const ModalWrapper = ({
    isOpen,
    onClose,
    title,
    children,
}: {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
}) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    if (!isOpen || !mounted) return null;

    return createPortal(
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[9999] flex items-center justify-center p-4 animate-fadeIn">
            <div className="bg-white p-6 rounded-lg relative w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl animate-scaleIn">
                <div className="flex justify-between items-center mb-6">
                    {title && <h2 className="text-xl font-semibold text-gray-800">{title}</h2>}
                    <button
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        onClick={onClose}
                    >
                        <Image src="/close.png" alt="Fermer" width={14} height={14} />
                    </button>
                </div>
                {children}
            </div>
        </div>,
        document.body
    );
};

export default ModalWrapper;
