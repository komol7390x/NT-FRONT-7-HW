import { Google } from "@/assets/icon/google"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"

export const GoogleSearch = () => {
    return (
        <div className="mt-10 w-[414px] font-normal">
            <h1 className="text-primary">Google search</h1>
            <InputGroup>
                <InputGroupInput type="text" placeholder="Login with Google" className="placeholder:text-center " />
                <InputGroupAddon>
                    <Google />
                </InputGroupAddon>
            </InputGroup>
        </div>
    )
}
