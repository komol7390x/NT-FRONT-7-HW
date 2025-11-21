import { Route, Routes } from "react-router"

function App() {

  return (
    <>
      <Routes>
        <Route path="/" />
        <Route path="/task/:id" />
      </Routes>
    </>
  )
}

export default App
