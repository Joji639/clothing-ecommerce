import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name:"cart",
    initialState:{
        cart:[
        // {
        //   "img": "https://image.hm.com/assets/hm/d3/63/d36320514a35147049affdc66559ae97509585e7.jpg?imwidth=1536",
        //   "title": "Loose Fit Zip-through hoodie",
        //   "category": "men",
        //   "id": "35",
        //   "price": 494,
        //   "BestSeller": "true",
        //   "quantity": 1
        // },
        // {
        //   "img": "https://image.hm.com/assets/hm/bc/43/bc4346e675ae9f49feba378ea203b56e05be63cb.jpg?imwidth=1536",
        //   "title": "Relaxed Fit Shirt",
        //   "category": "men",
        //   "id": "18",
        //   "price": 582,
        //   "BestSeller": "true",
        //   "quantity": 1
        // }
      ]
    },
    reducers:{
        addToCart:(state,action)=>{state.cart.push(action.payload)},
        removeFromCart:(state,action)=>{state.cart. filter((a)=>a.id!==action.payload)},
        incrementQuantity:(state,action)=>{state.cart.find(a=>a.id===action.payload?{...a,quantity:(Number(a.quantity)||1)+1}:a)},
        decrementQuantity:(state,action)=>{state.cart.find((a)=>a.id===action.payload?{...a,quantity:(Number(a.quantity))-1}:a)},
    
    }
})
export const {addToCart,removeFromCart,incrementQuantity,decrementQuantity}=cartSlice.actions
export default cartSlice.reducer