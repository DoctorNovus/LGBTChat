import Image from "next/image";

import avatar from "../../../public/avatar.png";

export default function UserAvatar({ user }){
    if(user)
        return <div></div>;
    else
        return <div className="w-20 h-16 px-6 flex flex justify-center items-center w-full
        focus:text-orange-500 hover:bg-magic-2"><Image className="invert-icon" src={avatar} /></div>
}