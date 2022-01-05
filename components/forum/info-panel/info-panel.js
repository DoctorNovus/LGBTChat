import Image from "next/image";
import user from "../../../public/user.png";

export default function InfoPanel({ title, description }) {
  return (
    <div className="flex flex-row w-full h-[3rem] items-center">
      <div className="w-[3.5rem] h-full bg-gray-100 mr-2 p-2 rounded-lg">
        <Image src={user} layout="responsive" />
      </div>
      <div className="flex flex-col w-full h-full justify-center">
        <p className="p-0 m-0 h-1/2 flex items-center text-[24px]">{title}</p>
        <p className="p-0 m-0 h-1/3 flex items-center text-[12px]">{description}</p>
      </div>
    </div>
  );
}
