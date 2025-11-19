import { Pluse } from "@/assets/icon/pluse"
import { Button } from "@/components/ui/button"

export const ButtonIcon = () => {
    return (
        <div>
            <h1 className=" text-primary">Button</h1>
            <div className="flex gap-5 text-black">
                <Button className="w-[414px] py-5" >Login</Button >
                <Button className="w-[209px] flex justify-between py-4" >Create new event <Pluse /></Button >
                <Button className="w-[75px]" >Month</Button >
            </div>
        </div>
    )
}
