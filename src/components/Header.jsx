import Nav from "./Header/Nav"
import MailList from "./Header/MailList"

export default function Header({pages}) {
    return (
        <div className="w-full">
            <Nav pages={pages}/>
            <MailList />
        </div>
    )
}