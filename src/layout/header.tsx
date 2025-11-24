import React from "react"
import { Link, useLocation } from "react-router"
import { useDebounce } from '@uidotdev/usehooks'
import { useSearch } from "@/service/useSearch"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"

export const Header = () => {
    const [input, setInput] = React.useState('')
    const value = useDebounce(input, 500);
    const { data, isLoading } = useSearch(value)
    const location = useLocation()

    React.useEffect(() => { setInput('') }, [location.pathname])
    return (
        <div className=" bg-amber-300 py-5">
            <div className="container flex justify-between">
                <div className="text-3xl">
                    <Link to={'/'} className="hover:text-white">Home</Link>
                </div>
                <Link to={'/users'} className="hover:text-white text-3xl">Users</Link>
                <div className="w-[400px] relative rounded-[10px]">
                    <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value.trim())}
                        placeholder="Search"
                        className="leading-none text-[18px] py-5 bg-white"
                    />
                    {input ? (<div className=" absolute bg-white rounded-[10px]  w-full p-2.5 shadow top-12 h-10">
                        {isLoading ? (<Spinner className="size-5" />) : (
                            <div>
                                {data?.length ? (
                                    data.map((item) => (
                                        <div key={item.id} className="my-2">
                                            <h2>
                                                <Link to={`/product/${item.id}`}>{item.name}</Link>
                                            </h2>
                                        </div>
                                    ))
                                ) : (
                                    <h2>Not found user</h2>
                                )}
                            </div>
                        )}
                    </div>) : ''}
                </div>
            </div>
        </div>
    )
}
