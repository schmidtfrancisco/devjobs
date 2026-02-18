import generatePagination from "./pagination.js";

export default function fetchJobs(query, technology, location, experience) {
  fetch("./data.json")
    .then((response) => {
      return response.json();
    })
    .then((jobs) => {
      
      const numberOfJobs = jobs.length
      if (query)
        jobs = jobs.filter(job => job.titulo.toLowerCase().includes(query))
      if (technology)
        jobs = jobs.filter(job => job.data.technology === technology)
      if (location)
        jobs = jobs.filter(job => job.data.modalidad === location)
      if (experience)
        jobs = jobs.filter(job => job.data.nivel === experience)
      renderJobs(jobs, numberOfJobs);
    })
}



function renderJobs(jobs, numberOfJobs) {
  const resultsList = document.querySelector('.results-list');
  const resultsNumber = document.querySelector('.results-number');
  resultsList.innerHTML = ''
  resultsNumber.textContent = `Mostrando ${jobs.length} de ${numberOfJobs} ofertas`;

  if (jobs.length === 0) {
    resultsList.innerHTML = '<p>No hay empleos disponibles por ahora.</p>'
    return
  }

  generatePagination(numberOfJobs)

  jobs.forEach(job => {
    const article = document.createElement('article')
    article.className = 'result-card'
    article.dataset.technology = job.data.technology
    article.dataset.location = job.data.modalidad
    article.dataset.experience = job.data.nivel

    article.innerHTML =
      `
          <h3>${job.titulo}</h3>
          <h4>${job.empresa} | ${job.ubicacion}</h4>
          <p>${job.descripcion}</p>
          <button class="button secondary-button apply-button">Aplicar</button>
      `

    resultsList.appendChild(article)
  })
}