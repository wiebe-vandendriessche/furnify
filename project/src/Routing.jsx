import React from 'react';
import { Routes, Route } from 'react-router-dom';

import App from "./App.jsx";

function Routing() {
    return (
        <Routes>
            <Route path="/" element={<App />}/>
            <Route path="/:email" element={<App />}/>
        </Routes>
    );
}

export default Routing;