import Nav from "./Header/Nav"

export default function Header({pages}) {
    return (
        <div className="w-full">
            <Nav pages={pages}/>
        </div>
    )
}