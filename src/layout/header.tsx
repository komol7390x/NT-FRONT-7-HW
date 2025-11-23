import { Link } from "react-router"

export const Header = () => {
    return (
        <div className="container bg-amber-300 flex gap-5 justify-center py-5 text-3xl">
            <Link to={'/'} className="hover:text-white">Home</Link>
            <Link to={'product/:id'} className="hover:text-white">Product</Link>
        </div>
    )
}
