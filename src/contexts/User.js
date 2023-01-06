import React, { createContext, useState } from 'react';

export const UserContext = createContext({});

export const User = ({ children }) => {
  const [user, setUser] = useState({});

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const isLoggedIn = (user) => {
  return Object.keys(user).length > 0
}

export const isProfileReady = (user) => {
  return user.profile && Object.keys(user.profile).length > 0
}