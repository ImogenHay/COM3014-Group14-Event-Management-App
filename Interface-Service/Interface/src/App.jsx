import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Authorise from "./pages/Authorise"
import Events from "./pages/Events"
import Tickets from "./pages/Tickets"


function App()  {
    let Pathway
    switch (window.location.pathname) {
        case "/":
            Pathway = Home
            break
        case "/Authorise":
            Pathway = Authorise
            break
        case "/Events":
            Pathway = Events
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
