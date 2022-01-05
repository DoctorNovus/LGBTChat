export default function NavSearch() {
    return (
        <input id="forum-search" onKeyPress={handleKeyPress} className="placeholder:text-center text-center w-60 border-black border-2 border-solid h-8" type="search" placeholder="Search for a forum or post.."/>
    )
}

export function handleKeyPress(e){
    if(e.key == "Enter"){
        console.log("Submit");
        document.querySelector("#forum-search").value = "";
    }
}