import React, { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = ({ childern }) => {
  const { pathname } = useLocation();
  // let { pathname } = location;
  // console.log(pathname);
  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
    window.scrollTo(0, 0);
  }, [pathname]);
  return <>{childern}</>;
};

export default ScrollToTop;
