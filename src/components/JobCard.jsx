import { useState } from "react";
import { Link } from "./Link";

export function JobCard({ job }) {
  const { data, titulo, empresa, ubicacion, descripcion } = job;
  const [isApplied, setIsApplied] = useState(false);

  const handleApplyClick = () => {
    setIsApplied(true);
  }

  const buttonClasses = isApplied ? 'button secondary-button apply-button is-applied' : 'button secondary-button apply-button'
  const buttonText = isApplied ? 'Aplicado' : 'Aplicar'

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
        <button className={buttonClasses} onClick={handleApplyClick}>
          {buttonText}
        </button>
      </div>
    </article>
  )
}