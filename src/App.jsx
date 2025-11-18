import { Link, Route, Routes } from "react-router"
import { Home } from "./page/home"
import { Cart } from "./page/cart"

function App() {

  return (
    <div>
      <header className="container flex justify-center gap-5 bg-gray-200 py-4 ">
        <Link to={'/'} className="hover:text-white">Home</Link>
        <Link to={'/cart'} className="hover:text-white">Cart</Link>
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>
  )
}

export default App
