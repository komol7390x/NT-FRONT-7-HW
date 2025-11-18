import React from 'react'
import { useSelector } from 'react-redux'
import { formatter } from '../config/formater'
import { LocalProduct } from '../components/local-product'

export const Cart = () => {
    const { count,
        totalPrice,
        productList } = useSelector((state) => state.product)
    return (
        <div className='container mt-10'>
            <h1 className='text-4xl'>Total Price: {formatter(totalPrice)}</h1>
            <p className='text-3xl'>Count: {count}</p>
            <div className='grid grid-cols-4 gap-5 mt-5'>
                {productList.map((item) => (
                    <div>
                        <LocalProduct key={item.id} {...item} />
                    </div>
                ))}
            </div>
        </div>
    )
}
