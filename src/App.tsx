import { Route, Routes } from "react-router-dom"
import { Login } from "./pages/auth/login"
import { Register } from "./pages/auth/register"
import { MainLayout } from "./layout/main-layout"
import { Statistic } from "./pages/admin/statistic/statistic"
import adminRouter from './router/admin.router'
import teacherRouter from './router/teacher.router'
function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/app" element={<MainLayout />}>

          <Route path="admin">
            <Route index element={<Statistic />} />
            {adminRouter.map(({ page: Page, path }) => (
              <Route path={path} element={<Page />} key={path} />
            ))}
          </Route>

          <Route path="teacher">
            {teacherRouter.map(({ page: Page, path }) => (
              <Route path={path} element={<Page />} key={path} />
            ))}
          </Route>
        </Route>
        <Route path="*" element={'404 not found'} />
      </Routes >
    </>
  )
}

export default App
