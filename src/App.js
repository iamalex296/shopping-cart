import React, { useState } from 'react'
import data from "./data.json"
import Products from "./components/Products"
import Filter from './components/Filter.js'
import Cart from './components/Cart.js'

const App = () => {

  const [useProducts, setUseProducts] = useState({ 
    products: data.products,
    cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
    size: "",
    sort: ""
  })

  const createOrder = (order) => {
    alert("Need to save order for" + order.name)
  }

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

  const removeFromCart = (product) => {
    const cartItems = useProducts.cartItems.slice()
    setUseProducts({...useProducts, cartItems: cartItems.filter(x => x._id !== product._id)})
    localStorage.setItem("cartItems", JSON.stringify(cartItems.filter(x => x._id !== product._id)))
  }

  const addToCart = (product) => {
    const cartItems = useProducts.cartItems.slice()
    let alreadyInCart = false;

    cartItems.forEach((item) => {
      if(item._id === product._id) {
        item.count++;
        alreadyInCart = true;
      }
    })
    if(!alreadyInCart) {
      cartItems.push({...product, count: 1})
    }
    setUseProducts({...useProducts, cartItems: cartItems})
    localStorage.setItem("cartItems", JSON.stringify(cartItems))
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
            <Products 
              products={useProducts.products} 
              addToCart={addToCart}
            >
            </Products>
          </div>
          <div className="sidebar"> 
            <Cart createOrder={createOrder} cartItems={useProducts.cartItems} removeFromCart={removeFromCart} />
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