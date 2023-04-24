import Navbar from "./components/Navbar.jsx"
import Home from "./pages/Home.jsx"
import Authorise from "./pages/Authorise.jsx"
import CreateEvent from "./pages/CreateEvent.jsx"
import Tickets from "./pages/Tickets.jsx"


function App()  {
    let Pathway
    switch (window.location.pathname) {
        case "/":
            Pathway = Home
            break
        case "/Authorise":
            Pathway = Authorise
            break
        case "/CreateEvent":
            Pathway = CreateEvent
            break
        case "/Tickets":
            Pathway = Tickets
            break
    }
    return (
        <>
            <Navbar  />
            <div className="container">
            <Pathway  />
            </div>
            
        </>
    
    )   
}

export default App 
