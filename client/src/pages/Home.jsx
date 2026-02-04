import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import AddProductModal from '../components/AddProductModal';
import DeleteConfirmationModal from '../components/DeleteConfirmationModal';
import Toast from '../components/Toast';

const Home = () => {
    const [activeTab, setActiveTab] = useState('Published');
    const [products, setProducts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [deletingProduct, setDeletingProduct] = useState(null);
    const [toastMsg, setToastMsg] = useState('');

    const fetchProducts = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/products');
            setProducts(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    // Filter products based on active tab
    const filteredProducts = products.filter(p =>
        activeTab === 'Published' ? p.status === 'Published' : p.status === 'Unpublished'
    );

    const handleProductSaved = (msg) => {
        fetchProducts();
        setShowModal(false);
        setEditingProduct(null);
        setToastMsg(msg);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/products/${id}`);
            fetchProducts();
            setDeletingProduct(null);
            setToastMsg("Product Deleted Successfully");
        } catch (err) {
            console.error(err);
        }
    };

    const handleUpdateChange = async (id, data) => {
        try {
            await axios.put(`http://localhost:5000/api/products/${id}`, data);
            fetchProducts();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="flex flex-col h-full bg-[#fcfcfc]">
            <Header title="Home" />

            <div className="p-8">
                <div className="flex gap-8 mb-8 border-b border-gray-200">
                    <button
                        onClick={() => setActiveTab('Published')}
                        className={`pb-3 font-medium text-sm transition-colors relative ${activeTab === 'Published' ? 'text-[#3538CD]' : 'text-[#667085]'}`}
                    >
                        Published
                        {activeTab === 'Published' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#3538CD]"></div>}
                    </button>
                    <button
                        onClick={() => setActiveTab('Unpublished')}
                        className={`pb-3 font-medium text-sm transition-colors relative ${activeTab === 'Unpublished' ? 'text-[#3538CD]' : 'text-[#667085]'}`}
                    >
                        Unpublished
                        {activeTab === 'Unpublished' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#3538CD]"></div>}
                    </button>
                </div>

                {filteredProducts.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-[60vh] text-center">
                        {/* Grid Icon */}
                        <div className="mb-6">
                            <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="16" y="16" width="12" height="12" rx="2" stroke="#111652" strokeWidth="3" />
                                <rect x="36" y="16" width="12" height="12" rx="2" stroke="#111652" strokeWidth="3" />
                                <rect x="16" y="36" width="12" height="12" rx="2" stroke="#111652" strokeWidth="3" />
                                <path d="M42 36V48M36 42H48" stroke="#111652" strokeWidth="3" strokeLinecap="round" />
                            </svg>
                        </div>
                        <h2 className="text-lg font-bold text-[#111652] mb-2">No {activeTab} Products</h2>
                        <p className="text-[#667085] text-sm max-w-[300px]">
                            {activeTab === 'Published'
                                ? "Your Published Products will appear here. Create your first product to publish"
                                : "Your Unpublished Products will appear here. Create your first product to publish"}
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                        {filteredProducts.map(p => (
                            <ProductCard
                                key={p._id}
                                product={p}
                                onDelete={() => setDeletingProduct(p)}
                                onUpdate={handleUpdateChange}
                                onEdit={() => {
                                    setEditingProduct(p);
                                    setShowModal(true);
                                }}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Modals */}
            {showModal && (
                <AddProductModal
                    onClose={() => {
                        setShowModal(false);
                        setEditingProduct(null);
                    }}
                    onProductSaved={handleProductSaved}
                    initialData={editingProduct}
                />
            )}

            {deletingProduct && (
                <DeleteConfirmationModal
                    product={deletingProduct}
                    onClose={() => setDeletingProduct(null)}
                    onConfirm={handleDelete}
                />
            )}

            {toastMsg && <Toast message={toastMsg} onClose={() => setToastMsg('')} />}
        </div>
    );
};

export default Home;
