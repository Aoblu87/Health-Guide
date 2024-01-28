import ChatBubble from "@/components/chat/chatBubble";
import Sidebar from "@/components/sidebar/sidebar";

export default function Page() {
  return (
    <>
      <div className="container mx-auto">
        <div className="lg:ps-64">
          <ChatBubble />
        </div>
      </div>
    </>
  );
}
