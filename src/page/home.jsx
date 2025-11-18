import { useEffect, useState } from 'react'
import { ProductCard } from '../components/product-card';

export const Home = () => {
    const [product, setProduct] = useState([]);
    useEffect(() => {
        fetch('https://market-backend-zeta.vercel.app/phones')
            .then((res) => res.json())
            .then((data) => setProduct(data))
    }, [])

    return (
        <div className='container'>
            <div className='grid grid-cols-4 gap-2 mt-10'>
                {product.map((item) => (
                    <div>
                        <ProductCard {...item} key={item.id} />
                    </div>
                ))}
            </div>
        </div>
    )
}
