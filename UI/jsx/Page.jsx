import React from 'react';
import * as ReactDOM from "react-dom/client";
import { HashRouter as Router } from 'react-router-dom';
import NavPage from "./NavPage.jsx";

const element = <Router>
    <NavPage></NavPage>
</Router>;

ReactDOM.createRoot(document.getElementById('root')).render(element);