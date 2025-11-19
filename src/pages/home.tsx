

import { ButtonIcon } from "./button"
import { CheckBox } from "./check-box"
import { GoogleSearch } from "./google-search"
import { InputIcon } from "./input-icon"
import { SwitchIcon } from "./switch"

export const Home = () => {
    return (
        <div className="container ">
            <ButtonIcon />

            <InputIcon />

            <CheckBox />

            <GoogleSearch />

            <SwitchIcon />
        </div>
    )
}
