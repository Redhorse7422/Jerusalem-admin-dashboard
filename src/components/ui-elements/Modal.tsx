import { ReactNode } from "react";

interface ModalProps {
    title: string;
    children: ReactNode;
    onClose: () => void;
}

export function Modal({ title, children, onClose }: ModalProps) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white dark:bg-gray-dark rounded-lg shadow-lg w-full max-w-md p-6 z-999 
                max-h-[90vh] overflow-y-auto">
                {/* Modal Header */}
                <div className="flex justify-between items-center border-b pb-2">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                        ✕
                    </button>
                </div>

                {/* Modal Body */}
                <div className="mt-4">{children}</div>
            </div>
        </div>
    );
}
