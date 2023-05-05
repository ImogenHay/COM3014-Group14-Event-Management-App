import Navbar from "./components/Navbar.jsx"
import Home from "./pages/Home.jsx"
import SignIn from "./pages/SignIn.jsx"
import SignUp from "./pages/SignUp.jsx"
import ManageEvents from "./pages/ManageEvents.jsx"
import Tickets from "./pages/Tickets.jsx"
import About from "./pages/About.jsx"
import {ChakraProvider} from "@chakra-ui/react";
import NewEventForm from "./components/NewEventForm.jsx";
import { useAuthContext } from './hooks/useAuthContext.jsx'


function App() {
    const { user } = useAuthContext()
    let Pathway
    if (user) {
        switch (window.location.pathname) {
            case "/":
                Pathway = Home
                break
            case "/SignIn":
                Pathway = Home
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
    } else {
            switch (window.location.pathname) {
                case "/":
                    Pathway = SignUp
                    break
                case "/SignIn":
                    Pathway = SignIn
                    break
                case "/ManageEvents":
                    Pathway = SignUp
                    break
                case "/Tickets":
                    Pathway = SignUp
                    break
                case "/About":
                    Pathway = SignUp
                    break
            }
    }

    return (
        <ChakraProvider>
            {user && <Navbar />}
            <div className="container">
                {Pathway ? <Pathway /> : <div>Page not found</div>}
            </div>
        </ChakraProvider>
    );
}

export default App 
