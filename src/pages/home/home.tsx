import { CardLoading } from "@/components/card/card-loading"
import { CreateUser } from "../../components/form/form"
import { useGetUserList } from "./service/query/useGetUserList"
import { BackDrop } from "@/components/back-drop/back-drop"
import { Card } from "@/components/card/card"
import { Button } from "@/components/ui/button"
import { useSearchParams } from "react-router"

export const Home = () => {
  const [searchParam, setSearchParams] = useSearchParams()
  const page = Number(searchParam.get('page') || 1)
  const { data, isLoading } = useGetUserList(page)
  const button = Array(data?.pageSize || 1).fill(null)

  return (
    <div className="container my-5">
      <CreateUser />
      {isLoading ? (<>
        <CardLoading />
        <BackDrop />
      </>) : <div>

        {/* --------------------CARD-------------------- */}
        {data?.data?.map((item) => (
          <Card key={item.id} {...item} />
        ))}
      </div>}

      {/* pagenation button */}
      <div className="flex justify-center gap-3">
        {button.map((_, index) => (
          <Button key={index}
            onClick={() => setSearchParams({ page: `${index + 1}` })}
            className={` cursor-pointer hover:bg-blue-200 ${index + 1 === page ? 'bg-amber-200' : ''}`}
            size={'icon'}
          >
            <div className="text-gray-100">{index + 1}</div>
          </Button>
        ))}
      </div>
    </div>
  )
}
