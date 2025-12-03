import { Outlet } from "react-router-dom";

export const AdminAuthLayout = () => {
  return (
    <div className="min-h-screen bg-white font-sans">
      <Outlet />
    </div>
  );
};