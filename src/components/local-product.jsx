import React from 'react'
import { formatter } from '../config/formater'

export const LocalProduct = (product) => {
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
                    <button className='mt-4 px-5 py-1 rounded-[10px] bg-amber-100 active:bg-amber-300'>Add</button>
                </div>
            </div>
        </div>
    )
}
