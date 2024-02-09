export async function createRunThread(message:string){
    try {
        const response = await fetch(
            `/api/openai/run/createRun-thread?assistantId=${process.env.NEXT_PUBLIC_ASSISTANT_ID}&message=${message}`
          );
          if (!response.ok) {
            throw new Error(`Errore nella richiesta: ${response.status}`);
          }
    
          const newMessage = await response.json();
    
          console.log("newMessage", newMessage);
          return newMessage;
    } catch (error:any) {
        console.error("Errore durante la chiamata Fetch:", error);

    }
}
