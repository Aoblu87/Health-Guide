import { useEffect, useState } from "react";
import DropdownThreads from "./dropdownThreads";


export default function ChatHistory(){
   const [chats,setChats]= useState([])
   const [loading,setLoading]= useState(true)
   const getChatHistory = (async ()=>{

    const userId = localStorage.getItem('userId');
try {
    const response= await fetch(`/api/users/${userId}/threads`)
    if(!response.ok){
        throw new Error("Error getting chat history", )
    }
    const chatHistory = await response.json();
    setChats(chatHistory)
    setLoading(false); // Imposta loading a false dopo aver ricevuto i dati

} catch (error:any) {
    console.error("Error fetch chatHistory:", error);
    setLoading(false); // Imposta loading a false dopo aver ricevuto i dati

}})
useEffect(() =>{
    getChatHistory()
        },[]);
   
    return (
        <>
        {loading ? (
            <div>Loading...</div> // Mostra un messaggio di caricamento
        ) : (
            <ul> {/* Aggiunto tag ul per avvolgere gli elementi li */}
                {chats?.map((chat:any) => (
                    <li key={chat._id} className="flex justify-between">
                        {/* Qui dovresti inserire le informazioni del chat */}
                        <div className="flex justify-between text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 dark:text-slate-400 dark:hover:text-slate-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                            <a
                                className="flex items-center gap-x-3 py-2 text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 dark:text-slate-400 dark:hover:text-slate-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                                href="#"
                            >
                                Preline AI Discord
                            </a>
                        </div>
                        <div className="flex">
                            <DropdownThreads />
                        </div>
                    </li>
                ))}
            </ul>
        )}
    </>
);
}