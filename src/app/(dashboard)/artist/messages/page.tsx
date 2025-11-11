"use client";

import { useSession } from "next-auth/react";
import Sidebar from "@/ui/dashboard/artist/ArtistSidebar";
import Chat from "@/ui/chat/ChatContainer";

const ArtistMessagesPage = () => {
  const { data: session } = useSession();

  // Extrahiere die User-ID sicher aus der Session
  const currentUserId =
    session?.user && "id" in session.user ? (session.user as { id: string }).id : undefined;

  if (!currentUserId) {
    return <p>Bitte logge dich ein, um deine Nachrichten zu sehen.</p>;
  }

  return (
    <div>
      <Sidebar />
      <Chat currentUserId={currentUserId} />
    </div>
  );
};

export default ArtistMessagesPage;
