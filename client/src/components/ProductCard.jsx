import React, { useState } from 'react';

const ProductCard = ({ product, onDelete, onUpdate, onEdit }) => {
    const [currentImg, setCurrentImg] = useState(0);

    // Fallback if no images are present
    const images = product.images && product.images.length > 0 ? product.images : ["https://placehold.co/300x200?text=No+Image"];

    // Mapping status to styling
    const isPublished = product.status === 'Published';

    return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow">
            {/* Image Carousel */}
            <div className="h-[240px] relative bg-[#f9fafb] p-6 flex items-center justify-center">
                <img src={images[currentImg]} alt={product.name} className="h-full w-auto object-contain drop-shadow-sm" />

                {/* Carousel Indicators */}
                {images.length > 1 && (
                    <div className="absolute bottom-3 flex gap-1.5 justify-center w-full">
                        {images.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentImg(idx)}
                                className={`w-2 h-2 rounded-full transition-colors ${currentImg === idx ? 'bg-[#FF662B]' : 'bg-gray-300 hover:bg-gray-400'}`}
                            />
                        ))}
                    </div>
                )}
            </div>

            <div className="p-5 flex-1 flex flex-col">
                <h3 className="font-bold text-[#101828] text-base mb-5 line-clamp-2 min-h-[48px]">{product.name}</h3>

                <div className="flex flex-col gap-2.5 text-sm mb-6">
                    <div className="flex justify-between items-center text-[#667085]">
                        <span>Product type -</span>
                        <span className="text-[#101828] font-medium">{product.type}</span>
                    </div>

                    <div className="flex justify-between items-center text-[#667085]">
                        <span>Quantity Stock -</span>
                        <span className="text-[#101828]">{product.quantityStock}</span>
                    </div>

                    <div className="flex justify-between items-center text-[#667085]">
                        <span>MRP -</span>
                        <span className="text-[#101828]">₹ {product.mrp}</span>
                    </div>

                    <div className="flex justify-between items-center text-[#667085]">
                        <span>Selling Price -</span>
                        <span className="text-[#101828] font-semibold">₹ {product.sellingPrice}</span>
                    </div>

                    <div className="flex justify-between items-center text-[#667085]">
                        <span>Brand Name -</span>
                        <span className="text-[#101828]">{product.brandName}</span>
                    </div>

                    <div className="flex justify-between items-center text-[#667085]">
                        <span>Total Number of images -</span>
                        <span className="text-[#101828]">{images.length}</span>
                    </div>

                    <div className="flex justify-between items-center text-[#667085]">
                        <span>Exchange Eligibility -</span>
                        <span className="text-[#101828]">{product.exchangeEligible}</span>
                    </div>
                </div>

                {/* Actions */}
                <div className="mt-auto flex gap-3 h-[40px]">
                    <button
                        onClick={() => onUpdate(product._id, { status: isPublished ? 'Unpublished' : 'Published' })}
                        className={`flex-1 rounded-lg text-sm font-bold text-white transition-colors ${isPublished ? 'bg-[#101828] hover:bg-[#1d2939]' : 'bg-[#53B1FD] hover:bg-[#4393e0]'}`}
                        style={{ backgroundColor: isPublished ? '#101828' : '#3538CD' }} // Using style to override conditional class for precise matching if needed, but classes are cleaner. 
                    // Wait, screenshot shows Blue for "Publish" button (meaning currently unpublished?) No, typical UI: Button text describes ACTION.
                    // Screenshot 2: "Unpublish" button is Green. "Publish" button is Blue.
                    // If card says "Unpublish", it is currently published.
                    // Let's match the screenshot explicitly.
                    // CakeZone Choco Fudge -> Green "Unpublish" button -> Status must be Published.
                    // Theobroma Christmas Cake -> Blue "Publish" button -> Status must be Unpublished.
                    >
                        {isPublished ? (
                            <span className="w-full h-full flex items-center justify-center bg-[#47D114] hover:bg-[#3db80f] rounded-lg">Unpublish</span>
                        ) : (
                            <span className="w-full h-full flex items-center justify-center bg-[#101828] hover:bg-[#1d2939] rounded-lg bg-[#3538CD]">Publish</span>
                        )}
                        {/* Note: In-lining styles for specific colors from screenshot if tailwind doesn't match */}
                    </button>

                    <button
                        onClick={() => onEdit(product._id)}
                        className="flex-1 rounded-lg text-sm font-semibold text-[#344054] border border-[#D0D5DD] hover:bg-gray-50 bg-white"
                    >
                        Edit
                    </button>

                    <button
                        onClick={() => onDelete(product._id)}
                        className="w-[40px] flex items-center justify-center rounded-lg border border-[#D0D5DD] text-[#667085] hover:text-red-500 hover:bg-gray-50"
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
