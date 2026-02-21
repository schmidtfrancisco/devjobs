const RESULTS_PER_PAGE = 3
const currentPage = 1;

export default function generatePagination(numberOfJobs) {
  const totalPages = Math.ceil(numberOfJobs / RESULTS_PER_PAGE);

  const paginationContainer = document.querySelector('.pagination');
  paginationContainer.innerHTML = '';

  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement('button');
    button.textContent = i;
    button.className = 'page-button';

    if (i === currentPage)
      button.classList.add('is-active');

    paginationContainer.appendChild(button);
  }
}