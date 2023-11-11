import React from "react";
import {Text, View } from "react-native"
import RepositositoriList from "./RepositoriList";
import AppBar from "./AppBar";
import {Navigate, Route, Routes} from "react-router-native"
import RegisterPage from "../pages/Register";
import LogInPage from "../pages/Login";
import Prueba from "../pages/Prueba";

const Main = () => {
    return(
        <View style={{ flex: 1}}>
            <AppBar />
            <Routes>
                <Route path='/' element={<LogInPage />} />
                <Route path='/register' element={<RegisterPage />} />
                <Route path="/inicio" element={<Prueba />} />
            </Routes>
        </View>
    )
}

export default Main;