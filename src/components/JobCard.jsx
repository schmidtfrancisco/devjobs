import { useState } from "react";
import { Link } from "./Link";
import { useFavoritesStore } from "../store/favoritesStore";
import { useAuthStore } from "../store/authStore";

function JobCardFavoriteButton({ jobId }) {
  const { toggleFavorite, isFavorite } = useFavoritesStore()
  const { isLoggedIn } = useAuthStore()

  return (
    <button disabled={!isLoggedIn} className='button primary-button' onClick={() => toggleFavorite(jobId)}>
      {isFavorite(jobId)
        ? '⭐'
        : <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-star"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873l-6.158 -3.245" /></svg>
      }
    </button>
  )
}

function JobCardApplyButton({ jobId }) {
  const [isApplied, setIsApplied] = useState(false);
  const { isLoggedIn } = useAuthStore()

  const handleApplyClick = () => {
    console.log(jobId)
    setIsApplied(true);
  }

  const buttonClasses = isApplied ? 'button secondary-button apply-button is-applied' : 'button secondary-button apply-button'
  const buttonText = isApplied ? 'Aplicado' : 'Aplicar'

  return (
    <button disabled={!isLoggedIn} className={buttonClasses} onClick={handleApplyClick}>
      {buttonText}
    </button>
  )
}

export function JobCard({ job }) {
  const { id, data, titulo, empresa, ubicacion, descripcion } = job;

  return (
    <article
      className="result-card"
      data-technology={data?.technology}
      data-location={data?.modalidad}
      data-experience={data?.nivel}
    >
      <h3>
        <Link href={`/jobs/${job.id}`} className='card-title-link' >
          {titulo}
        </Link>
      </h3>
      <h4>{empresa} | {ubicacion}</h4>
      <p>{descripcion}</p>
      <div className="card-buttons">
        <Link href={`/jobs/${job.id}`} className="button primary-button view-details-button">
          Ver detalles
        </Link>
        <JobCardFavoriteButton jobId={id} />
        <JobCardApplyButton jobId={id} />
      </div>
    </article>
  )
}