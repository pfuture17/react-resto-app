import React from 'react'
import { useState } from 'react'
import { connect } from 'react-redux'
import './Forms.css'


const Form = ({ addNewItem }) => {
    const [errorMessage, setNewErrorMessage] = useState('')
    const [itemName, setNewItemName] = useState('')
    const [itemPrice, setNewItemPrice] = useState('')
    const [itemCategory, setNewItemCategory] = useState('')
    const [itemImage, setNewItemImage] = useState('')

    const itemNameChangeHandler = (e) => {
        setNewItemName(e.target.value)
    }
    const itemPriceChangeHandler = (e) => {
        setNewItemPrice(e.target.value)
    }
    const itemCategoryChangeHandler = (e) => {
        setNewItemCategory(e.target.value)
    }
    const itemImageChangeHandler = (e) => {
        setNewItemImage(e.target.value)
    }

    const test = () => {
        if(itemName === '' || itemPrice === '' || itemImage === ''){
            setNewErrorMessage('ERROR! fields cannot be blank!')
        } else if(itemCategory === '') {
            setNewErrorMessage('ERROR! Please select a category!')
        } else {
            addNewItem(itemName,itemPrice,itemCategory,itemImage);  
            setNewErrorMessage('');
            setNewItemName('');
            setNewItemImage('');
            setNewItemPrice('');
        }
    }
   
    return (
        <div className="form">
            <form>
                <span className='error'>
                    {errorMessage} <br />
                </span>
                <span>Name:</span> <input value= {itemName}
                             type="text"
                             onChange={itemNameChangeHandler}
                             placeholder="Enter Name"/> <br/>

                <span>Price:</span> <input type="number"
                              value={itemPrice}
                              onChange={itemPriceChangeHandler}
                              placeholder="Enter Price"/> <br/>
                category: <select onChange={itemCategoryChangeHandler}> 
                        <option value=''>Select Category</option>
                        <option value="Food">Food</option>
                        <option value="Drink">Drink</option>
                        <option value="Dessert">Dessert</option>
                </select><br/>
                <span>Image:</span> <input type="url"
                              value={itemImage}
                              onChange={itemImageChangeHandler}
                              placeholder="Image url"/><br/>
                <button className='submitBtn' type="button" onClick={test}>Add Item</button>
            </form>
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        addNewItem: (itemName,itemPrice,itemCategory,itemImage) => dispatch({type:'ADD_NEW_ITEM', payload: {name: itemName, price: itemPrice, category: itemCategory, image: itemImage}}),
    }
}

export default connect(null, mapDispatchToProps)(Form)