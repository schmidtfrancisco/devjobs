import { useState, useEffect } from "react"
import { JobList } from "../components/JobList"
import { Pagination } from "../components/Pagination"
import { SearchForm } from "../components/SearchForm"
import { Spinner } from "../components/Spinner"
import { useSearchParams } from "react-router"

const RESULTS_PER_PAGE = 4

const useFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [searchText, setSearchText] = useState(() => searchParams.get('text') || '')
  const [filters, setFilters] = useState(() => {
    return {
      technology: searchParams.get('technology') || '',
      location: searchParams.get('type') || '',
      experienceLevel: searchParams.get('level') || ''
    }
  })
  const [currentPage, setCurrentPage] = useState(() => {
    const pageString = searchParams.get('page')
    const page = Number(pageString)

    if (!pageString || Number.isNaN(page) || page < 1) {
      return 1
    }

    return page
  })
  const [jobs, setJobs] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)


  useEffect(() => {
    async function fetchJobs() {
      try {
        setLoading(true)

        const params = new URLSearchParams()
        if (searchText) params.append('text', searchText)
        if (filters.technology) params.append('technology', filters.technology)
        if (filters.location) params.append('type', filters.location)
        if (filters.experienceLevel) params.append('level', filters.experienceLevel)

        const offset = (currentPage - 1) * RESULTS_PER_PAGE
        params.append('limit', RESULTS_PER_PAGE)
        params.append('offset', offset)
        const queryParams = params.toString()

        const response = await fetch(`https://jscamp-api.vercel.app/api/jobs?${queryParams}`)
        const json = await response.json()

        setJobs(json.data)
        setTotal(json.total)
      } catch (error) {
        console.error('Error fetching jobs', error)
      } finally {
        setLoading(false)
      }
    }

    fetchJobs()
  }, [searchText, filters.technology, filters.location, filters.experienceLevel, currentPage])

  useEffect(() => {
    setSearchParams((params) => {
      if (searchText) params.set('text', searchText)
      else params.delete('text')
      if (filters.technology) params.set('technology', filters.technology)
      else params.delete('technology')
      if (filters.location) params.set('type', filters.location)
      else params.delete('type')
      if (filters.experienceLevel) params.set('level', filters.experienceLevel)
      else params.delete('level')

      if (currentPage > 1) params.set('page', currentPage)
      else params.delete('page')

      return params
    })

  }, [searchText, filters.technology, filters.location, filters.experienceLevel, currentPage, setSearchParams])


  const totalPages = Math.ceil(total / RESULTS_PER_PAGE);

  const handlePageChange = (page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSearch = (searchText) => {
    setCurrentPage(1)
    setSearchText(searchText)
  }

  const handleFiltersChange = (filters) => {
    setCurrentPage(1)
    setFilters(filters)
  }

  const handleFiltersReset = () => {
    setFilters({
      technology: '',
      location: '',
      experienceLevel: ''
    })
  }

  const activeFilters = Object.values(filters).some(v => v != '')

  return {
    jobs,
    total,
    currentPage,
    totalPages,
    loading,
    activeFilters,
    searchText,
    filters,
    handleSearch,
    handleFiltersChange,
    handlePageChange,
    handleFiltersReset
  }
}

export default function SearchPage() {
  const {
    jobs,
    total,
    currentPage,
    totalPages,
    loading,
    activeFilters,
    searchText,
    filters,
    handleSearch,
    handleFiltersChange,
    handlePageChange,
    handleFiltersReset
  } = useFilters()

  const title = `Resultados: ${total}, Página ${currentPage} - DevJobs`

  return (
    <main className="search-main">
      <title>{title}</title>
      <section className="search-section">
        <h1>Encuentra tu próximo trabajo</h1>
        <p>Explora miles de oportunidades en el sector tecnológico.</p>
        <SearchForm
          initialText={searchText}
          filters={filters}
          onSearch={handleSearch}
          onFiltersChange={handleFiltersChange}
          activeFilters={activeFilters}
          onFiltersReset={handleFiltersReset}
        />
      </section>
      {
        loading ? (
          <div className="loading-section">
            <p>Cargando empleos...</p>
            <Spinner />
          </div>) : (
          <JobList jobs={jobs} />
        )
      }
      <p className="results-number">
        Mostrando {(currentPage - 1) * RESULTS_PER_PAGE + 1} -{' '}
        {Math.min(currentPage * RESULTS_PER_PAGE, total)} de {total} trabajos
      </p>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </main>
  )
}
