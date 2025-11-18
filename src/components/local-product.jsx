import React from 'react'
import { formatter } from '../config/formater'
import { useDispatch } from 'react-redux'
import { decrementProduct, deleteProduct, incrementProduct } from '../store/reducer/product-reducer'

export const LocalProduct = (product) => {
    const dispatch = useDispatch()
    return (
        <div>
            <div className='border border-gray-100 w-[266px] h-[400px] text-left rounded-2xl shadow-xs'>
                <div className=' mb-[25px] flex justify-center mt-5'>
                    <img src={product.img} alt={product.title} className='w-[150px] h-[200px]' />
                </div>
                <div className='pl-5'>
                    <h3>Brand: {product.title}</h3>
                    <p className='underline-offset-4 underline'>Price: {formatter(product.price)} so'm</p>
                </div>
                <div className='flex justify-center'>
                    <div className='flex gap-3 justify-center items-center'>
                        {product.userCount < 2 ? (
                            <button
                                onClick={() => dispatch(deleteProduct({ id: product.id }))}
                                className='mt-4 px-5 py-1 rounded-[10px] bg-red-300 active:bg-amber-300'
                            >delete</button>) : (<button
                                onClick={() => dispatch(decrementProduct({ id: product.id }))}
                                className='mt-4 px-5 py-1 rounded-[10px] bg-blue-200 active:bg-amber-300'
                            >-</button>)}

                        <span className='mt-4 px-5 py-1 rounded-[10px] bg-green-100'>{product.userCount}</span>
                        <button
                            onClick={() => dispatch(incrementProduct({ id: product.id }))}
                            className='mt-4 px-5 py-1 rounded-[10px] bg-blue-200 active:bg-amber-300'>+</button>
                    </div>
                </div>
            </div>
        </div >
    )
}
