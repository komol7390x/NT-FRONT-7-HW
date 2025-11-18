import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    count: 0,
    totalPrice: 0,
    productList: []
}

const product = createSlice({
    initialState,
    name: 'product',
    reducers: {
        // ----------ADD PRODUCT ----------
        addProduct: (state, action) => {
            const idf = state.productList.find(
                (item) => item.id == action.payload.id
            );
            if (!idf) {
                return {
                    ...state,
                    count: state.count + 1,
                    productList: [
                        ...state.productList,
                        {
                            ...action.payload,
                            userCount: 1,
                            userPrice: action.payload.price
                        }
                    ]
                }
            }

            return state
        },

        // ---------- INCREMENT PRODUCT ----------
        incrementProduct: (state, action) => {
            return {
                ...state,
                productList: state.productList.map((item) => item.id == action.payload.id ?
                    {
                        ...item,
                        userCount: item.userCount + 1,
                        userPrice: item.price * (item.userCount + 1)
                    } : item
                )
            }
        },

        // ---------- DECREMENT PRODUCT ----------
        decrementProduct: (state, action) => {
            return {
                ...state,
                productList: state.productList.map((item) => item.id == action.payload.id ?
                    {
                        ...item,
                        userCount: item.userCount - 1,
                        userPrice: item.price * (item.userCount - 1)
                    } : item
                )
            }
        },

        // ---------- DELETE PRODUCT ----------
        deleteProduct: (state, action) => {
            return {
                ...state,
                count: state.count - 1,
                productList: state.productList.filter((item) => item.id != action.payload.id)
            }
        },

        // ---------- SUMMATION PRODUCT ----------
        summation: (state) => {
            return {
                ...state,
                totalPrice: state.productList.reduce(
                    (a, item) => a + item.userPrice,
                    0
                ),
            };
        }
    }

})

export default product.reducer

export const {
    addProduct,
    incrementProduct,
    decrementProduct,
    deleteProduct,
    summation

} = product.actions