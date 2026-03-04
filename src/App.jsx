
import { lazy, Suspense } from "react"
import { Routes, Route } from "react-router"
import { Footer } from "./components/Footer"
import { Header } from "./components/Header"
import { ProtectedRoute } from "./components/ProtectedRoute.jsx"

const HomePage = lazy(() => import('./pages/Home.jsx'))
const SearchPage = lazy(() => import('./pages/Search.jsx'))
const ProfilePage = lazy(() => import('./pages/Profile.jsx'))
const NotFoundPage = lazy(() => import('./pages/NotFound.jsx'))
const JobDetail = lazy(() => import('./pages/Detail.jsx'))

function App() {


  return (
    <>
      <Header />
      <Suspense fallback={
        <div className="loading-fallback">
          <p>Cargando página...</p>
        </div>
      }>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/profile" element=
            {
              <ProtectedRoute redirectTo="/login">
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route path="/jobs/:id" element={<JobDetail />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
      <Footer />
    </>
  )
}

export default App
