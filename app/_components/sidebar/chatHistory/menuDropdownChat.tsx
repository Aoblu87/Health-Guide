import { useChatHistory } from "@/hooks/useChatHistory";
import { useFloating } from "@floating-ui/react";
import { offset } from "@floating-ui/react-dom";
import { Popover, Transition } from "@headlessui/react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Fragment } from "react";
import { ShareChat } from "./dropdownChat/shareChat/shareChat";
import { useAtom } from "jotai";
import { shareModal } from "@/atoms";
import {autoPlacement} from '@floating-ui/react-dom';


interface MenuDropdownListProps {
  handlerRenameState: (data: boolean) => void;
  handlerRenameInput: (chatId: string) => void; // Add this line
  id: string;
  setLoading: (state: boolean) => void;
  loading: boolean;
}

export const MenuDropdownList: React.FC<MenuDropdownListProps> = ({
  handlerRenameState,
  handlerRenameInput,
  loading,
  setLoading,
  id,
}) => {
  const { fetchChatHistory } = useChatHistory();

  //Delete Chat
  const handleDelete = async () => {
    setLoading(true);
    const confirmDeletion = confirm("Are you sure you want to delete?");
    if (!confirmDeletion) {
      return;
    }
    if (!id) {
      console.log("Id not specified");
      return null;
    }
    try {
      const response = await fetch(`/api/chatHistory/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to delete chat");
      }
      console.log("Chat deleted successfully");
      fetchChatHistory();
    } catch (error: any) {
      console.error("Fetching delete error", error);
    } finally {
      setLoading(false);
    }
  };
  const { refs, floatingStyles } = useFloating({
    placement: "right",
    // middleware: [
    //   offset(({ rects }) => ({
    //     alignmentAxis: -rects.floating.width,
    //   })),
    // ],
    middleware: [autoPlacement()],

  });

  return (
    <Popover className="">
      {({ open }) => (
        <>
          <Popover.Button
            ref={refs.setReference}
            className="inline-flex  w-full justify-center rounded-md  px-4 py-2 text-sm font-medium text-white  "
          >
            <MoreHorizIcon className="text-gray-800 " />
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel
              ref={refs.setFloating}
              style={{ ...floatingStyles, zIndex: 99 }}
              className="absolute z-99 mt-3 w-full max-w-sm -translate-x-1/2 px-4 sm:px-0 lg:max-w-3xl"
            >
              <div className="overflow-hidden rounded-2xl shadow-lg ring-1 ring-black/5">
                <div className="relative grid gap-5 bg-gradient-to-b from-deep-teal-100 to-deep-teal-200 p-2 lg:grid-cols-1">
                  {/* EDIT */}
                  <button
                    className="-m-3 flex items-center rounded-2xl p-2 transition duration-150 ease-in-out hover:bg-puce-100/75 focus:outline-none focus-visible:ring focus-visible:ring-orange-500/50"
                    onClick={() => {
                      handlerRenameState(true);
                      handlerRenameInput(id);
                    }}
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center text-white sm:h-12 sm:w-12">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="#1f2937"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                        />
                      </svg>{" "}
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-deep-teal-900">
                        Edit
                      </p>
                    </div>
                  </button>
                  {/* SHARE */}
                  {/* <ShareChat id={id} /> */}
                  {/* DELETE */}
                  <button
                    className="-m-3 flex items-center rounded-2xl p-2 transition duration-150 ease-in-out hover:bg-puce-100/75 focus:outline-none focus-visible:ring focus-visible:ring-orange-500/50"
                    onClick={handleDelete}
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center text-white sm:h-12 sm:w-12">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="#1f2937"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-deep-teal-900">
                        Delete
                      </p>
                    </div>
                  </button>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};
