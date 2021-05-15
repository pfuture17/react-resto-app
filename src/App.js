import { connect } from 'react-redux'
import { useState } from 'react';
import Items from './components/Items'
import Cart from './components/Cart';
import Form from './components/Form'
import './App.css'


const App = ({ items, cart, total }) => {
  const [selectedCategory, setNewSelectedCategory] = useState('');

  const selectedCategoryChangeHandler = (e) => {
    setNewSelectedCategory(e.target.value)
  }

  return (
      <div className="App">
        <div className="app-container">
          <header>
            <h2>RESTAURANT APP</h2>
          </header>
          <div className="container">
            <div className="form-container">
              <Form/>
            </div>
            <div className="body">
              <div className="menu">
                <h3>Our Menu</h3>
                <select onChange={selectedCategoryChangeHandler} >
                  <option value="">Select Category</option>
                  <option value="All">All</option>
                  <option value="Food">Foods</option>
                  <option value="Drink">Drinks</option>
                  <option value="Dessert">Desserts</option>
                </select>
                <div className="items">
                  {
                    items.map ( item => {
                      if(item.category === selectedCategory || selectedCategory === 'All') {
                        return <Items item={item}/>
                      }
                    })
                  }
                </div>
              </div>
              <div className="cart">
                <h3>Cart</h3>
                {
                  cart.map (item => {
                    return <Cart item={item}/>
                  })
                }
                <h3>TOTAL: ₱{total}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

const mapStateToProps = state => {
  return {
    items: state.items,
    cart: state.cart,
    total: state.total
  }
}

export default connect (mapStateToProps)(App)
