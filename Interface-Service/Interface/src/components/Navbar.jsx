export default function Navbar() {
    return (
        <nav className="nav">
            <a href="/" className="ET">
                ET
            </a>

            <ul>
                
                <li>
                    <a href="/Authorise">Login/Sign-up</a>
                </li>

                <li>
                    <a href="/Events">Create Event</a>
                </li>

                <li>
                    <a href="/Tickets">Book Tickets</a>
                </li>

            </ul>
        </nav>

    )        
}