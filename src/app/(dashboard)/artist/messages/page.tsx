import Sidebar from "@/components/dashboard/ArtistSidebar";
import Chat from "@/components/chat/Chat";

/**
 * ArtistMessages page in the App Router
 */
const ArtistMessagesPage = () => {
  return (
    <div>
      {/* Sidebar component for artist navigation */}
      <Sidebar />

      {/* Chat component to handle messaging */}
      <Chat />
    </div>
  );
};

// App Router pages don’t use `disableHeader` directly, 
// you could handle layout changes in `layout.tsx` if needed
export default ArtistMessagesPage;