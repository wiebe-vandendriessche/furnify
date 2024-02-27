import "./Sidebar.css"
import React, {useState} from "react";
import {FaAnglesRight, FaAnglesLeft} from "react-icons/fa6"
import {IconContext} from "react-icons"
import Questionnaire from "./components/questionnaire";
import Contact from "./components/contact";
function Sidebar(){

    const [sidebar, setSidebar]= useState(true);
    const [part, showPart]=useState(0);
    const showSidebar=()=>{setSidebar(!sidebar);}
    const previousPart=()=>{showPart(part-1)}
    const nextPart=()=>{showPart(part+1)}
    const [state, setState] = useState({
        name: "",
        age: 0,
        hobbies: ["paardrijden", "tango", "vissen"]
    });
    const handleData=(data)=>{setState(data)}
    const showNextPart = () => {
        switch(part) {
            case 0:
                return <Questionnaire nextP={nextPart}/>
            case 1:
                return <Contact nextP={nextPart} previousP={previousPart}/>
            case 2:
                return <p>Nothing to see here</p>
            default:
                return <p>This is some default text</p>
        }
    }
    return (
        <>
            <IconContext.Provider value={{color: "undefined"}}>
                <div className="sidebar">
                    <FaAnglesLeft className="menu-bars-hidden menu-bars" onClick={showSidebar} />
                </div>
                <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
                    <FaAnglesRight className="menu-bars" onClick={showSidebar}/>
                    <div>
                        {showNextPart()}
                        <form>
                            <ol className="nav-menu-items" >

                                <li className="navbar-toggler">test1</li>
                                <li className="navbar-toggler"><input type="text" placeholder="insert text"></input></li>
                            </ol>
                        </form>
                    </div>
                </nav>
            </IconContext.Provider>
            <button className="sideBtn">
                Button
            </button>

        </>
    )
}

export default Sidebar;
