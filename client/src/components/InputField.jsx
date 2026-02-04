import React from 'react';

const InputField = ({ label, name, type = "text", placeholder, value, onChange, error }) => (
    <div className="mb-5">
        <label className="block text-sm font-semibold text-[#344054] mb-1.5">{label}</label>
        <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            className={`w-full border ${error ? 'border-[#FDA29B] focus:border-[#FDA29B] focus:ring-[#FDA29B]' : 'border-[#D0D5DD] focus:border-[#3538CD] focus:ring-[#3538CD]'} rounded-lg px-4 py-2.5 text-sm text-[#101828] placeholder-[#667085] focus:outline-none focus:ring-1 transition-shadow bg-white`}
            placeholder={placeholder}
        />
        {error && <p className="text-sm text-[#F04438] mt-1.5">{error}</p>}
    </div>
);

export default InputField;
