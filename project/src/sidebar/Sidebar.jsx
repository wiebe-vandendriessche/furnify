import "./Sidebar.css"
import {useEffect, useState} from "react";
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
import{useRoomWallLightupContext} from "../contexts/RoomWallLightupContext.jsx"
import {useModuleContext} from "../contexts/ModuleContext.jsx"
import jsonp from "jsonp";
import {Form} from "react-bootstrap";
import Q1 from "./components_sidebar/Q1.jsx";
import axios from "axios";
import {useParams} from "react-router-dom";
import Questionnaire_module from "./components_sidebar/Questionnaire_module.jsx";



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
        return part == 5;
    }


    const { contact,setContact } = useContactContext();

    const { dimensions,functionalities,specs,obstacles,setDimensions,setFunctionalities,setSpecs,setObstacles,
        rectangular,setRectangular,rotationIndex,setRotationIndex,skyboxPath,setSkyboxPath} = useConfiguratorContext();

    const {varia,setVaria} = useVariaContext();

    const {selectedWall,setSelectedWall} = useRoomWallLightupContext();

    const {errors, setErrors, possible_modules, setPossileModules, chosen_module, setChosenModule} = useModuleContext();

    const  superContext = {
        contact: useContactContext().contact,
        dimensions: useConfiguratorContext().dimensions,
        functionalities: useConfiguratorContext().functionalities,
        specs: useConfiguratorContext().specs,
        obstacles: useConfiguratorContext().obstacles,
        rectangular: useConfiguratorContext().rectangular,
        skyboxPath: useConfiguratorContext().skyboxPath,
        varia: useVariaContext().varia,
        selectedWall: useRoomWallLightupContext().selectedWall,
        errors: useModuleContext().errors,
        possible_modules:useModuleContext().possible_modules,
        chosen_module: useModuleContext().chosen_module
    };

    const updateContactFromResponse = (response) => {

        const { firstname, lastname, email, phone_number, address } = response.contact;


        setContact(prevContact => ({
            ...prevContact,
            firstname: firstname,
            lastname: lastname,
            email: email,
            phone_number: {
                ...prevContact.phone_number,
                number: phone_number.number,
                country: phone_number.country
            },
            address: address
        }));
    };
    const updateSelectedWallFromResponse = (response) => {
        const selectedWallValue = response.selectedWall;

        setSelectedWall(selectedWallValue);
    };
    const updateVariaFromResponse = (response) => {

        const { requirements, mattress, room, size } = response.varia;


        setVaria(prevVaria => ({
            ...prevVaria,
            requirements: requirements,
            mattress: mattress,
            room: room,
            size: size
        }));
    };
    const updateConfiguratorFromResponse = (response) =>{
        const { length, width, height } = response.dimensions;

        setDimensions({
            length: length,
            width: width,
            height: height
        });

        const { bed, sofa, office_space, storage_space } = response.functionalities;

        setFunctionalities({
            bed: bed,
            sofa: sofa,
            office_space: office_space,
            storage_space: storage_space
        });

        const { color, material, layout } = response.specs;

        setSpecs({
            color: color,
            material: material,
            layout: layout
        });

        const { door, window, other, walloutlet, switch: switchData, light} = response.obstacles;

        setObstacles({
            door: door,
            window: window,
            walloutlet: walloutlet,
            switch: switchData,
            other: other,
            light: light
        });

        setSkyboxPath(response.skyboxPath);

        setRectangular(response.rectangular);

    }

    const updateModuleFromResponse = (response) =>{
        const { softer, demands, roomSize, points2D } = response.errors;

        setErrors({
            softer: softer,
            demands: demands,
            roomSize: roomSize,
            points2D: points2D
        });

        setPossileModules(response.possible_modules);

        const { name, height, width, depth, open, closed, saved, bed, sofa, desk, storage, width_options, components } = response.chosen_module;
        setChosenModule({
            name: name,
            height: height,
            width: width,
            depth: depth,
            open: open,
            closed: closed,
            saved: saved,
            bed: bed,
            sofa: sofa,
            desk: desk,
            storage: storage,
            width_options: width_options,
            components: components
        });
    }


    const {email} = useParams();

    if(email !== undefined){
        useEffect(() => {
            axios.get(`http://localhost:3000/${email}`)
                .then(response => {
                    console.log(response.data);
                    updateContactFromResponse(response.data);
                    updateSelectedWallFromResponse(response.data);
                    updateVariaFromResponse(response.data);
                    updateConfiguratorFromResponse(response.data);
                    updateModuleFromResponse(response.data);

                })
                .catch(error => {
                    // Handle error
                    console.error('Error fetching data:', error);
                });
        }, [email]);}


    const showNextPart = () => {
        switch (part) {
            case 0:
                return <Questionnaire_space />
            case 1:
                return <Q1 stateId={stateId} setStateId={setStateId} />
            case 2:
                return <Questionnaire_func />
            case 3:
                return <Questionnaire_module/>
            case 4:
                return <Questionnaire_specs />
            case 5:
                return <Contact/>
            case 6:
                return <p>Nothing to see here</p>
            default:
                return <p>This is some default text</p>
        }
    }

    const onSubmit = async e => {
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

        let color = specs.color;
        let message;
        const url = 'https://hotmail.us18.list-manage.com/subscribe/post-json?u=dbf86de75caa0bdaee7da1262&amp;id=18a2dee28f&amp;f_id=00ed11e1f0';
        jsonp(`${url}&EMAIL=${contact.email}&FIRSTNAME=${contact.firstname}&LASTNAME=${contact.lastname}&ADDRESS=${contact.address}
                    &DIMENSIONS=${dim}&ROOM=${varia.room}&FUNCTIONAL=${func}&LAYOUT=${specs.layout}&MATERIAL=${specs.material}
                    &COLOR=${color}&OBSTACLES=${obs}&REQ=${varia.requirements}`, {param: 'c'}, (_, data) => {
            const {msg, result} = data
            console.log(result, msg);
            message = msg;
            alert(msg);
        });
        console.log(superContext);
        await axios.post('http://localhost:3000/api/contact', superContext);

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
                            <button data-testid="btn-nav-sidebar-previous" onClick={previousPart} hidden={showPrevious()}>
                                <div className="bottom_btn_content">
                                    <FaAnglesLeft />
                                </div>
                            </button>
                            <button data-testid="btn-nav-sidebar-next" onClick={nextPart} hidden={showNext()}>
                                <div className="bottom_btn_content">
                                    <FaAnglesRight />
                                </div>
                            </button>
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
