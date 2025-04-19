import React, { useContext } from 'react'
import { StoreContext } from '../Context/StoreContext'
function HomePage() {
  const { fetchAllProducts , products} = useContext(StoreContext)
  return (
    <div>
      <button onClick={fetchAllProducts}>Click me</button>
      <p>{JSON.stringify(products)}</p>
    </div>

  )
}

export default HomePage