import Link from "next/link";

export default function ErrorPage() {
    return (
        <div className="w-full h-screen justify-center align-center flex flex-col text-center">
            <h1 className="text-7xl mb-4">404 - Not Found</h1>
            <span className="text-xl">You have reached the 404 page! This means that the resource you tried to access is not found.</span>
            <Link href="/">
                <a className="text-xl">Click this to return home!</a>
            </Link>
        </div>
    )
}
