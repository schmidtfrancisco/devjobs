import { useState } from "react"
import { FiltersSection } from "./components/FiltersSection"
import { Footer } from "./components/Footer"
import { Header } from "./components/Header"
import { JobList } from "./components/JobList"
import { Pagination } from "./components/Pagination"
import { SearchSection } from "./components/SearchSection"
import jobsData from './data.json'

const RESULTS_PER_PAGE = 4

function App() {
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = Math.ceil(jobsData.length / RESULTS_PER_PAGE);

  const pagedResults = jobsData.slice(
    (currentPage - 1) * RESULTS_PER_PAGE,
    currentPage * RESULTS_PER_PAGE
  )

  const handlePageChange = (page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

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
        <JobList jobs={pagedResults} />
        <p className="results-number">
          Mostrando {(currentPage - 1) * RESULTS_PER_PAGE + 1} -{' '}
          {Math.min(currentPage * RESULTS_PER_PAGE, jobsData.length)} de {jobsData.length} trabajos
        </p>
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      </main>
      <Footer />
    </>
  )
}

export default App
