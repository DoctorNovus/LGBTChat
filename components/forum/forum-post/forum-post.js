import Image from "next/image";

export default function ForumPost({ icon, title, threadCount, messageCount }){
    return (
        <div className="w-[55vw] h-[10vh] flex flex-row bg-magic-2 items-center rounded-lg">
            <div className="w-[10vw]">
                {icon ? <Image className="invert-icon" src={icon} alt={title} /> : null}
            </div>
            <div className="w-[25vw]">
                <p>{title}</p>
            </div>
            <div className="flex flex-row w-[20vw] justify-evenly">
                <div>
                    <p>{threadCount}</p>
                    <p>Threads</p>
                </div>
                <div>
                    <p>{messageCount}</p>
                    <p>Messages</p>
                </div>
            </div>
        </div>
    )
}