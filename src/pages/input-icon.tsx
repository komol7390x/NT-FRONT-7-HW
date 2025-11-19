import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { MailIcon } from "lucide-react"

export const InputIcon = () => {
    return (
        <div>
            <h1 className="mt-10 text-primary ">Input</h1>
            <div className="font-normal text-[#464646] w-[414px]">
                <InputGroup>
                    <InputGroupInput type="email" placeholder="Infor@gmail.com" />
                    <InputGroupAddon>
                        <MailIcon />
                    </InputGroupAddon>
                </InputGroup>
            </div>
        </div>
    )
}
