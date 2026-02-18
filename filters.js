import fetchJobs from "./jobs.js";

const jobInputSearch = document.getElementById('job-search');
const technologyFilter = document.getElementById('technology-filter');
const locationFilter = document.getElementById('location-filter');
const experienceFilter = document.getElementById('experience-filter');

let query = '';
let technology = null;
let location = null;
let experience = null;
fetchJobs(query, technology, location, experience);

jobInputSearch.addEventListener('input', () => {
  query = jobInputSearch.value.toLowerCase();
  fetchJobs(query, technology, location, experience);
})

technologyFilter.addEventListener('change', () => {
  technology = technologyFilter.value;
  if (technology === 'all')
    technology = null;
  fetchJobs(query, technology, location, experience);
})

locationFilter.addEventListener('change', () => {
  location = locationFilter.value;
  if (location === 'all')
    location = null;
  fetchJobs(query, technology, location, experience);
})

experienceFilter.addEventListener('change', () => {
  experience = experienceFilter.value;
  if (experience === 'all')
    experience = null;
  fetchJobs(query, technology, location, experience);
})