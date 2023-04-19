import { Suspense, lazy, useContext } from "react";
//Components
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BaseLayout from "./layout/BaseLayout";
import { ThemeContext } from "./context/ThemeContext";
import { account } from "./utils/Storage";

//Pages
const Error: React.FC = lazy(() => import("./pages/Error/Error"));
const Home: React.FC = lazy(() => import("./pages/Home/Home"));
const Login: React.FC = lazy(() => import("./pages/Login/Login"));
const Film: React.FC = lazy(() => import("./pages/Film/Film"));
const Search: React.FC = lazy(() => import("./pages/Search/Search"));
const Register: React.FC = lazy(() => import("./pages/Register/Register"));
const Profile: React.FC = lazy(() => import("./pages/Profile/Profile"));
const Genre: React.FC = lazy(() => import("./pages/Genre/Genre"));

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
              {!account.get("username") && (
                <Route path="/login" element={<Login />} />
              )}
              <Route path="/register" element={<Register />} />
              {/* Profile URL */}
              <Route path="/profile/:username" element={<Profile />} />
              <Route path="/profile/:username/:status" element={<Profile />} />

              {/* Film Routes */}
              <Route path="/watch/*" element={<Film />} />
              {/* Search Routes */}
              <Route path="/search" element={<Search />} />
              <Route path="/search/:keyword" element={<Search />} />
              {/* Genre Routes */}
              <Route path="/genre/:name" element={<Genre />} />
            </Routes>
          </BaseLayout>
        </Suspense>
      </BrowserRouter>
    </main>
  );
};

export default App;
