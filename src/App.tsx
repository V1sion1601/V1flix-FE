import { Suspense, lazy, useContext } from "react";
//Components
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BaseLayout from "./layout/BaseLayout";
import { ThemeContext } from "./context/ThemeContext";

//Pages
const Error: React.FC = lazy(() => import("./pages/Error/Error"));
const Home: React.FC = lazy(() => import("./pages/Home/Home"));
const Login: React.FC = lazy(() => import("./pages/Login/Login"));
const Film: React.FC = lazy(() => import("./pages/Film/Film"));
const Search: React.FC = lazy(() => import("./pages/Search/Search"));
const Register: React.FC = lazy(() => import("./pages/Register/Register"));
const Profile: React.FC = lazy(() => import("./pages/Profile/Profile"));

const App: React.FC = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <main className={`${theme === "dark" ? " bg-bgColor" : "bg-white"}`}>
      <BrowserRouter>
        <Suspense
          fallback={
            <div className="text-4xl font-bold text-green-400 h-screen flex justify-center items-center">
              Loading...
            </div>
          }
        >
          <BaseLayout>
            <Routes>
              <Route path="/*" element={<Error />} />

              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile/:username" element={<Profile />} />

              {/* Film Routes */}
              <Route path="/watch/:id" element={<Film />} />
              <Route path="/watch/:id/ep/:epNum" element={<Film />} />
              {/* Search Routes */}
              <Route path="/search" element={<Search />} />
              <Route path="/search/:keyword" element={<Search />} />
            </Routes>
          </BaseLayout>
        </Suspense>
      </BrowserRouter>
    </main>
  );
};

export default App;
