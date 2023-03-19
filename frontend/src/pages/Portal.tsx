import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PortalNavbar from "../components/PortalNavbar";

function Portal() {
  const navigate = useNavigate();

  useEffect(() => {
    const userValidation = () => {
      const user = localStorage.getItem("user");
      if (!user) return navigate("/login");
      return;
    };
    userValidation();
  }, [navigate]);

  return (
    <>
      <PortalNavbar />
    </>
  );
}

export default Portal;
