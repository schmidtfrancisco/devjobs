
import { Footer } from "./components/Footer"
import { Header } from "./components/Header"
import { HomePage } from "./pages/Home"
import { SearchPage } from "./pages/Search"
import { ProfilePage } from "./pages/Profile.jsx"
import { Route } from "./components/Route"

function App() {
  return (
    <>
      <Header />
      <Route path="/" component={HomePage} />
      <Route path="/search" component={SearchPage} />
      <Route path="/profile" component={ProfilePage} />
      <Footer />
    </>
  )
}

export default App
