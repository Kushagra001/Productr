import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InputField from './InputField';

const AddProductModal = ({ onClose, onProductSaved, initialData = null }) => {
    const [formData, setFormData] = useState({
        name: '',
        type: 'Food', // Default
        quantityStock: '',
        mrp: '',
        sellingPrice: '',
        brandName: '',
        images: [],
        description: '',
        exchangeEligible: 'Yes', // Default
        status: 'Published' // Default status for categorization
    });

    // Helper to extract image URLs from file objects or strings
    const [imagePreviews, setImagePreviews] = useState([]);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (initialData) {
            setFormData({
                name: initialData.name || '',
                type: initialData.type || 'Food',
                quantityStock: initialData.quantityStock || '',
                mrp: initialData.mrp || '',
                sellingPrice: initialData.sellingPrice || '',
                brandName: initialData.brandName || '',
                images: initialData.images || [],
                description: initialData.description || '',
                exchangeEligible: initialData.exchangeEligible || 'Yes',
                status: initialData.status || 'Published' // Persist status on edit
            });
            setImagePreviews(initialData.images || []);
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }));
        }
    };

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 0) {
            files.forEach(file => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    const base64String = reader.result;
                    setImagePreviews(prev => [...prev, base64String]);
                    setFormData(prev => ({ ...prev, images: [...prev.images, base64String] }));
                };
                reader.readAsDataURL(file);
            });
        }
    };

    const removeImage = (index) => {
        const newImages = [...formData.images];
        newImages.splice(index, 1);
        setFormData(prev => ({ ...prev, images: newImages }));
        setImagePreviews(prev => prev.filter((_, i) => i !== index));
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.name) newErrors.name = "Product Name is required";
        if (!formData.quantityStock) newErrors.quantityStock = "Quantity is required";
        if (!formData.mrp) newErrors.mrp = "MRP is required";
        if (!formData.sellingPrice) newErrors.sellingPrice = "Selling Price is required";
        if (!formData.brandName) newErrors.brandName = "Brand Name is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validate()) return;

        setLoading(true);
        try {
            const url = initialData
                ? `http://localhost:5000/api/products/${initialData._id}`
                : 'http://localhost:5000/api/products';

            const method = initialData ? 'put' : 'post';

            const payload = {
                ...formData,
                // Ensure at least one image exists for good UX, but favor user uploads
                images: formData.images.length > 0 ? formData.images : ["https://placehold.co/400x400?text=Product"]
            };

            const res = await axios[method](url, payload);

            onProductSaved(initialData ? "Product Updated Successfully" : "Product added Successfully");
        } catch (err) {
            console.error(err);
            const errorMsg = err.response && err.response.data && err.response.data.error
                ? err.response.data.error
                : "Failed to save product";
            alert(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    const handleAddImage = () => {
        document.getElementById('file-upload').click();
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in">
            {/* Modal Container */}
            <div className="bg-white rounded-xl w-[600px] h-[90vh] flex flex-col shadow-2xl overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-white sticky top-0 z-10">
                    <h2 className="text-xl font-bold text-[#101828]">
                        {initialData ? 'Edit Product' : 'Add Product'}
                    </h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                </div>

                {/* Body - Scrollable */}
                <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">

                    {/* Product Name */}
                    <InputField
                        label="Product Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        error={errors.name}
                        placeholder="Enter product name"
                    />

                    {/* Product Type (Dropdown) */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-[#344054] mb-2">Product Type</label>
                        <div className="relative">
                            <select
                                name="type"
                                value={formData.type}
                                onChange={handleChange}
                                className="w-full border border-[#D0D5DD] rounded-lg px-4 py-2.5 text-[#101828] focus:outline-none focus:ring-1 focus:ring-[#3538CD] appearance-none bg-white cursor-pointer"
                            >
                                <option value="Food">Food</option>
                                <option value="Electronics">Electronics</option>
                                <option value="Clothing">Clothing</option>
                                <option value="Beauty Products">Beauty Products</option>
                                <option value="Others">Others</option>
                            </select>
                            <svg className="absolute right-4 top-3.5 pointer-events-none text-gray-500" width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                    </div>

                    {/* Quantity Stock */}
                    <InputField
                        label="Quantity Stock"
                        name="quantityStock"
                        type="number"
                        value={formData.quantityStock}
                        onChange={handleChange}
                        error={errors.quantityStock}
                        placeholder="Enter quantity"
                    />

                    {/* MRP */}
                    <InputField
                        label="MRP"
                        name="mrp"
                        type="number"
                        value={formData.mrp}
                        onChange={handleChange}
                        error={errors.mrp}
                        placeholder="Enter MRP"
                    />

                    {/* Selling Price */}
                    <InputField
                        label="Selling Price"
                        name="sellingPrice"
                        type="number"
                        value={formData.sellingPrice}
                        onChange={handleChange}
                        error={errors.sellingPrice}
                        placeholder="Enter selling price"
                    />

                    {/* Brand Name */}
                    <InputField
                        label="Brand Name"
                        name="brandName"
                        value={formData.brandName}
                        onChange={handleChange}
                        error={errors.brandName}
                        placeholder="Enter brand name"
                    />

                    {/* Upload Product Images */}
                    <div className="mb-6">
                        <div className="flex justify-between items-center mb-2">
                            <label className="block text-sm font-medium text-[#344054]">Upload Product Images</label>
                            {imagePreviews.length > 0 && (
                                <button type="button" onClick={handleAddImage} className="text-sm font-bold text-[#3538CD] cursor-pointer hover:underline">
                                    Add More Photos
                                </button>
                            )}
                        </div>

                        <div className={`border border-dashed border-[#EAECF0] rounded-lg p-8 flex flex-col items-center justify-center bg-[#F9FAFB] relative transition-all hover:bg-gray-50 ${imagePreviews.length === 0 ? 'cursor-pointer' : ''}`}
                            onClick={imagePreviews.length === 0 ? handleAddImage : undefined}
                        >
                            {/* Hidden Input */}
                            <input
                                id="file-upload"
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="hidden"
                            />

                            {imagePreviews.length === 0 ? (
                                <div className="text-center">
                                    <p className="text-gray-500 text-sm mb-1">Enter Description</p>
                                    <span className="text-[#101828] font-bold hover:underline">Browse</span>
                                </div>
                            ) : (
                                <div className="w-full flex gap-3 overflow-x-auto p-2">
                                    {imagePreviews.map((src, idx) => (
                                        <div key={idx} className="relative flex-shrink-0 w-24 h-24 border border-gray-200 rounded-lg overflow-hidden group bg-white">
                                            <img src={src} alt="preview" className="w-full h-full object-contain" />
                                            <button
                                                onClick={(e) => { e.stopPropagation(); removeImage(idx); }}
                                                className="absolute top-1 right-1 bg-white rounded-full p-0.5 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Exchange Eligibility (Dropdown) */}
                    <div className="mb-8">
                        <label className="block text-sm font-medium text-[#344054] mb-2">Exchange or return eligibility</label>
                        <div className="relative">
                            <select
                                name="exchangeEligible"
                                value={formData.exchangeEligible}
                                onChange={handleChange}
                                className="w-full border border-[#D0D5DD] rounded-lg px-4 py-2.5 text-[#101828] focus:outline-none focus:ring-1 focus:ring-[#3538CD] appearance-none bg-white cursor-pointer"
                            >
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </select>
                            <svg className="absolute right-4 top-3.5 pointer-events-none text-gray-500" width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-gray-100 bg-white sticky bottom-0 z-10 flex justify-end">
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="bg-[#3538CD] text-white px-8 py-2.5 rounded-lg font-bold text-sm hover:bg-[#2d31a6] transition-colors disabled:opacity-50"
                    >
                        {loading ? 'Saving...' : (initialData ? 'Update' : 'Create')}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddProductModal;
