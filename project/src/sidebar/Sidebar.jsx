import "../App.css"
import React, {useState} from "react";
import {FaAnglesRight, FaAnglesLeft} from "react-icons/fa6"
import {IconContext} from "react-icons"
import Questionnaire from "./components/questionnaire.jsx";
import Contact from "./components/contact.jsx";
function Sidebar(){

    const [sidebar, setSidebar]= useState(false);
    const [part, showPart]=useState(0);
    const showSidebar=()=>{setSidebar(!sidebar);}
    const previousPart=()=>{showPart(part-1)}
    const nextPart=()=>{showPart(part+1)}
    const [state, setState] = useState({
        name: "",
        age: 0,
        hobbies: ["paardrijden", "tango", "vissen"]
    });

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

/*
<!doctype html>
<html lang="en">
    <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite + React</title>
<script src="index.js"></script>
</head>
<body>
TEST
<div id="root"></div>
<div class="sidebar" id="sidebar_open"> Test
    <img class="questionnaire-question" hidden="true" src="src/images/logo_furnify.jpg" width="10%" height="10%">
        <h5 class="questionnaire-question" hidden="true">Test</h5>
        <p class="questionnaire-question" hidden="true">Test</p>
</div>
<div id="main">
    <button id="collapsible" class="openbtn" onclick="openNav()">
        <img src="src/images/logo_furnify.jpg" width="10%" height="10%">
    </button>
    <h3>Random text</h3>

</div>
<!--<script type="module" src="/src/main.jsx"></script>-->
</body>
</html>
JAVASCRIPT


alert("gelukt");
let button=document.getElementById("collapsible");
button.addEventListener("click", openNav);

/* Set the width of the sidebar to 250px and the left margin of the page content to 250px */
/*
function openNav() {
    let vragen=document.getElementsByClassName("questionnaire-question");

    document.getElementById("sidebar_open").style.width = "250px";
    document.getElementById("sidebar_open").style.marginRight = "250px";for(let vraag of vragen){
        alert("hier");
        vraag.hidden=false;
    }

}

/* Set the width of the sidebar to 0 and the left margin of the page content to 0 */
/*function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
}*/


/*
CSS
.sidebar{
    height: 100%;
    right: 0;
    top: 0;
    position: fixed;
    transition: 0.5s;
    padding-top: 60px;
    background-color: lightgray;
    width: 0;
}
body{
    font-family: Calibri, sans-serif;
    font-size: medium;

}
#main{
    transition: margin-left .5s;
    padding: 16px;
}

 */