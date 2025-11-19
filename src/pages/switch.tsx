import { Switch } from "@/components/ui/switch"

export const SwitchIcon = () => {
    return (
        <div className="mt-10">
            <h1 className="text-primary">Switch</h1>
            <div className="flex items-center space-x-2">
                <Switch className="data-[state=checked]:bg-blue-500" />
            </div>
        </div>
    )
}
