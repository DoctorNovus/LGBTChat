export default function PostThread({ thread }) {
    return (
      <div className="flex flex-row w-full h-[6vh] items-center">
        <div className="w-[4vw] h-full bg-magic-2 mr-2 p-2 rounded-lg">
          
        </div>
        <div className="flex flex-col w-full h-full justify-center">
          <p className="p-0 m-0 h-fit flex items-center text-[18px] break-all">{thread.name}</p>
          <p className="p-0 m-0 h-1/3 flex items-center text-[15px]">
            By: {thread.author}
          </p>
        </div>
      </div>
    );
  }
  