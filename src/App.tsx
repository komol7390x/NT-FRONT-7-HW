import { Route, Routes } from "react-router-dom"
import { Login } from "./pages/auth/login"
import { Register } from "./pages/auth/register"
import { MainLayout } from "./layout/main-layout"
import { Statistic } from "./pages/admin/statistic/statistic"

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/app" element={<MainLayout />}>
          <Route path="admin">

          </Route>
          <Route index element={<Statistic />} />
          <Route path="teacher">

          </Route>
        </Route>
      </Routes >
    </>
  )
}

export default App
