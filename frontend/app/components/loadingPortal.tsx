import React from "react";
import Sidebar from "./Sidebar";
import CustomHead from "./customHead";
import AdminSideBar from "./adminSidebar";

export default function LoadingPortal() {
    return (
        <div>
            <CustomHead title='Hackathon Dashboard | E-Cell IIT Hyderabad - NPCI' description='Welcome to the Dashboard of E-Cell IIT Hyderabad & NPCI collaborative Hackathon.' />
            <Sidebar />
        </div>
    );
}

export function AdminLoadingPortal() {
    return (
        <div >
            <CustomHead title='Hackathon Admin | E-Cell IIT Hyderabad - NPCI' description='Welcome to the Dashboard of E-Cell IIT Hyderabad & NPCI collaborative Hackathon.' />
            <AdminSideBar />
        </div>
    );
}