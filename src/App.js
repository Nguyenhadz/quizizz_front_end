import './App.css';
import React from 'react';
import {ToastContainer} from 'react-toastify';
import {Route, Routes} from "react-router-dom";
import ShowListStudent from "./page/user/ShowListStudent";
import Login from "./page/Login";
import Home from "./page/Home";
import MenuLogin from "./page/MenuLogin";
import LoginWithGmailForm from "./page/LoginWithGmailForm";
import UserDetail from "./page/user/UserDetail";
import UpdateUser from "./page/user/UpdateUser";
import ShowListTeacherPending from "./page/user/ShowListTeacherPending";
import DetailTeacherPending from "./page/user/DetailTeacherPending";

function App() {
    return (
        <div>
            <ToastContainer/>
            <Routes>
                <Route path={'/'} element={<Login/>}>
                    <Route path={'/'} element={<MenuLogin/>}></Route>
                    <Route path={'/loginWithEmail'} element={<LoginWithGmailForm/>}></Route>
                </Route>
                <Route path={'/home'} element={<Home/>}>
                    <Route path={'/home/showListStudent'} element={<ShowListStudent/>}></Route>
                    <Route path={'/home/userDetail/:id'} element={<UserDetail/>}></Route>
                    <Route path={'/home/findUserById/:id'} element={<UpdateUser/>}></Route>
                    <Route path={'/home/showTeacherPending'} element={<ShowListTeacherPending/>}></Route>
                    <Route path={'/home/detailTeacherPending/:id'} element={<DetailTeacherPending/>}></Route>
                </Route>
            </Routes>
        </div>
    );
}

export default App;
