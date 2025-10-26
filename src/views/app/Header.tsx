import { Link } from "react-router-dom"

export const Header = () => {
    return (
        <div className="dpF jcSE">
            {/* <div>Home</div>
            <div>Juego1</div> */}
            {/* <a href="/juego1">Juego1</a>
            <a href="/home">Home</a> */}
            <Link to='/home'>Home</Link>
            <Link to='/juego1'>Juego1</Link>



        </div>

    )
}