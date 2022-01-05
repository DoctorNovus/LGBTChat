import InfoPanel from "../info-panel/info-panel";

export default function StaffOnline({ staff = [] }){
    return (
        <div className="ml-auto mr-4 w-[21rem] h-[15rem]">
            <p className="text-[20px] mb-2">Staff Online</p>
            {staff.map((m, index) => <InfoPanel key={index} title={m.name} description={m.role}/>)}
        </div>
    )
}