import React, { useState, createContext } from "react";
//Context
export const UserContext = createContext<any>("");
//Provider
const UserProvider: React.FC<any> = ({ children }) => {
  const saveUser = (data: any) => {
    sessionStorage.setItem("userData", JSON.stringify(data));
  };

  const getUser = () => {
    const userJson: any = sessionStorage.getItem("userData");
    const user = userJson !== null ? JSON.parse(userJson) : "";
    return user;
  };

  const removeUser = () => {
    sessionStorage.removeItem("userData");
    window.location.reload();
  };

  const value = { saveUser, getUser, removeUser };
  //this will have account context
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserProvider;
