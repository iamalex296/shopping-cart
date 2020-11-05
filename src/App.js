import React, { useState } from 'react'
import data from "./data.json"
import Products from "./components/Products"
import Filter from './components/Filter.js'

const App = () => {

  const [useProducts, setUseProducts] = useState({ 
    products: data.products,
    size: "",
    sort: ""
  })

  const filterProducts = (event) => {
    // console.log(event.target.value)
    if(event.target.value === "") {
      setUseProducts({
        ...useProducts, 
        size: event.target.value, 
        products: useProducts.products})
    }
    else {
      setUseProducts({
        ...useProducts,
        size: event.target.value,
        products: data.products.filter((product) => product.availableSizes.indexOf(event.target.value) >= 0)
      })
    } 
  }

  const sortProducts = (event) => {
    // console.log(event.target.value)

    const sort = event.target.value

    setUseProducts((useProducts) => ({
      ...useProducts,
      sort: sort,
      products: useProducts.products.slice().sort((a,b) => (
        sort === "lowest" ?
        ((a.price > b.price) ? 1 : -1) :
        sort === "highest" ? 
        ((a.price < b.price) ? 1 : -1) :
        ((a._id < b._id) ? 1: -1)
      ))
    }))

  }

  return (
    <div className="grid-container">
      <header>
      <a href="/">React Shopping Cart</a>
      </header>
      <main>
        <div className="content">
          <div className="main">
            <Filter 
              count={useProducts.products.length} 
              size={useProducts.size}
              sort={useProducts.sort}
              filterProducts={filterProducts}
              sortProducts={sortProducts}
            />
            <Products products={useProducts.products}></Products>
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