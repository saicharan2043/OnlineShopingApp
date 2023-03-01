import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  removeCartItem = id => {
    this.setState(privews => ({
      cartList: [...privews.cartList.filter(echValue => echValue.id !== id)],
    }))
  }

  incrementCartItemQuantity = id => {
    this.setState(previws => ({
      cartList: [
        ...previws.cartList.map(echValue => {
          if (echValue.id === id) {
            return {...echValue, quantity: parseInt(echValue.quantity) + 1}
          }
          return echValue
        }),
      ],
    }))
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    const updateList = [
      ...cartList.map(echValue => {
        if (echValue.id === id) {
          return {...echValue, quantity: parseInt(echValue.quantity) - 1}
        }
        return echValue
      }),
    ]
    // console.log(updateList)

    this.setState({
      cartList: [...updateList.filter(echValue => echValue.quantity !== 0)],
    })
  }

  addCartItem = product => {
    //   TODO: Update the code here to implement addCartItem

    const {cartList} = this.state
    let checkValue
    cartList.forEach(echvalue => {
      if (echvalue.id === product.id) {
        checkValue = true
      }
    })
    // cartList.map(echValue => {
    //   if (echValue.id === product.id) {
    //     checkValue = true
    //     return echValue
    //   }
    //   return echValue
    // })

    if (checkValue === undefined) {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    } else {
      this.setState(prevState => ({
        cartList: [
          ...prevState.cartList.map(echValue => {
            if (echValue.id === product.id) {
              return {...echValue, quantity: parseInt(echValue.quantity) + 1}
            }
            return echValue
          }),
        ],
      }))
    }
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  render() {
    const {cartList} = this.state
    const objectShiva = {
      name: 'sai',
    }
    console.log(cartList)

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          removeAllCartItems: this.removeAllCartItems,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
