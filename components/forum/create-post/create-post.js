import PopupOverlay from "../../overlay/popup-overlay/popup-overlay";

export default function CreatePost({ selected, setSelected }) {
  if (selected == null) return <></>;
  if (selected == 0)
    return (
      <PopupOverlay>
        <div className="flex flex-col justify-center items-center w-full h-full">
          <div className="absolute flex flex-col bg-magic-1 py-12 px-16 rounded-sm w-fit h-fit ">
            <button className="absolute top-2 right-2 bg-bubble-0 p-2 rounded-xl w-fit h-8 flex items-center justify-center" onClick={() => setSelected(null)}>X</button>
            <button className="bg-bubble-0 p-3 rounded-lg mb-4">
              Create Forum
            </button>
            <button className="bg-bubble-0 p-3 rounded-lg">Create Post</button>
          </div>
        </div>
      </PopupOverlay>
    );
}
