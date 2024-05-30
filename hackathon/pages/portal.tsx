import React from "react";
import styles from '../styles/portal.module.css'
import Sidebar from "@/app/components/PortalSidebar";

export default function Home() {
    return (
        <>
            <div className={styles.container}>
                <Sidebar />
            </div>
        </>
    );
}