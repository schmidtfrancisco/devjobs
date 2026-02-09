const jobListingSection = document.querySelector('.results-list');

jobListingSection.addEventListener('click', (event) => {
  const element = event.target

  if (element.classList.contains('apply-button')) {
    element.textContent = '¡Aplicado!';
    element.classList.add('is-applied');
    element.disabled = true;
  }
})