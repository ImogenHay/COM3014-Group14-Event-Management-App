import Navbar from "./components/Navbar.jsx"
import Home from "./pages/Home.jsx"
import Authorise from "./pages/Authorise.jsx"
import ManageEvents from "./pages/ManageEvents.jsx"
import Tickets from "./pages/Tickets.jsx"
import About from "./pages/About.jsx"
import {ChakraProvider} from "@chakra-ui/react";
import NewEventForm from "./components/NewEventForm.jsx";

function App() {
    let Pathway
    switch (window.location.pathname) {
        case "/":
            Pathway = Home
            break
        case "/Authorise":
            Pathway = Authorise
            break
        case "/ManageEvents":
            Pathway = ManageEvents
            break
        case "/Tickets":
            Pathway = Tickets
            break
        case "/About":
            Pathway = About
            break
    }

    return (
        <ChakraProvider>
            <Navbar  />
            <div className="container">
                <Pathway  />
            </div>
        </ChakraProvider>
    );
}

export default App 
