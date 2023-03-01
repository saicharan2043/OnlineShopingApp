// Write your code here
import CartContext from '../../context/CartContext'

import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      const data = cartList.map(
        echValue => parseInt(echValue.price) * parseInt(echValue.quantity),
      )
      let sum = 0
      data.forEach(item => {
        sum += item
      })
      const count = cartList.length

      return (
        <div className="container-total">
          <h1 className="total-order-text">
            Order Total: <span className="span">Rs {sum}/-</span>
          </h1>
          <p className="paragraph">{count} items in cart</p>
          <button className="button-checkout">Checkout</button>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
