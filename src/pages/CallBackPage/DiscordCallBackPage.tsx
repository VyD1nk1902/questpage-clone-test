import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import instance from "@/apis/instance";

const DiscordCallBackPage = () => {
  const navigate = useNavigate();
  const calledRef = useRef(false);

  useEffect(() => {
    if (calledRef.current) return;
    calledRef.current = true;

    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    if (!code) {
      console.error("No code returned from Discord");
      return;
    }

    instance
      .post(`${import.meta.env.VITE_API_URL}/data-discord`, {
        code,
      })
      .then((res) => {
        console.log("Discord user:", res.data.user);
        navigate("/", { replace: true });
      })
      .catch((err) => {
        console.error("Error fetching Discord user:", err);
      });
  }, [navigate]);

  return null;
};

export default DiscordCallBackPage;
