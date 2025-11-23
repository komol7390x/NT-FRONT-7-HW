import { Outlet } from "react-router"
import { Header } from "./header"

export const MainLayout = () => {
    return (
        <div >
            <header><Header /></header>
            <main><Outlet /></main>
            <footer className="container bg-amber-300 cursor-pointer flex gap-5 justify-center py-5 text-3xl hover:text-white">Footer</footer>
        </div>
    )
}
