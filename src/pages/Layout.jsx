import { Outlet } from "react-router-dom";

export default function Layout() {
    return (
        <div>
            <nav>
                <a href="/">Home</a>
            </nav>
            <main><Outlet /></main>
        </div>
    );
};