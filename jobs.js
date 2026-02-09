let jobslist = {}
let jobsRendered = {}
const jobInputSearch = document.getElementById('job-search');
const technologyFilter = document.getElementById('technology-filter');
const locationFilter = document.getElementById('location-filter');
const experienceFilter = document.getElementById('experience-filter');

fetch("./data.json")
  .then((response) => {
    return response.json();
  })
  .then((jobs) => {
    jobslist = jobs
    renderJobs(jobslist);
  })

jobInputSearch.addEventListener('input', () => {
  const query = jobInputSearch.value.toLowerCase();
  console.log(jobslist)
  const filteredJobs = jobslist.filter(job => job.titulo.toLowerCase().includes(query));
  renderJobs(filteredJobs);
})

technologyFilter.addEventListener('change', () => {
  let filteredJobs = jobslist;
  const selectedTech = technologyFilter.value;
  console.log(jobsRendered)
  if (selectedTech === 'all') return renderJobs(jobslist)
  filteredJobs = jobsRendered.filter(job => job.data.technology === selectedTech)
  console.log(filteredJobs)
  renderJobs(filteredJobs)
})

locationFilter.addEventListener('change', () => {
  const cards = document.querySelectorAll('.result-card');
  const selectedLocation = locationFilter.value;

  cards.forEach(card => {
    const cardLocation = card.dataset.location;
    if (cardLocation === selectedLocation || selectedLocation === "all") {
      card.classList.remove('is-hidden')
    } else {
      card.classList.add('is-hidden')
    }
  })
})

experienceFilter.addEventListener('change', () => {
  const cards = document.querySelectorAll('.result-card');
  const selectedExperience = experienceFilter.value;

  cards.forEach(card => {
    const cardExperience = card.dataset.experience;
    if (cardExperience === selectedExperience || selectedExperience === "all") {
      card.classList.remove('is-hidden')
    } else {
      card.classList.add('is-hidden')
    }
  })
})

function renderJobs(jobs) {
	const resultsList = document.querySelector('.results-list');
  const resultsNumber = document.querySelector('.results-number');
	resultsList.innerHTML = ''
  resultsNumber.textContent = `Mostrando ${jobs.length} de ${jobslist.length} ofertas`;
	jobs.forEach(job => {
		if (jobs.length === 0) {
			resultsList.innerHTML = '<p>No hay empleos disponibles por ahora.</p>'
			return
		}

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
  jobsRendered = jobs;
}