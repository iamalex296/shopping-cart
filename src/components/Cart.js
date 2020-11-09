import React, { useState } from "react"

import formatCurrency from "../util"

const Cart = (props) => {
  const {cartItems} = props
  const [checkoutState, setCheckoutState] = useState({
    name: "",
    email: "",
    adress: "",
    showCheckout: false
  })

  const handleInput = (e) => {
    setCheckoutState({
      ...checkoutState,
      [e.target.name] : [e.target.value]
    })
  }

  const createOrder = (e) => {
    e.preventDefault()
    const order = {
      name: checkoutState.name,
      email: checkoutState.email,
      adress: checkoutState.adress,
      cartItems: props.cartItems
    }
    props.createOrder(order)
  }

  return(
    <div>
      {cartItems.length === 0 
        ? (
            <div className="cart cart-header">Cart is empty</div>
      ) : (
            <div 
              className="cart cart-header"
            >
                You have {cartItems.length} in the cart {" "}
            </div>
      )}
      <div>
        <div className="cart">
          <ul className="cart-items">
            {cartItems.map(item => (
              <li key={item._id}>
                <div>
                  <img src={item.image} alt={item.title} />
                </div>
                <div>
                  <div>{item.title}</div>
                  <div className="right">
                    {formatCurrency(item.price)} x {item.count} {" "}
                    <button 
                      onClick={() => props.removeFromCart(item)}
                      className="button"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
            {cartItems.length !==0 && (
              <div>
                <div className="cart">
                  <div className="total">
                    <div>
                      Total: {" "}
                      {formatCurrency(cartItems.reduce((a, c) => a + c.price * c.count, 0))}
                    </div>
                    <button 
                      className="button primary"
                      onClick={() => setCheckoutState({...checkoutState, showCheckout: true})}
                    >
                      Proceed
                    </button>
                  </div>
                </div>
                {checkoutState.showCheckout && (
                  <div className="cart">
                    <form onSubmit={createOrder}>
                      <ul className="form-container">
                        <li>
                          <label>Email</label>
                          <input
                            name="email"
                            type="email"
                            required
                            onChange={handleInput}
                          ></input>
                        </li>
                        <li>
                          <label>Name</label>
                          <input
                            name="name"
                            type="text"
                            required
                            onChange={handleInput}
                          ></input>
                        </li>
                        <li>
                          <label>Adress</label>
                          <input
                            name="adress"
                            type="text"
                            required
                            onChange={handleInput}
                          ></input>
                        </li>
                        <li>
                          <button
                            type="submit"
                            class="button primary"
                          >
                            Checkout
                          </button>
                        </li>
                      </ul>
                    </form>
                  </div>
                )}
              </div>
            )}
      </div>
    </div>
  )
}

export default Cart;