import ChatBubble from "@/components/chat/chatBubble";
import Sidebar from "@/components/sidebar/sidebar";

export default function Page() {
  return (
    <>
      <div className="relative h-screen w-full lg:ps-64">
        <ChatBubble />
      </div>
    </>
  );
}
