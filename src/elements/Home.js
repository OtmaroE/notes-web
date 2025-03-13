import { Link, useNavigate } from "react-router-dom";

import { isLoggedIn } from "../security/Protected";
import React, { useEffect } from "react";

export default function Home() {
  const navigate = useNavigate();
  useEffect(() => {
    isLoggedIn() ? navigate('/editor') : navigate('/login');
  });
  return (<div></div>)
}