import { NextRequest } from "next/server";
import OpenAI from "openai";

async function generateTitle(summary:string) {
  const openai = new OpenAI();

  try {
    const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {role: "assistant", content: "You are a helpful assistant."},
          {role: "user", content: "Hello!"}
        ],
        stream: true,
        max_tokens:30
      });

      for await (const chunk of completion) {
        console.log(chunk.choices[0].delta.content);
      }
    
    
  } catch (error) {
    console.error("Errore nella generazione del titolo:", error);
  }
}

// Usa questa funzione passando il riepilogo del thread
const summary = "Qui inserisci il riepilogo della conversazione.";
generateTitle(summary).then(title => console.log("Titolo Generato:", title));
