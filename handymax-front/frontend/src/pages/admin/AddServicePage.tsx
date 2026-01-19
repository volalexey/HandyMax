import { NavLink, useNavigate } from "react-router-dom";
import { useCreateServiceMutation } from "../../store/api/servicesApi";
import { useUploadFileMutation } from "../../store/api/filesApi"; // <--- Импортируем новый хук
import { useState, useRef } from "react";

import homeBlue from "../../assets/img/homeBlue.svg";
import arrowGreyBold from "../../assets/img/arrowGreyBold.svg";
import arrowBlackBold from "../../assets/img/arrowBlackBold.svg";
import editIcon from "../../assets/img/edit.svg";

export const AddServicePage = () => {
    const navigate = useNavigate();
    
    const [createService, { isLoading: isCreating }] = useCreateServiceMutation();
    
    const [uploadFile, { isLoading: isUploading }] = useUploadFileMutation();

    const fileInputRef = useRef<HTMLInputElement>(null);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: "",
        imageUrl: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            const response = await uploadFile(file).unwrap();
            
            setFormData(prev => ({ ...prev, imageUrl: response.url }));
        } catch (err) {
            console.error("Upload failed", err);
            alert("Failed to upload image");
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createService({
                title: formData.title,
                description: formData.description,
                price: Number(formData.price),
                imageUrl: formData.imageUrl,
            }).unwrap();

            navigate('/admin-panel/services');
        } catch (err) {
            console.error("Failed to create service", err);
            alert('Error creating service');
        }
    };

    const isBusy = isCreating || isUploading;

    return (
        <div className="bg-white w-full min-h-[80vh] flex flex-col gap-[20px] rounded-[20px] p-[20px] lg:rounded-[80px] lg:p-[40px_60px]">
      
            <div className="flex items-center gap-[20px] font-sans text-sm lg:text-base relative">
                <NavLink to="/admin-panel/services" className="text-[#0D6EFD] pl-[15px] relative flex items-center">
                    <img src={homeBlue} alt="home" className="absolute top-[3px] left-[-5px] w-4 h-4" />
                    Services
                </NavLink>
                <p className="text-[#6C757D] pl-[10px] relative flex items-center">
                    <span className="absolute left-[-10px] top-[5px] w-[10px] h-[10px] bg-no-repeat bg-contain" style={{ backgroundImage: `url(${arrowGreyBold})` }}></span>
                    Add New
                </p>
            </div>

            <NavLink to="/admin-panel/services" className="font-bold text-black pl-[15px] relative w-fit flex items-center mt-2">
                <span className="absolute left-[-3px] top-[6px] w-[10px] h-[10px] bg-no-repeat bg-contain" style={{ backgroundImage: `url(${arrowBlackBold})` }}></span>
                Back
            </NavLink>

            <h1 className="text-[2.25rem] font-extrabold mb-[25px]">
                Add new service
            </h1>

            <form onSubmit={handleSubmit} className="flex flex-col gap-[40px]">
        
                <div className="flex flex-col gap-[10px]">
                    <h2 className="text-[1.5rem] font-semibold">Title</h2>
                    <div className="relative w-full lg:w-[400px]">
                        <input
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="e.g. House Cleaning"
                            className="w-full h-[50px] border border-[#d7dde3] rounded-lg p-3 outline-none focus:border-orange-500 transition"
                            required
                        />
                        <img src={editIcon} alt="edit" className="absolute top-3 right-[-35px] w-[25px] h-[25px]" />
                    </div>
                </div>

                <div className="flex flex-col gap-[15px]">
                    <h2 className="text-[1.5rem] font-semibold">Photo</h2>
                    
                    <input 
                        type="file" 
                        ref={fileInputRef}
                        onChange={handleFileSelect}
                        className="hidden" 
                        accept="image/*"
                    />

                    <div 
                        onClick={() => fileInputRef.current?.click()}
                        className="w-[200px] h-[200px] border-[1.73px] border-[#ADB5BD] p-[10px] rounded-sm bg-gray-50 flex items-center justify-center cursor-pointer hover:opacity-80 transition relative overflow-hidden group"
                    >
                        {isUploading ? (
                            <span className="text-orange-500 font-bold animate-pulse">Uploading...</span>
                        ) : formData.imageUrl ? (
                            <>
                                <img src={formData.imageUrl} alt="preview" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                                    <span className="text-white font-bold text-sm">Change Image</span>
                                </div>
                            </>
                        ) : (
                            <div className="flex flex-col items-center">
                                <span className="text-4xl text-gray-300 mb-2">+</span>
                                <span className="text-gray-400 text-sm text-center">Click to upload</span>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex flex-col gap-[15px]">
                    <h2 className="text-[1.5rem] font-semibold">Description</h2>
                    <div className="relative w-full lg:w-[600px]">
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Describe the service..."
                            className="w-full h-[150px] border border-[#d7dde3] rounded-lg p-3 outline-none resize-none focus:border-orange-500 transition"
                            required
                        />
                        <img src={editIcon} alt="edit" className="absolute bottom-3 right-[-35px] w-[25px] h-[25px]" />
                    </div>
                </div>

                <div className="flex flex-col gap-[15px]">
                    <h2 className="text-[1.5rem] font-semibold">Price ($)</h2>
                    <div className="relative w-full lg:w-[200px]">
                        <input
                            name="price"
                            type="number"
                            value={formData.price}
                            onChange={handleChange}
                            placeholder="0.00"
                            className="w-full h-[50px] border border-[#d7dde3] rounded-lg p-3 outline-none focus:border-orange-500 transition"
                            required
                        />
                        <img src={editIcon} alt="edit" className="absolute top-3 right-[-35px] w-[25px] h-[25px]" />
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-[17px] mt-4">
                    <button 
                        type="submit"
                        disabled={isBusy}
                        className="w-[220px] h-[55px] bg-orange-500 text-white font-medium rounded-xl hover:bg-orange-600 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                        {isCreating ? "Saving..." : isUploading ? "Wait for upload..." : "Create Service"}
                    </button>
                    
                    <button 
                        type="button"
                        onClick={() => navigate('/admin-panel/services')}
                        className="w-[220px] h-[55px] bg-[#191A19] text-white font-medium rounded-xl hover:bg-black transition border border-black"
                    >
                        Cancel
                    </button>
                </div>

            </form>
        </div>
    );
}