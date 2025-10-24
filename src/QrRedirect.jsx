import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import api from "./functions/api";

//Components
import LoadingIcons from "react-loading-icons";

const QrRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        await api.put("/incrementQr");
      } catch (err) {
        console.error(err);
      }

      navigate("/"); //Navs to homepage
    })();
  }, [navigate]);

  return (
    <div className="size-full col-flex-center justify-center flex-grow">
      <LoadingIcons.SpinningCircles
        strokeOpacity={0.125}
        speed={1.5}
        className="size-3/4 lg:size-1/6"
      />
    </div>
  );
};

export default QrRedirect;
