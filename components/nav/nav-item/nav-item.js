import Image from "next/image";

export default function NavItem({ src, href, text, logo, reverse, customClickEvent }) {
  let x = "24";

  if (logo) x = "40";

  if (text && text.length > 0)
    return (
      <li className="group relative flex flex-row" onClick={customClickEvent}>
        <a
          href={href}
          className="w-20 h-16 px-6 flex flex justify-center items-center w-full
					focus:text-orange-500 hover:bg-magic-2"
        >
          <Image className="h-5 w-5 invert-icon" width={x} height={x} src={src} />
        </a>

        <div
          className={`group-hover:flex flex-row absolute left-[56px] hidden justify-center h-16 z-999 ${
            reverse ? "scale-x-[-1] translate-x-[-10vw]" : ""
          }`}
        >
          <div className="w-4 m-0 overflow-hidden content-center py-5">
            <div className="h-8 bg-gradient-to-r from-red-300 to-red-300 -rotate-45 transform origin-top-right justify-self-center"></div>
          </div>
          <div className="flex bg-gradient-to-r from-red-300 via-yellow-200 to-blue-300 p-4 text-[#FF00FF] my-2 justify-self-center rounded-md">
            <span className={`self-center ${reverse ? "scale-x-[-1]" : ""}`}>
              {text}
            </span>
          </div>
        </div>
      </li>
    );
  else
    return (
      <li className="group relative flex flex-row">
        <a
          href={href}
          className="w-20 h-16 px-6 flex flex justify-center items-center w-full
              focus:text-orange-500 hover:bg-magic-2"
        >
          <Image className="h-5 w-5 invert-icon" width={x} height={x} src={src} />
        </a>
      </li>
    );
}
