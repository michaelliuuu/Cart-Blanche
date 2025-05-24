import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("site") || "");
  const navigate = useNavigate();

  const loginAction = async (input) => {
    // CHANGE FOR FUTURE USE
    const LOGIN_URL = "http://localhost:8000/server/api/login.php";

    try {
      const response = await fetch(LOGIN_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
          body: JSON.stringify( { email: input.email,
            password: input.password} ),
      });

      const res = await response.json();
      // console.log("Login API Response:", res);

      if (res.success) {
        setUser(res.user);
        setToken(res.token);
        localStorage.setItem("site", res.token);

        // Checks to see if the user who is logging in is an admin
        if (res.user.role === "admin") {
          navigate(`/admin/admin-dashboard`);  
        } else {
          navigate(`/user/user-dashboard`);  
        }
        return;
      }
      throw new Error(res.message);
    } catch (err) {
      console.error(err);
    }
  };

  const logOut = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("site");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ token, user, loginAction, logOut }}>
      {children}
    </AuthContext.Provider>
  );

};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};