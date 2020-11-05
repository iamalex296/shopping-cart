import React, { useState } from 'react'
import data from "./data.json"
import Products from "./components/Products"

const App = () => {

  const [products, setProducts] = useState({ 
    products: data.products,
    size: "",
    sort: ""
  })

  return (
    <div className="grid-container">
      <header>
      <a href="/">React Shopping Cart</a>
      </header>
      <main>
        <div className="content">
          <div className="main">
            <Products products={products.products}></Products>
          </div>
          <div className="sidebar"> 
            cart items
          </div>
        </div>
      </main>
      <footer>
        All right is reserved
      </footer>
    </div>
  );
}

export default App;