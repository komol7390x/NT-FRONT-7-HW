import { Card } from "../components/card"
import { Form } from "../components/form"
import { useGetTaskListQuery } from "../store/service/user-api"

export const Home = () => {
    const { data, isLoading } = useGetTaskListQuery('/task')
    return (
        <div className="container">
            <Form />
            {isLoading ? <h3>Loading....</h3> : <>
                {data?.map((item) => (
                    <>
                        <Card key={item.id} {...item} />
                        
                    </>
                ))}
            </>}
        </div>
    )
}
