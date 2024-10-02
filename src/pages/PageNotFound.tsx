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
      <img
        src="/src/assets/not-found.svg"
        className="h-8 cursor-pointer"
        onClick={() => navigate('/')}
        style={{ width: "100%", height: "90vh" }}
      />
    </>
  );
};

export default PageNotFound;
