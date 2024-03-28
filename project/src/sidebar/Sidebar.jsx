import "./Sidebar.css"
import {useState} from "react";
import {IconContext} from "react-icons"
import {FaAnglesRight, FaAnglesLeft} from "react-icons/fa6"
import Questionnaire_func from "./components_sidebar/questionnaire_func.jsx";
import Contact from "./components_sidebar/contact";
import logo from "../assets/logo_lm.png";
import logo_dm from "../assets/logo_dm.png";
import Questionnaire_space from "./components_sidebar/questionnaire_space";
import Questionnaire_specs from "./components_sidebar/questionnaire_specs";
import {AiOutlineClose, AiOutlineMenu} from "react-icons/ai";
import { check } from "../algorithm/module_choice.ts";

function Sidebar() {
    const [sidebar, setSidebar] = useState(true);
    const [part, showPart] = useState(0);
    const showSidebar = () => {
        setSidebar(!sidebar);
    }
    const previousPart = () => {
        showPart(part - 1)
    }
    const nextPart = () => {
        showPart(part + 1)
    }
    const showPrevious = () => {
        return part == 0;
    }
    const showNext = () => {
        return part == 3;
    }

    const showNextPart = () => {
        switch (part) {
            case 0:
                return <Questionnaire_space/>
            case 1:
                return <Questionnaire_func/>
            case 2:
                return <Questionnaire_specs/>
            case 3:
                check()
                return <Contact/>
            case 4:
                return <p>Nothing to see here</p>
            default:
                return <p>This is some default text</p>
        }
    }

    return (
        <>
            <IconContext.Provider value={{color: "undefined"}}>

                <nav className={sidebar ? "nav-menu active" : "nav-menu"}>

                    <div className="overflow-auto">
                        <a id="a" href={"https://www.furnifyhome.eu/"}>
                            <picture>
                                <source srcSet={logo_dm} media="(prefers-color-scheme: dark)"/>
                                <img id="logo" src={logo} alt="furnify"/>
                            </picture>
                        </a>
                        {showNextPart()}
                        <div className="bottom_btn">
                            <button onClick={previousPart} hidden={showPrevious()}><FaAnglesLeft/></button>
                            <button onClick={nextPart} hidden={showNext()}><FaAnglesRight/></button>
                        </div>

                    </div>
                </nav>
                <div onClick={showSidebar} className="menu-bars">
                    {sidebar ? <AiOutlineClose size={25}/> : <AiOutlineMenu size={25}/>}
                </div>
            </IconContext.Provider>
        </>
    )
}

export default Sidebar;
