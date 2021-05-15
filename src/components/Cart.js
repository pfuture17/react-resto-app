import { connect } from 'react-redux'
import './Cart.css'


const Cart = ({item, addQuantity, subQuantity}) => {

    return (
        <div className="cartBox">
            <img className='cartImg' src={item.image} alt={item.name} width={100}/>
            <strong>{item.name}</strong>
            <p><small>₱ {item.price}</small></p>
            <div className="buttons">
                <button className='cartBtn' onClick={()=>{subQuantity(item)}}> - </button><small>Qty: {item.quantity}</small><button className='cartBtn' onClick={()=>{addQuantity(item)}}>+</button>
            </div>
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        addQuantity : (item) => dispatch({type:'ADD_QUANTITY', payload: item}),
        subQuantity : (item) => dispatch({type:'SUB_QUANTITY', payload: item})
    }
}

export default connect(null, mapDispatchToProps)(Cart)
