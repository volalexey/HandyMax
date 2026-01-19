import { useEffect, useState, useRef } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { 
  useGetServiceByIdQuery, 
  useUpdateServiceMutation, 
  useDeleteServiceMutation 
} from "../../store/api/servicesApi";
import { useUploadFileMutation } from "../../store/api/filesApi";

import homeBlue from "../../assets/img/homeBlue.svg";
import arrowGreyBold from "../../assets/img/arrowGreyBold.svg";
import arrowBlackBold from "../../assets/img/arrowBlackBold.svg";
import editIcon from "../../assets/img/edit.svg";

export const EditServicePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data: service, isLoading: isFetching } = useGetServiceByIdQuery(id || "");
  
  const [updateService, { isLoading: isUpdating }] = useUpdateServiceMutation();
  const [deleteService, { isLoading: isDeleting }] = useDeleteServiceMutation();
  const [uploadFile, { isLoading: isUploading }] = useUploadFileMutation();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    imageUrl: "",
  });

  useEffect(() => {
    if (service) {
      setFormData({
        title: service.title,
        description: service.description,
        price: String(service.price),
        imageUrl: service.imageUrl || "",
      });
    }
  }, [service]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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
    if (!id) return;

    try {
      await updateService({
        id: Number(id),
        title: formData.title,
        description: formData.description,
        price: Number(formData.price),
        imageUrl: formData.imageUrl,
      }).unwrap();

      navigate("/admin-panel/services");
    } catch (err) {
      console.error("Failed to update", err);
      alert("Error updating service");
    }
  };

  const handleDelete = async () => {
    if (!id) return;
    if (window.confirm("Are you sure you want to delete this service?")) {
      try {
        await deleteService(Number(id)).unwrap();
        navigate("/admin-panel/services");
      } catch (err) {
        console.error("Failed to delete", err);
        alert("Error deleting service");
      }
    }
  };

  const isBusy = isUpdating || isUploading || isDeleting;

  if (isFetching) {
    return <div className="flex justify-center items-center min-h-[50vh]">Loading...</div>;
  }

  return (
    <div className="bg-white w-full min-h-[80vh] flex flex-col gap-[20px] rounded-[20px] p-[20px] lg:rounded-[80px] lg:p-[40px_60px]">
      
      <div className="flex items-center gap-[20px] font-sans text-sm lg:text-base relative">
        <NavLink to="/admin-panel/services" className="text-[#0D6EFD] pl-[15px] relative flex items-center">
          <img src={homeBlue} alt="home" className="absolute top-[3px] left-[-5px] w-4 h-4" />
          Services
        </NavLink>
        
        <p className="text-[#6C757D] pl-[10px] relative flex items-center">
          <span className="absolute left-[-10px] top-[5px] w-[10px] h-[10px] bg-no-repeat bg-contain" 
                style={{ backgroundImage: `url(${arrowGreyBold})` }}></span>
          {service?.title}
        </p>
      </div>

      <NavLink to="/admin-panel/services" className="font-bold text-black pl-[15px] relative w-fit flex items-center mt-2">
        <span className="absolute left-[-3px] top-[6px] w-[10px] h-[10px] bg-no-repeat bg-contain"
              style={{ backgroundImage: `url(${arrowBlackBold})` }}></span>
        Back
      </NavLink>

      <h1 className="text-[2.25rem] font-extrabold mb-[25px]">
        Edit Service
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-[40px]">
        
        <div className="flex flex-col gap-[10px]">
          <h2 className="text-[1.5rem] font-semibold">Title</h2>
          <div className="relative w-full lg:w-[400px]">
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full h-[50px] border border-[#d7dde3] rounded-lg p-3 outline-none focus:border-orange-500 transition"
              required
            />
            <img src={editIcon} alt="edit" className="absolute top-3 right-[-35px] w-[25px] h-[25px]" />
          </div>
        </div>

        <div className="flex flex-col gap-[15px]">
          <h2 className="text-[1.5rem] font-semibold">Photo</h2>
          <div className="relative w-fit group">
            
            <input 
              type="file" 
              ref={fileInputRef}
              onChange={handleFileSelect}
              className="hidden" 
              accept="image/*"
            />

            <div 
              onClick={() => fileInputRef.current?.click()}
              className="w-[200px] h-[200px] border-[1.73px] border-[#ADB5BD] p-[15px] rounded-sm cursor-pointer relative"
            >
              {isUploading ? (
                <div className="w-full h-full flex items-center justify-center bg-gray-100">Loading...</div>
              ) : (
                <img 
                  src={formData.imageUrl || "https://placehold.co/200"} 
                  alt="service" 
                  className="w-full h-full object-cover" 
                />
              )}
              
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                 <span className="text-white font-bold">Change</span>
              </div>
            </div>
            
            <img 
               src={editIcon} 
               alt="edit" 
               onClick={() => fileInputRef.current?.click()}
               className="absolute bottom-[5px] -right-[50px] w-[25px] h-[25px] cursor-pointer" 
            />
          </div>
        </div>

        <div className="flex flex-col gap-[15px]">
          <h2 className="text-[1.5rem] font-semibold">Description</h2>
          <div className="relative w-fit">
            <textarea 
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full lg:w-[300px] h-[110px] border border-[#d7dde3] rounded-lg p-3 outline-none resize-none focus:border-orange-500 transition"
            />
            <img src={editIcon} alt="edit" className="absolute bottom-[5px] -right-[50px] w-[25px] h-[25px] cursor-pointer" />
          </div>
        </div>

        <div className="flex flex-col gap-[15px]">
          <h2 className="text-[1.5rem] font-semibold">Price ($)</h2>
          <div className="relative w-fit">
            <input 
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              className="w-full lg:w-[300px] h-[30px] border border-[#d7dde3] rounded-lg p-2 outline-none focus:border-orange-500 transition"
            />
             <img src={editIcon} alt="edit" className="absolute bottom-[5px] -right-[50px] w-[25px] h-[25px] cursor-pointer" />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-[17px] mt-4">
          <button 
             type="submit"
             disabled={isBusy}
             className="w-[220px] h-[55px] bg-orange-500 text-white font-medium rounded-xl hover:bg-orange-600 transition disabled:opacity-50"
          >
            {isUpdating ? "Saving..." : "Save Changes"}
          </button>
          
          <button 
             type="button"
             disabled={isBusy}
             onClick={() => navigate("/admin-panel/services")}
             className="w-[220px] h-[55px] bg-[#191A19] text-white font-medium rounded-xl hover:bg-black transition border border-black"
          >
            Cancel
          </button>

          <button 
             type="button"
             disabled={isBusy}
             onClick={handleDelete}
             className="w-[220px] h-[55px] bg-red-100 text-red-600 font-medium rounded-xl hover:bg-red-200 transition border border-red-200 sm:ml-auto"
          >
            {isDeleting ? "Deleting..." : "Delete Service"}
          </button>
        </div>

      </form>
    </div>
  );
};