import React from 'react';

const DeleteConfirmationModal = ({ product, onClose, onConfirm }) => {
    if (!product) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in">
            <div className="bg-white rounded-xl w-[400px] p-6 shadow-2xl relative">
                <button onClick={onClose} className="absolute right-4 top-4 text-gray-400 hover:text-gray-600">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>

                <h2 className="text-xl font-bold text-gray-900 mb-2">Delete Product</h2>
                <p className="text-gray-600 mb-1">Are you sure you really want to delete this Product</p>
                <p className="text-gray-900 font-bold mb-6">“ {product.name} ” ?</p>

                <div className="flex justify-end">
                    <button
                        onClick={() => onConfirm(product._id)}
                        className="bg-[#3538CD] hover:bg-[#3538CD]/90 text-white px-6 py-2 rounded-lg font-bold transition-colors"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmationModal;
