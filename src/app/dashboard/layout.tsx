// Admin Dashboard https://tailwindcomponents.com/component/dashboard-12
import Sidebar from '@/components/sidebar';
import TopMenu from '@/components/top-menu';
import { CiBellOn, CiBookmarkCheck, CiChat1, CiLogout, CiMenuBurger, CiSearch } from 'react-icons/ci';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Sidebar />
      <main className=' bg-slate-100'>
        <div className="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%] min-h-screen ">
          <TopMenu />
          {/* TODO: Contenido en el Layout.tsx */}
          <div className="px-6 pt-6 ">
            {children}
          </div>
        </div>
      </main>
      <ToastContainer />
    </>
  );
}