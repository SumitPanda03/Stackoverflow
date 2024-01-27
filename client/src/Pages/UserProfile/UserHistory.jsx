import React from "react";
import { login } from "../../actions/auth";
import * as api from "../../api/index";

const user = localStorage.getItem("Profile");
const userProfile = JSON.parse(user);
const loginHistory = userProfile?.loginHistory;
// console.log(loginHistory);
// console.log((user.result.loginHistory));
// console.log(user.result);
const UserHistory = () => {
    return (
        <div className="UserHistory">
            <h3>Login History:</h3>
            <p>User ID: {loginHistory.userId}</p>
            <p>Browser: {loginHistory.browser}</p>
            <p>OS: {loginHistory.os}</p>
            <p>Device Type: {loginHistory.deviceType}</p>
            <p>IP Address: {loginHistory.ip}</p>
            <p>Timestamp: {loginHistory.timestamp}</p>
        </div>
    );
};

export default UserHistory;
