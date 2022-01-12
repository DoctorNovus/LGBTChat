import Image from "next/image";
import Link from "next/link";

export default function ThreadPost({ icon, title, messageCount }){
    return (
        <div className="w-[55vw] h-[10vh] flex flex-row bg-magic-2 items-center rounded-lg">
            <div className="w-[10vw]">
                {icon ? <Image className="invert-icon" src={icon} alt={title} /> : null}
            </div>
            <div className="w-[25vw]">
                <Link href={`/forum/${title.toLowerCase()}`}>
                    <a className="capitalize">{title}</a>
                </Link>
            </div>
            <div className="flex flex-row w-[20vw] justify-evenly">
                <div>
                    <p>{messageCount}</p>
                    <p>Messages</p>
                </div>
            </div>
        </div>
    )
}