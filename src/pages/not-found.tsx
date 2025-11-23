import img from '../assets/not-found.png'
export const NotFound = () => {
    return (
        <div className="container w-full mx-auto">
            <img src={img} alt="not-found" className='mx-auto' />
        </div>
    )
}
