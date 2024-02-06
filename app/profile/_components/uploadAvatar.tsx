import { userInfoAtom } from "@/atoms";
import { useAtom } from "jotai";
import { CldUploadWidget } from "next-cloudinary";
import React, { useState } from "react";

interface CldUploadWidgetResult {
  event?: string;
  info?: {
    secure_url?: string;
    [key: string]: any;
  };
}
interface UploadAvatarProps {
  setLoadingAvatar: (state: boolean) => void;
  id: string;
  setUserDataChanged: (state: boolean) => void;
}

export const UploadAvatar: React.FC<UploadAvatarProps> = ({
  setLoadingAvatar,
  id,
  setUserDataChanged,
}) => {
  const [errorUpload, setErrorUpload] = useState(false);

  async function handleSaveUrl(url: string) {
    setLoadingAvatar(true);
    setErrorUpload(false);
    try {
      if (!id) {
        console.error("ID utente non disponibile.");
        setLoadingAvatar(false);
        return;
      }
      const response = await fetch(`/api/users/${id}/avatar`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          avatar: url,
        }),
      });

      if (!response.ok) {
        setErrorUpload(true);
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoadingAvatar(false);
      setUserDataChanged(true);
    }
  }
  return (
    <CldUploadWidget
      uploadPreset="health-guide"
      onSuccess={(results: any) => {
        const typedResults: CldUploadWidgetResult = results;
        if (typedResults.info?.secure_url) {
          console.log("Url:", typedResults.info.secure_url);
          handleSaveUrl(typedResults.info.secure_url);
        }
      }}
    >
      {({ open }) => (
        <button
          className="block w-full text-sm text-slate-500
        file:mr-4 file:py-2 file:px-4
        file:rounded-full file:border-0
        file:text-sm file:font-semibold
       file:bg-violet-50 file:text-violet-700
      hover:file:bg-violet-100"
          onClick={() => open()}
        >
          Choose profile photo
        </button>
      )}
    </CldUploadWidget>
  );
};
