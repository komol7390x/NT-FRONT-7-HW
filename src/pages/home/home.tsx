import { CardLoading } from "@/components/card/card-loading"
import { CreateUser } from "../../components/form/form"
import { useGetUserList } from "./service/query/useGetUserList"
import { BackDrop } from "@/components/back-drop/back-drop"
import { Card } from "@/components/card/card"

export const Home = () => {
  const { data, isLoading } = useGetUserList()
  return (
    <div className="container">
      <CreateUser />
      {isLoading ? (<>
        <CardLoading />
        <BackDrop />
      </>) : <div>

        {data?.map((item) => (
          <Card key={item.id} {...item} />
        ))}
      </div>}
    </div>
  )
}
