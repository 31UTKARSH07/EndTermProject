import Navbar from "./Components/Navbar"
import { BrowserRouter, Routes,Route } from "react-router-dom"
import { StoreProvider } from "./Context/StoreContext"
import HomePage from "./Components/HomePage"
function App() {

  return (
    <>
      <StoreProvider>
        <BrowserRouter>

          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage></HomePage>}>

            </Route>
          </Routes>
        </BrowserRouter>
      </StoreProvider>
    </>
  )
}
export default App
