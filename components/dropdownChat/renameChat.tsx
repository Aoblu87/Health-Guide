
interface RenameChatProps {
  handlerRenameState: (data: boolean) => void;
  // handlerLinkState: (data: string, condition: boolean) => void;
  id?: string;
}
export const RenameChat: React.FC<RenameChatProps> = ({
  handlerRenameState,
  // handlerLinkState,
  id,
}) => {
  // const handleRenameClick = () => {
  //   handlerRenameState(true);
  //   // Check if 'id' is not undefined before calling handlerLinkState
  //   if (id !== undefined) {
  //     handlerLinkState(id, true);
  //   } else {
  //     // Handle the undefined case here
  //     console.error("Error: id is undefined");
  //   }
  // };

  return (
    <button
      className="flex items-center gap-x-3.5 py-2 px-1rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:focus:bg-gray-700"
      onClick={() => {
        handlerRenameState(true)}}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className="bi bi-pencil-fill"
        viewBox="0 0 16 16"
      >
        <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z" />
      </svg>
    </button>
  );
};
