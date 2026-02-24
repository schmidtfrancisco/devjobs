import { useState, useEffect } from "react"
import { JobList } from "../components/JobList"
import { Pagination } from "../components/Pagination"
import { SearchForm } from "../components/SearchForm"
import jobsData from '../data.json'

const RESULTS_PER_PAGE = 4

export function SearchPage() {
  const [filters, setFilters] = useState({
    search: '',
    technology: 'all',
    location: 'all',
    experienceLevel: 'all'
  })
  const [currentPage, setCurrentPage] = useState(1)

  const jobsFilteredByFilters = jobsData.filter(job => {
    return (
      (filters.technology === 'all' | job.data.technology === filters.technology) &&
      (filters.location === 'all' || job.data.modalidad === filters.location) &&
      (filters.experienceLevel === 'all' || job.data.nivel === filters.experienceLevel)
    )
  })

  const jobsWithTextFilter = filters.search === ''
    ? jobsFilteredByFilters
    : jobsFilteredByFilters.filter(job => {
      return job.titulo.toLowerCase().includes(filters.search.toLowerCase())
    })

  const totalPages = Math.ceil(jobsWithTextFilter.length / RESULTS_PER_PAGE);

  const pagedResults = jobsWithTextFilter.slice(
    (currentPage - 1) * RESULTS_PER_PAGE,
    currentPage * RESULTS_PER_PAGE
  )

  const handlePageChange = (page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSearch = (filters) => {
    setCurrentPage(1)
    setFilters(filters)
  }

  useEffect(() => {

  }, [currentPage])

  return (
    <main className="search-main">
      <section className="search-section">
        <h1>Encuentra tu próximo trabajo</h1>
        <p>Explora miles de oportunidades en el sector tecnológico.</p>
        <SearchForm onSearch={handleSearch} />
      </section>
      <JobList jobs={pagedResults} />
      <p className="results-number">
        Mostrando {(currentPage - 1) * RESULTS_PER_PAGE + 1} -{' '}
        {Math.min(currentPage * RESULTS_PER_PAGE, jobsData.length)} de {jobsData.length} trabajos
      </p>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </main>
  )
}
