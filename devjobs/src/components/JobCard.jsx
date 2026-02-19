function JobCard({ job }) {
  const { data, titulo, empresa, ubicacion, descripcion } = job;

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
      <button className="button secondary-button apply-button">Aplicar</button>
    </article>
  )
}

export default JobCard;