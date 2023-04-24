export default function Navbar() {
    return (
        <nav className="nav">
            <a href="/" className="Home">
                Home
            </a>

            <ul>

                <li>
                    <a href="/Interface-Service/src/pages/Tickets">My Tickets</a>
                </li>

                <li>
                    <a href="/Interface-Service/src/pages/Authorise">Log Out</a>
                </li>

            </ul>
        </nav>

    )        
}