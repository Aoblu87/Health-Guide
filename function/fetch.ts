export async function createRunThread(message:string){
    try {
        const response = await fetch(
            `/api/openai/run/createRun-thread?assistantId=asst_KOVip2WaLZUUk4fLnrm0FGrN&message=${message}`
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
