import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";


const PageNotFound = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== "/page-not-found") {
      navigate("/page-not-found");
    }
  }, [location, navigate]);

  return (
    <>
      <p>Erros! Page not found.</p>
    </>
  );
};

export default PageNotFound;
