import Navbar from "./Components/Navbar"
import { BrowserRouter } from "react-router-dom"
import ProductType from "./Components/ProductType"
function App() {

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <ProductType/>
      </BrowserRouter>

    </>
  )
}
export default App
