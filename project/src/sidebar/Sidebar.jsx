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
import {Form} from "react-bootstrap";
import jsonp from "jsonp";
import {useContactContext} from "../contexts/ContactContext.jsx"
import {useConfiguratorContext} from "../contexts/ConfiguratorContext.jsx"
import {useVariaContext} from "../contexts/VariaContext.jsx"



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
    const { contact } = useContactContext();

    const { dimensions,functionalities,specs,obstacles} = useConfiguratorContext();

    const {varia} = useVariaContext();


    const showNextPart = () => {
        switch (part) {
            case 0:
                return <Questionnaire_space/>
            case 1:
                return <Questionnaire_func/>
            case 2:
                return <Questionnaire_specs/>
            case 3:
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
        Object.entries(obstacles).forEach((obstacle) => {
            // eslint-disable-next-line no-unused-vars
            const [key,value] = obstacle;
            obs += value.id + ". " + value.type;
            switch (value.type) {
                case 'Window':
                    if (value.window) {
                        obs += " open on the inside";
                    } else {
                        obs += " open on the outside";
                    }
                    break;
                case 'Door':
                    obs+= " open "+ value.door
                    break;
                default:
                    // Handle default case if needed
                    break;
            }
            obs += " height:" + value.height + " length:" + value.obstLength + " width:" + value.width + "\n";
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
            <IconContext.Provider value={{color: "undefined"}}>

                <nav className={sidebar ? "nav-menu active" : "nav-menu"}>

                    <div className="overflow-y">
                        <a id="a" href={"https://www.furnifyhome.eu/"}>
                            <picture>
                                <source srcSet={logo_dm} media="(prefers-color-scheme: dark)"/>
                                <img id="logo" src={logo} alt="furnify"/>
                            </picture>
                        </a>
                        <Form onSubmit={onSubmit}>
                            {showNextPart()}
                        </Form>
                        <div className={"bottom_btn"}>
                            <button onClick={previousPart} hidden={showPrevious()}><FaAnglesLeft/></button>
                            <button onClick={nextPart} hidden={showNext()}><FaAnglesRight/></button>
                        </div>
                    </div>
                </nav>
                <div onClick={showSidebar} className="menu-bars">
                    {sidebar ? <AiOutlineClose size={40}/> : <AiOutlineMenu size={40}/>}
                </div>
            </IconContext.Provider>
        </>
    )
}

export default Sidebar;
