import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { loginPath, homePagePath } from "./routePaths";

const Login = lazy(() => import("../pages/login/loginForm"));
const DynamicForm = lazy(() => import("../pages/dynamic-form"));

const AllRoutes = () => {
  return (
    <Suspense fallback={<h3>PageLoading...</h3>}>
      <BrowserRouter>
        <Routes>
          <Route path={homePagePath} element={<DynamicForm />}></Route>
          <Route path={loginPath} element={<Login />}></Route>
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
};

export default AllRoutes;
