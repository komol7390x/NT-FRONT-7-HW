import { Route, Routes } from "react-router"
import { MainLayout } from "./layout/main-layout"
import { Home } from "./pages/home/home"
import { ProductDetail } from "./pages/product-detail/product-detail"
import { NotFound } from "./pages/not-found"

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="product/:id" element={<ProductDetail />} />
          <Route path={'*'} element={<NotFound />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
