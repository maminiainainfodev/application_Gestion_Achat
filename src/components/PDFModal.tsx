"use client";

import { useState, useEffect } from "react";
import ModalWrapper from "./ModalWrapper";

interface PDFModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (filename: string) => void;
    initialValue?: string;
    title?: string;
    message?: string;
}

const PDFModal = ({
    isOpen,
    onClose,
    onConfirm,
    initialValue = "",
    title = "Générer le PDF",
    message = "Entrez un nom pour le fichier PDF (laissez vide pour le nom par défaut) :"
}: PDFModalProps) => {
    const [filename, setFilename] = useState(initialValue);

    useEffect(() => {
        if (isOpen) {
            setFilename(initialValue);
        }
    }, [isOpen, initialValue]);

    return (
        <ModalWrapper
            isOpen={isOpen}
            onClose={onClose}
            title={title}
        >
            <div className="flex flex-col">
                <p className="text-gray-600 mb-6 text-sm">
                    {message}
                </p>

                <div className="mb-8">
                    <input
                        type="text"
                        value={filename}
                        onChange={(e) => setFilename(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all shadow-sm bg-gray-50/50"
                        placeholder="Ex: navette-achat-2023"
                        autoFocus
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') onConfirm(filename);
                        }}
                    />
                </div>

                <div className="flex justify-center">
                    <button
                        onClick={() => onConfirm(filename)}
                        className="px-10 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all font-medium shadow-md hover:shadow-lg active:scale-95 duration-200"
                    >
                        Générer
                    </button>
                </div>
            </div>
        </ModalWrapper>
    );
};

export default PDFModal;
