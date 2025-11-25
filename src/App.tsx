import { Route, Routes } from 'react-router-dom'
import { Login } from './pages/auth/login/login'
import { Register } from './pages/auth/login/register'
import { MainLayout } from './layout/main-layout'
import { Statistica } from './pages/admin/statistica/statistica'
import adminPath from './router/admin-router'
import { NotFound } from './pages/not-found'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/app' element={<MainLayout />} >
          <Route path='user' >
            <Route index element={<Statistica />} />
            {adminPath.map(({ page: Page, path }) => (
              <Route key={path} path={path} element={<Page />} />
            ))}
          </Route>
          <Route path='teacher' />
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
