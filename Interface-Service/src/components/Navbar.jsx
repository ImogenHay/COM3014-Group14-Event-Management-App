export default function Navbar() {
    return (
        <nav className="nav">
            <a href="/" className="ET">
                ET
            </a>

            <ul>
                
                <li>
                    <a href="/Interface-Service/src/pages/Authorise">Login/Sign-up</a>
                </li>

                <li>
                    <a href="/Interface-Service/src/pages/Events">Create Event</a>
                </li>

                <li>
                    <a href="/Interface-Service/src/pages/Tickets">Book Tickets</a>
                </li>

            </ul>
        </nav>

    )        
}