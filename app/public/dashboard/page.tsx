import ChatBubble from "@/components/chat/chatBubble";
import Navbar from "@/components/home/navbar";
import Sidebar from "@/components/sidebar/sidebar";

export default function Page() {
  return (
    <>
      <div className="container mx-auto">
        <Navbar />
        <ChatBubble />
      </div>
    </>
  );
}
