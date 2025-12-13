import Cookies from "js-cookie"
export const Groups = () => {
    const token = Cookies.get('token')
    console.log(token)
    return (
        <div>Groups</div>
    )
}
