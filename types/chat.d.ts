interface Run {
  id: string;
  status: "cancelled" | "failed" | "completed" | "expired" | string;
}

interface CreateRunResponse {
  NewRun: Run;
}

interface Message {
    id: string;
    content: string;
    file_ids?: string[];
  }

  
 
  
interface HookParams {
  chatId: string | null; //Chat id can be null  when   creating a new instance
  fileId?: string; // fileId is optional
  setRun: (run: Run) => void; // function to update the run status
  fetchMessages: () => Promise<void>; // function to fetch messages
}
interface UseSendMessageParams {
    chatId: string | null;
    fileId?: string;
    setMessage: (message: string) => void; // Continua a passare setMessage se gestisci un input di testo
    handleCreate: () => Promise<void>;
  }
  