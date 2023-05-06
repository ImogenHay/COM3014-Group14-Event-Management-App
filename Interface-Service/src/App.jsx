import Navbar from "./components/Navbar.jsx"
import Home from "./pages/Home.jsx"
import SignIn from "./pages/SignIn.jsx"
import SignUp from "./pages/SignUp.jsx"
import ManageEvents from "./pages/ManageEvents.jsx"
import Tickets from "./pages/Tickets.jsx"
import About from "./pages/About.jsx"
import {ChakraProvider} from "@chakra-ui/react";
import { useAuthContext } from './hooks/useAuthContext.jsx'
import {BrowserRouter, Route, Routes} from "react-router-dom";

function Error404Page() {
    return (
        <div className="container">
            <div>Page not found</div>
        </div>
    );
}

function App() {
    const { user } = useAuthContext()

    /**@type React.ReactNode */
    const navbar = user && <Navbar/>;

    const routes = user
        ? <>
            // Routes for a signed-in user.
            <Route path="/" element={<Home />} />
            <Route path="/signIn" element={<Home />} />
            <Route path="/manageEvents" element={<ManageEvents />} />
            <Route path="/tickets" element={<Tickets />} />
            <Route path="/about" element={<About />} />
        </>
        : <>
            // Routes for an unauthenticated user.
            // For every route except signIn, render SignUp. Otherwise,
            // obviously, render SignIn.
            <Route path="/signIn" element={<SignIn />} />
            <Route path="*" element={<SignUp />} />
        </>;

    return <>
        <ChakraProvider>
            <BrowserRouter>
                {navbar}
                <div className="container">
                    <Routes>
                        {routes}

                        {/*404 Route */}
                        <Route path="*" element={<Error404Page/>} />
                    </Routes>
                </div>
            </BrowserRouter>
        </ChakraProvider>
    </>;
}

export default App
