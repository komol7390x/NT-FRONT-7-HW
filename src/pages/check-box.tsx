import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export const CheckBox = () => {
    return (
        <div className="flex flex-col gap-6 mt-10">
            <h1 className="text-primary">Checkbox</h1>
            <div className="flex items-center gap-3">
                <Checkbox id="terms" />
                <Label htmlFor="terms">Remember me</Label>
            </div>

            <div className="flex items-start gap-3">
                <Checkbox id="terms-2" defaultChecked />
                <div className="grid gap-2">
                    <Label htmlFor="terms-2">Remember us</Label>
                </div>
            </div>

        </div>
    )
}
