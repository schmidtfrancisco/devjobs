import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router"
import { Spinner } from "../components/Spinner"
import { Link } from "../components/Link"
import snarkdown from 'snarkdown'

function JobSection({title, content, className}) {
  const html = snarkdown(content)

  return (
    <article className={className}>
      <h2>{title}</h2>
      <div dangerouslySetInnerHTML={{__html: html}} />
    </article>
  )
}

export default function JobDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [job, setJob] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!id) return

    const controller = new AbortController()
    
    fetch(`https://jscamp-api.vercel.app/api/jobs/${id}`, {
      signal: controller.signal,
    })
      .then(res => {
        if (!res.ok) throw new Error('Job not found')
        return res.json()
      })
      .then(json => {
        setJob(json)
      })
      .catch(err => {
        if (err.name === 'AbortError') return
        setError(err.message)
        setJob(null)
      })
      .finally(() => {
        setLoading(false)
      })
    
    return () => {
      controller.abort()
    }
  }, [id])

  if (loading) {
    <div className="loading-section">
      <p>Cargando empleo...</p>
      <Spinner />
    </div>
  }

  if (error || !job) {
    return (
      <div>
        <h2>Oferta no encontrada</h2>
        <button
          onClick={() => navigate('/')}
          className="button secondary-button"
        >
          Volver al inicio
        </button>
      </div>
    )
  }

  return (
    <main className="details-main">
      <nav className="breadcrumb">
        <Link
          href="/empleos">
          Empleos /
        </Link>
        <span>{job.titulo}</span>
      </nav>
      <section className="job-details">
        <header>
          <div>
            <h1>{job.titulo}</h1>
            <p>{job.empresa} - {job.ubicacion}</p>
          </div>
          <button className="button secondary-button">Aplicar ahora</button>
        </header>
        <footer>
          <JobSection 
            title='Descripción del puesto' 
            content={job.content.description} 
            className='job-description' 
          />
          <JobSection 
            title='Responsabilidades' 
            content={job.content.responsibilities} 
            className='job-responsabilities' 
          />
          <JobSection 
            title='Requisitos' 
            content={job.content.requirements} 
            className='job-requirements' 
          />
          <JobSection 
            title='Acerca de la empresa' 
            content={job.content.about} 
            className='company-info' 
          />
          <button className="button secondary-button">Aplicar ahora</button>
        </footer>
      </section>
    </main>
  )
}