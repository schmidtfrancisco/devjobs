import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router"
import { Spinner } from "../components/Spinner"
import { Link } from "../components/Link"
import snarkdown from 'snarkdown'
import { useAuthStore } from "../store/authStore"
import { useFavoritesStore } from "../store/favoritesStore"

function JobSection({ title, content, className }) {
  const html = snarkdown(content)

  return (
    <article className={className}>
      <h2>{title}</h2>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </article>
  )
}

function DetailFavoriteButton({ jobId }) {
  const { isFavorite, toggleFavorite } = useFavoritesStore()

  return (
    <button className='button primary-button' onClick={() => toggleFavorite(jobId)}>
      {isFavorite(jobId)
        ? '⭐'
        : <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-star"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873l-6.158 -3.245" /></svg>
      }
    </button>
  )
}

export default function JobDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [job, setJob] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { isLoggedIn } = useAuthStore()

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
          href="/search">
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
          <DetailFavoriteButton jobId={id} />
          <button disabled={!isLoggedIn} className="button secondary-button">
            {isLoggedIn ? 'Aplicar ahora' : 'Inicia sesión para aplicar'}
          </button>
          
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
          <button disabled={!isLoggedIn} className="button secondary-button">
            {isLoggedIn ? 'Aplicar ahora' : 'Inicia sesión para aplicar'}
          </button>
        </footer>
      </section>
    </main>
  )
}