import PopupOverlay from "../../overlay/popup-overlay/popup-overlay";

export default function CreatePost({ selected, setSelected, forum = "" }) {
  if (selected == null) return <></>;
  if (selected == 0)
    return (
      <PopupOverlay>
        <div className="flex flex-col justify-center items-center w-full h-full">
          <div className="absolute flex flex-col bg-magic-1 py-12 px-16 rounded-sm w-fit h-fit ">
            <button
              className="absolute top-2 right-2 bg-bubble-0 p-2 rounded-xl w-fit h-8 flex items-center justify-center"
              onClick={() => setSelected(null)}
            >
              X
            </button>
            <form
              className="flex flex-col items-center"
              onSubmit={(e) => {
                e.preventDefault();
                CreateForum(e, forum.length > 0 ? forum : null);
              }}
            >
              <label htmlFor="name" className="mb-2">
                {forum.length <= 0 ? "Forum Name" : "Thread Name"}
              </label>
              <input name="name" type="text" className="mb-4" />
              <button
                type="submit"
                className="bg-bubble-0 p-4 rounded-xl w-fit h-8 flex items-center justify-center"
              >
                Create!
              </button>
            </form>
          </div>
        </div>
      </PopupOverlay>
    );

  if (selected == 1)
    return (
      <PopupOverlay>
        <div className="flex flex-col justify-center items-center w-full h-full">
          <div className="absolute flex flex-col bg-magic-1 py-12 px-16 rounded-sm w-fit h-fit ">
            <button
              className="absolute top-2 right-2 bg-bubble-0 p-2 rounded-xl w-fit h-8 flex items-center justify-center"
              onClick={() => setSelected(null)}
            >
              X
            </button>
            <form
              className="flex flex-col items-center"
              onSubmit={(e) => {
                e.preventDefault();
                CreatePostViaForum(e);
              }}
            >
              <label htmlFor="forum" className="mb-2">
                Forum Name
              </label>
              <input name="forum" type="text" className="mb-4" />
              <label htmlFor="name" className="mb-2">
                Post Name
              </label>
              <input name="name" type="text" className="mb-4" />
              <button
                type="submit"
                className="bg-bubble-0 p-4 rounded-xl w-fit h-8 flex items-center justify-center"
              >
                Create!
              </button>
            </form>
          </div>
        </div>
      </PopupOverlay>
    );
}

function CreateForum(e, parent) {
  let name = e.target[0];

  fetch("/api/forums", {
    method: "POST",
    body: JSON.stringify({ name: name.value, parent }),
  })
    .then((res) => res.json())
    .then((res) => {
      name.value = "";
    });
}

function CreatePostViaForum(e) {
  let forum = e.target[0];
  let name = e.target[1];

  console.log(forum);
  console.log(name);

  forum.value = "";
  name.value = "";
}
