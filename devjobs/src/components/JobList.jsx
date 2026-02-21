
import { JobCard } from "./JobCard"

export function JobList({ jobs }) {
  return (
    <section className="search-results">
      <header>
        <h2>Resultados de búsqueda</h2>
      </header>
      {jobs.length === 0 ? (
        <p className="no-results">No se encontraron resultados para tu búsqueda.</p>
      ) : (
        <>
          <footer className="results-list">
            {jobs.map((job) =>
              <JobCard key={job.id} job={job} />
            )}
          </footer>
          
        </>
      )}
    </section>
  )
}