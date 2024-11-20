import { Navigate } from "react-router-dom";
import { useAuth } from "../../../shared/hooks/useAuth";

export const ProtectedRoute = ({ children }) => {
   const { user } = useAuth();
   console.log(user);
   if (!user) {
      // user is not authenticated
      return <Navigate to="/" />; //if we use navigate function instead we have to use it inside an effect
   }
   return children;
};
