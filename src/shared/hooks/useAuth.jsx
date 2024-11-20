import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";

const AuthContext = createContext();
// const UserContext = createContext()

export const AuthProvider = ({ children }) => {
   const [user, setUser] = useLocalStorage("user", null);
   const navigate = useNavigate();

   // call this function when you want to authenticate the user
   const login = async (data) => {
      let username = data.name;
      console.log(username);
      fetch("https://fakestoreapi.com/users")
         .then((res) => res.json())
         .then((users) => {
            const myUser = users.find((u) => u.username === username);
            if (myUser) {
               return fetch(`https://fakestoreapi.com/users/${myUser.id}`);
            } else {
               throw new Error("User not found");
            }
         })
         .then((res) => res.json())
         .then((userDetails) => {
            setUser(userDetails);
            console.log(userDetails);
         })
         .catch((e) => {
            console.log("Error! ", e);
         });
      // setUser(username);
      navigate("/user");
   };

   // call this function to sign out logged in user
   const logout = () => {
      setUser(null);
      navigate("/", { replace: true });
   };

   const value = useMemo(
      () => ({
         user,
         login,
         logout,
      }),
      [user]
   );

   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
   return useContext(AuthContext);
};
