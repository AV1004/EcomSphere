import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";

export const Root2 = () => {
  return (
    <Suspense>
      <Outlet />
    </Suspense>
  );
};
