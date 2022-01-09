import InfoPanel from "../info-panel/info-panel";

export default function StaffOnline({ staff = [] }){
    return (
        <div className="ml-auto mr-4 w-[20vw] h-fit">
            <p className="text-[20px] mb-2">Staff Online</p>
            {staff.map((m, index) => <InfoPanel key={index} title={m.name} description={m.role}/>)}
            <hr className="bg-gray-200 h-[2px] border-none my-8"></hr>
        </div>
    )
}