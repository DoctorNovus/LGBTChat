export default function PopupOverlay({ children }) {
  return (
    <div className="w-screen h-screen absolute flex z-[999] t-[0px] l-[0px]">
        <div className="w-full h-full absolute flex blur-sm z-[0] t-[0px] l-[0px] bg-blurry"></div>
        <div className="w-full h-full z-[1]">{children}</div>
    </div>
  );
}
