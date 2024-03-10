import { Outlet } from "react-router-dom";

export default function Public() {
  return (
    <div className='min-h-screen flex flex-col justify-center items-center antialiased'>
      <div className=''>
        <Outlet />
      </div>
    </div>
  );
}
