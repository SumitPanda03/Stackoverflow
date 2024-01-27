import React, { useEffect } from "react";
import { ReactComponent as Sun } from "./Sun.svg";
import { ReactComponent as Moon } from "./Moon.svg";
import "./DarkMode.css";

const DarkMode = () => {
    const setDarkMode = () => {
        document.querySelector("body").setAttribute("data-theme", "dark");
    };

    const setLightMode = () => {
        document.querySelector("body").setAttribute("data-theme", "light");
    };

    const toggleTheme = () => {
        const currentHour = new Date().getHours();
        if (currentHour >= 6 && currentHour < 17) {
            setLightMode();
        } else {
            setDarkMode();
        }
    };

    useEffect(() => {
        toggleTheme(); // Set theme based on current time when component mounts

        // Set up an interval to check and update the theme every minute
        const intervalId = setInterval(toggleTheme, 60000);

        // Clear the interval when the component is unmounted
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="dark_mode">
            <input
                className="dark_mode_input"
                type="checkbox"
                id="darkmode-toggle"
                onChange={toggleTheme}
            />
            {/* <label className="dark_mode_label" htmlFor="darkmode-toggle">
                <Sun />
                <Moon />
            </label> */}
        </div>
    );
};

export default DarkMode;
