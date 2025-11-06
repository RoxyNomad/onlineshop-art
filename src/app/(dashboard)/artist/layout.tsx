import { ReactNode } from "react";
import Sidebar from "@/components/dashboard/ArtistSidebar";

interface ArtistLayoutProps {
  children: ReactNode;
}

const ArtistLayout = ({ children }: ArtistLayoutProps) => {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />  {/* Sidebar bleibt fix */}
      <main style={{ flex: 1, padding: '1rem' }}>
        {children} {/* Inhalt der Page */}
      </main>
    </div>
  );
};

export default ArtistLayout;
// Export the component for use in other parts of the application