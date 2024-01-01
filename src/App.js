// App.js

import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoute from "./components/privateRouter";
import Header from "./components/header";
import Loader from "./components/loader";
import Create from "./pages/appeal/create";
import Success from "./pages/appeal/success";
import Search from "./pages/appeal/search";
import Interrogate from "./pages/appeal/interrogate";

const Admin = lazy(() => import("./pages/admin"));
const AppealList = lazy(() => import("./pages/admin/appealList"));
const Details = lazy(() => import("./pages/admin/details"));

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Create />} />
        <Route path="/basvuru-basarili/:id" element={<Success />} />
        <Route path="/basvuru-sorgula" element={<Search />} />
        <Route path="/basvuru/:basvuruNo" element={<Interrogate />} />
        <Route
          path="/admin"
          element={
            <Suspense fallback={<Loader />}>
              <Admin />
            </Suspense>
          }
        />
        <Route
          path="/admin/basvuru-listesi"
          element={
            <Suspense fallback={<Loader />}>
              <PrivateRoute Component={AppealList} />
            </Suspense>
          }
        />
        <Route
          path="/admin/basvuru/:basvuruNo"
          element={
            <Suspense fallback={<Loader />}>
              <PrivateRoute Component={Details} />
            </Suspense>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
