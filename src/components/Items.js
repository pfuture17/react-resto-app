import { connect } from 'react-redux'
import './Items.css'

const Items = ({item, addToCart, deleteItem}) => {
    return (
        <div className='itemBox'>
            <img className='itemImg' src={item.image} alt={item.name} width={50}/>
            <strong>{item.name}</strong>
            <p><small>₱ {item.price}</small></p>
            <button className='menuBtn' onClick={() => addToCart(item)}> Order </button>
            <span className='x' onClick={() => {  if (window.confirm('Are you sure you wish to delete this item?')){deleteItem(item)}}}> x </span>
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        addToCart: (item) => dispatch({type:'ADD_CART', payload: item}),
        deleteItem:(item) => dispatch({type:'DELETE_ITEM', payload: item})
    }
}

export default connect(null, mapDispatchToProps)(Items)