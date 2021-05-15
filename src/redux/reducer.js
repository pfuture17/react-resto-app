import { cloneDeep } from "lodash";
import { v4 as uuidv4 } from 'uuid';



const initialState = {
    items: [
        {
            id: 1,
            name: "Burger", 
            price: 50, 
            category: "Food",
            image: "https://image.flaticon.com/icons/svg/1046/1046784.svg"
        },
        {
          id: 2,
            name: "Pizza", 
            price: 100, 
            category: "Food",
            image: "https://image.flaticon.com/icons/svg/1046/1046771.svg"
        },
        {
            id: 3,
            name: "Fries", 
            price: 25, 
            category: "Food",
            image: "https://image.flaticon.com/icons/svg/1046/1046786.svg"
        },
        {
            id: 4,
            name: "Coffee", 
            price: 35, 
            category: "Drink",
            image: "https://image.flaticon.com/icons/svg/1046/1046785.svg"
        },
        {
          id: 5,
            name: "Iced Tea", 
            price: 45, 
            category: "Drink",
            image: "https://image.flaticon.com/icons/svg/1046/1046782.svg"
        },
        {
            id: 6,
            name: "Hot Tea", 
            price: 45, 
            category: "Drink",
            image: "https://image.flaticon.com/icons/svg/1046/1046792.svg"
        },
      ],
    cart: [],
    total: 0
}



const solveTotal = (cartCopy) => {
    let total = 0;
    cartCopy.map( cartItem => {
      cartItem.subtotal = cartItem.price * cartItem.quantity 
      total += cartItem.subtotal; 
    });
    return total;
}


const reducer = (state = initialState, action) => {
    let cartCopy;
    let item;
    let total;
    switch(action.type) {
        case 'ADD_CART':
            let exist = false;
            item = action.payload
            cartCopy = [...state.cart]
            cartCopy.map(cartItem => {
                if(cartItem.id === item.id) {
                    cartItem.quantity++
                    exist =true;
                }
            })
            if (exist === false) {
                cartCopy.push(item)
                item.quantity = 1;
            }

            total = solveTotal(cartCopy);
        
            return{
                ...state,
                cart: cloneDeep(cartCopy),
                total: total
            }
        case 'ADD_QUANTITY':
            item = action.payload;
            cartCopy = [...state.cart]
            if(cartCopy){
                item.quantity += 1;
            }
            total = solveTotal(cartCopy);
            return {
                ...state,
                cart: cloneDeep(cartCopy),
                total: total
            }
        case 'SUB_QUANTITY':
            item = action.payload;
            cartCopy = [...state.cart]
            if(cartCopy){
                item.quantity--;
            }
            if(item.quantity === 0) {
                cartCopy = cartCopy.filter( cartItem => {
                    return (cartItem.id !== item.id)
                })
            }

            total = solveTotal(cartCopy);
            return {
                ...state,
                cart: cloneDeep(cartCopy),
                total: total
            }
        case 'ADD_NEW_ITEM':
            console.log(action.payload.category);
            cartCopy = [...state.items];
            cartCopy.push({
                name: action.payload.name,
                price: action.payload.price,
                category: action.payload.category,
                image: action.payload.image,
                id: uuidv4()
            })
            return {
                ...state,
                items: cloneDeep(cartCopy),
            }
        case 'DELETE_ITEM':
            let itemsCopy = [...state.items];
            itemsCopy = itemsCopy.filter( item => {
                return item.id !== action.payload.id
            })
            return {
                ...state,
                items:itemsCopy
            }
        default:
            return state;
    }
}

export default reducer