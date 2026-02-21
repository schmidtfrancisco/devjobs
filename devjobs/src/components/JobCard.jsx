import { useState } from "react";

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
      <h3>{titulo}</h3>
      <h4>{empresa} | {ubicacion}</h4>
      <p>{descripcion}</p>
      <button className={buttonClasses} onClick={handleApplyClick}>{buttonText}</button>
    </article>
  )
}