import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddProductModal from '../components/AddProductModal';
import ProductCard from '../components/ProductCard';
import Header from '../components/Header';
import Toast from '../components/Toast';
import DeleteConfirmationModal from '../components/DeleteConfirmationModal';

const Products = () => {
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

    const [showModal, setShowModal] = useState(false);
    const [products, setProducts] = useState([]);
    const [toastMsg, setToastMsg] = useState('');
    const [productToDelete, setProductToDelete] = useState(null);
    const [editingProduct, setEditingProduct] = useState(null);

    const fetchProducts = async () => {
        try {
            const res = await axios.get(`${API_URL}/api/products`);
            setProducts(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const confirmDelete = (id) => {
        const product = products.find(p => p._id === id);
        setProductToDelete(product);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${API_URL}/api/products/${id}`);
            fetchProducts();
            setProductToDelete(null);
            setToastMsg("Product Deleted Successfully");
        } catch (err) {
            console.error(err);
        }
    };

    const onEdit = (id) => {
        const product = products.find(p => p._id === id);
        setEditingProduct(product);
        setShowModal(true);
    };

    const handleUpdate = async (id, data) => {
        try {
            await axios.put(`${API_URL}/api/products/${id}`, data);
            fetchProducts();
        } catch (err) {
            console.error(err);
        }
    };

    const handleProductSaved = (msg) => {
        fetchProducts();
        setShowModal(false);
        setEditingProduct(null);
        setToastMsg(msg);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setEditingProduct(null);
    };

    return (
        <div className="flex flex-col h-full bg-[#fcfcfc]">
            <Header title="Products" />

            <div className="p-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-[20px] font-bold text-[#101828]">Products</h1>
                    <button
                        onClick={() => setShowModal(true)}
                        className="text-[#667085] hover:text-[#3538CD] font-medium flex items-center gap-2 transition-colors"
                    >
                        <span className="text-2xl font-light leading-none relative top-[-1px]">+</span>
                        <span className="text-sm font-bold">Add Products</span>
                    </button>
                </div>

                {products.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-[70vh] text-center">
                        {/* Grid + Plus Icon */}
                        <div className="mb-6">
                            <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="16" y="16" width="12" height="12" rx="2" stroke="#111652" strokeWidth="3" />
                                <rect x="36" y="16" width="12" height="12" rx="2" stroke="#111652" strokeWidth="3" />
                                <rect x="16" y="36" width="12" height="12" rx="2" stroke="#111652" strokeWidth="3" />
                                <path d="M42 36V48M36 42H48" stroke="#111652" strokeWidth="3" strokeLinecap="round" />
                            </svg>
                        </div>

                        <h2 className="text-[20px] font-bold text-[#111652] mb-3">Feels a little empty over here...</h2>
                        <p className="text-[#667085] text-sm max-w-[400px] mb-8 leading-relaxed">
                            You can create products without connecting store<br />
                            you can add products to store anytime
                        </p>

                        <button
                            onClick={() => setShowModal(true)}
                            className="bg-[#101828] text-white px-6 py-3 rounded-lg font-bold text-sm hover:bg-[#1d2939] transition-colors"
                        >
                            Add your Products
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                        {products.map(p => (
                            <ProductCard
                                key={p._id}
                                product={p}
                                onDelete={confirmDelete}
                                onUpdate={handleUpdate}
                                onEdit={onEdit}
                            />
                        ))}
                    </div>
                )}
            </div>

            {showModal && (
                <AddProductModal
                    onClose={handleCloseModal}
                    onProductSaved={handleProductSaved}
                    initialData={editingProduct}
                />
            )}

            {/* Delete Confirmation Modal */}
            {productToDelete && (
                <DeleteConfirmationModal
                    product={productToDelete}
                    onClose={() => setProductToDelete(null)}
                    onConfirm={handleDelete}
                />
            )}

            {toastMsg && <Toast message={toastMsg} onClose={() => setToastMsg('')} />}
        </div>
    );
};

export default Products;
