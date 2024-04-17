import "./Sidebar.css"
import { useState } from "react";
import { IconContext } from "react-icons"
import { FaAnglesRight, FaAnglesLeft } from "react-icons/fa6"
import Questionnaire_func from "./components_sidebar/Questionnaire_func.jsx";
import Contact from "./components_sidebar/Contact";
import logo from "../assets/logo_lm.png";
import logo_dm from "../assets/logo_dm.png";
import Questionnaire_space from "./components_sidebar/Questionnaire_space.jsx";
import Questionnaire_specs from "./components_sidebar/Questionnaire_specs.jsx";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { check } from "../algorithm/module_choice.ts";
import { useConfiguratorContext } from "../contexts/ConfiguratorContext.jsx";
import {useContactContext} from "../contexts/ContactContext.jsx"
import {useVariaContext} from "../contexts/VariaContext.jsx"
import jsonp from "jsonp";
import {Form} from "react-bootstrap";



export function Sidebar() {
    const [sidebar, setSidebar] = useState(true);
    const [part, showPart] = useState(0);
    const [stateId, setStateId] = useState(1);
    const value = useConfiguratorContext();
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
    const { contact } = useContactContext();

    const { dimensions,functionalities,specs,obstacles} = useConfiguratorContext();

    const {varia} = useVariaContext();


    const showNextPart = () => {
        switch (part) {
            case 0:
                return <Questionnaire_space stateId={stateId} setStateId={setStateId}/>
            case 1:
                return <Questionnaire_func />
            case 2:
                return <Questionnaire_specs />
            case 3:
                check(value, varia)
                return <Contact/>
            case 4:
                return <p>Nothing to see here</p>
            default:
                return <p>This is some default text</p>
        }
    }



    const onSubmit = e => {
        e.preventDefault();
        let obs = "_";
        Object.entries(obstacles).forEach(([type, items]) => {
            items.forEach((item) => {
                obs += item.id + ". " + item.type;
                switch (item.type) {
                    case 'window':
                        if (item.inside_window === 'yes') {
                            obs += " open on the inside";
                        } else {
                            obs += " open on the outside";
                        }
                        obs += " width:" + item.width + " height:" + item.height;
                        break;
                    case 'door':
                        obs += " open " + item.opening_door;
                        obs += " width:" + item.width + " height:" + item.height;
                        break;
                    default:
                        obs += " width:" + item.width + " length:" + item.obstLength + " height:" + item.height;
                        break;
                }
                if (item.obstacleWall) {
                    obs += " obstacle wall:" + item.obstacleWall;
                }
                if (item.windowWall) {
                    obs += " window wall:" + item.windowWall;
                }
                if (item.windowXpos && item.windowYpos) {
                    obs += " position:" + item.windowXpos + "," + item.windowYpos;
                }
                obs += "\n";
            });
        });

        let dim=""
        Object.entries(dimensions).map(([key, value]) => (
            dim+=key+":"+value+" "
        ));

        let func = "";
        Object.entries(functionalities).forEach(([key, value]) => {
            if (value) {
                func += key+" ";
            }
        });

        let color = specs.color === "#FFFFFF" ? "black" : "white";

        const url = 'https://hotmail.us18.list-manage.com/subscribe/post-json?u=dbf86de75caa0bdaee7da1262&amp;id=18a2dee28f&amp;f_id=00ed11e1f0';
        jsonp(`${url}&EMAIL=${contact.email}&FIRSTNAME=${contact.firstname}&LASTNAME=${contact.lastname}&ADDRESS=${contact.address}
                    &DIMENSIONS=${dim}&ROOM=${varia.room}&FUNCTIONAL=${func}&LAYOUT=${specs.layout}&MATERIAL=${specs.material}
                    &COLOR=${color}&OBSTACLES=${obs}&REQ=${varia.requirements}`, { param: 'c' }, (_, data) => {
            const { msg, result } = data
            console.log(result,msg)
            alert(msg);
        });
    };



    return (
        <>
            <IconContext.Provider value={{ color: "undefined" }}>

                <nav className={sidebar ? "nav-menu active" : "nav-menu"}>

                    <div className="overflow-y">
                        <a id="a" href={"https://www.furnifyhome.eu/"}>
                            <picture>
                                <source srcSet={logo_dm} media="(prefers-color-scheme: dark)" />
                                <img id="logo" src={logo} alt="furnify" />
                            </picture>
                        </a>
                        <Form onSubmit={onSubmit}>
                            {showNextPart()}
                        </Form>

                        <div className="bottom_btn">
                            <button data-testid="btn-nav-sidebar-previous" onClick={previousPart} hidden={showPrevious()}><FaAnglesLeft /></button>
                            <button data-testid="btn-nav-sidebar-next" onClick={nextPart} hidden={showNext()}><FaAnglesRight /></button>
                        </div>

                    </div>
                </nav>
                <div onClick={showSidebar} className="menu-bars">
                    {sidebar ? <AiOutlineClose size={40} /> : <AiOutlineMenu size={40} />}
                </div>

            </IconContext.Provider>
        </>
    )
    }

    export default Sidebar;
