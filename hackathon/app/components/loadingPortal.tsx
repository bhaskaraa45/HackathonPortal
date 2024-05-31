import React from "react";
import Sidebar from "./Sidebar";

export default function LoadingPortal() {
    return (
        <div className="dashboardBG">
            <Sidebar isLoading={true} />
        </div>
    );
}