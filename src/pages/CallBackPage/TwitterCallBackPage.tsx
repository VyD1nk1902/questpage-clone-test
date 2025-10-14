import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import instance from "@/apis/instance";
import useApi from "@/hooks/useApi";
import { userApi } from "@/apis/user.api";
import { useAppData } from "@/hooks/useAppData";
import { useUpdateData } from "@/hooks/useUpdateData";

const TwitterCallback = () => {
  const navigate = useNavigate();
  const calledRef = useRef(false);
  const { userInfo } = useAppData();
  const { updateUserInfo } = useUpdateData();
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
        console.log("Twitter user:", res.data.data);
        updateUserInfo({ twitter: res.data.data });
        navigate("/", { replace: true });
      })
      .catch((err) => {
        console.error(err);
      });
  }, [navigate]);

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-background fixed top-0 left-0 z-[100]">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
    </div>
  );
};

export default TwitterCallback;
