import { Toaster } from 'react-hot-toast';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        {children}
        <Toaster position="top-right" reverseOrder={false} />
      </div>
    </div>
  );
}
