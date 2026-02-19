import FiltersSection from "./components/FiltersSection"
import Footer from "./components/Footer"
import Header from "./components/Header"
import JobList from "./components/JobList"
import SearchSection from "./components/SearchSection"


function App() {

  return (
    <>
      <Header />
      <main className="search-main">
        <section className="search-section">
          <h1>Encuentra tu próximo trabajo</h1>
          <p>Explora miles de oportunidades en el sector tecnológico.</p>
          <form role="search">
            <SearchSection />
            <FiltersSection />
          </form>
        </section>
        <JobList />
        <nav className="pagination">

        </nav>
      </main>
      <Footer />
    </>
  )
}

export default App
