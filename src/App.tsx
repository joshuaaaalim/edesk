import React from "react";
import { MantineProvider } from "@mantine/core";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/static/Navbar";
import Home from "./components/homepage/Title";
import NewYork from "./components/homepage/NewYork";
import Portland from "./components/homepage/Portland";
import LosAngeles from "./components/homepage/LosAngeles";
import Sydney from "./components/homepage/Sydney";
import Melbourne from "./components/homepage/Melbourne";
import Perth from "./components/homepage/Perth";
import KualaLumpur from "./components/homepage/KualaLumpur";
import Selangor from "./components/homepage/Selangor";
import Penang from "./components/homepage/Penang";
import Profile from "./components/profile/Profile";
import TreeNav from "./components/static/TreeNav";
import General from "./General";

import "@mantine/core/styles.css";

function App() {
  return (
    <div>
      <MantineProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<General />}>
              <Route path="/home" element={<Home />} />
              <Route path="/newyork" element={<NewYork />} />
              <Route path="/portland" element={<Portland />} />
              <Route path="/losangeles" element={<LosAngeles />} />
              <Route path="/sydney" element={<Sydney />} />
              <Route path="/melbourne" element={<Melbourne />} />
              <Route path="/perth" element={<Perth />} />
              <Route path="/kualalumpur" element={<KualaLumpur />} />
              <Route path="/selangor" element={<Selangor />} />
              <Route path="/penang" element={<Penang />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </MantineProvider>
    </div>
  );
}

export default App;
