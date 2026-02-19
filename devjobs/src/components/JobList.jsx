import data from './data.json'
import JobCard from "./components/JobCard"

function JobList() {
  return (
    <section className="search-results">
      <header>
        <h2>Resultados de búsqueda</h2>
      </header>
      <footer className="results-list">
        {data.map((job) =>
          <JobCard id={job.id} job={job} />
        )}
      </footer>
      <p className="results-number"></p>
    </section>
  )
}

export default JobList;