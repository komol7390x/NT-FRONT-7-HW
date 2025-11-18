import { configureStore, createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";
import product from './reducer/product-reducer'
import { addProduct, summation, incrementProduct, decrementProduct, deleteProduct } from "./reducer/product-reducer";
import { loadState, saveState } from "../config/storage";

const listenerMiddleware = createListenerMiddleware()

listenerMiddleware.startListening({
    matcher: isAnyOf(addProduct, incrementProduct, decrementProduct, deleteProduct),
    effect: (_, listenerApi) => {
        listenerApi.dispatch(summation())
    }
});

export const store = configureStore({
    reducer: {
        product
    },
    preloadedState: {
        product: loadState('product')
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(listenerMiddleware.middleware),
});

store.subscribe(() => {
    saveState('product', store.getState().product)
})