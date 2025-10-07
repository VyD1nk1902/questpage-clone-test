import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import instance from "@/apis/instance";

const TwitterCallback = () => {
  const navigate = useNavigate();
  const calledRef = useRef(false);

  useEffect(() => {
    if (calledRef.current) return;
    calledRef.current = true;

    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    const codeVerifier = localStorage.getItem("twitter_code_verifier");

    instance
      .post(`${import.meta.env.VITE_API_URL}/data-twitter`, {
        code,
        codeVerifier,
      })
      .then((res) => {
        console.log("Twitter user:", res.data.user);
        navigate("/", { replace: true });
      })
      .catch((err) => {
        console.error(err);
      });
  }, [navigate]);

  return null;
};

export default TwitterCallback;
