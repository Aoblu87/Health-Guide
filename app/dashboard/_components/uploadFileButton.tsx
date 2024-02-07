import { fileIdAtom } from "@/atoms";
import { useAtom } from "jotai";

interface UploadFileButtonProps {}
export const UploadFileButton: React.FC<UploadFileButtonProps> = () => {
  const [, setFileId] = useAtom(fileIdAtom);


  


  const handlePostFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    let formData;
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      formData = new FormData();
      formData.append("file", file);
      formData.append("purpose", "assistants");
    }
    try {
      const response = await fetch("https://api.openai.com/v1/files", {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
        },
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        throw new Error("Errore di upload");
      }

      console.log("file is", response);
      const dataFile = await response.json();
      console.log("data", dataFile);
      setFileId(dataFile.id);
    } catch (error) {
      console.error("Error getting completion:", error);
    }
  };
//   // Gestore dell'evento di cambio del file
//   const handleFileChange = async (
//     event: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     if (event.target.files && event.target.files[0]) {
//       const file = event.target.files[0];
//       try {
//         const response = await postFile(file);
//       } catch (error) {
//         console.error("Errore durante l'upload del file:", error);
//       }
//     }
//   };

  return (
    <div className="relative flex items-center cursor-pointer">
      <div className="rounded-full">
        {/* <svg
        className="flex-shrink-0 h-5 w-5 absolute"
        style={{inset:"16px 0 0 15px"}}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        >
        <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>
      </svg> */}
        <input
          type="file"
          className="inline-flex p-2 flex-shrink-0 justify-center items-center h-8 w-8 rounded-full text-white hover:text-blue-600 focus:z-10 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:hover:text-blue-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
          onChange={handlePostFile}
        />
      </div>
    </div>
  );
};
