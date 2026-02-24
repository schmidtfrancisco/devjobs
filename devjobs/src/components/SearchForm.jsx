import { useId, useState } from "react"

const useSearchForm = ( { idText, idTechnology, idLocation, idExperienceLevel, onSearch }) => {
  const [searchText, setSearchText] = useState('')
  
  const handleFormChange = (event) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const filters = {
      search: formData.get(idText),
      technology: formData.get(idTechnology),
      location: formData.get(idLocation),
      experienceLevel: formData.get(idExperienceLevel)
    }
    setSearchText(filters.search)
    onSearch(filters)
  }

  const handleReset = () => {
    const filters = {
      search: '',
      technology: 'all',
      location: 'all',
      experienceLevel: 'all'
    }
    setSearchText(filters.search)
    onSearch(filters)
  }

  return {
    searchText,
    handleFormChange,
    handleReset
  }
}

export function SearchForm({ onSearch }) {
  const idText = useId()
  const idTechnology = useId()
  const idLocation = useId()
  const idExperienceLevel = useId()
  const [focusedField, setFocusField] = useState(null)
  const { handleFormChange, handleReset } = useSearchForm(
    { idText, idTechnology, idLocation, idExperienceLevel, onSearch}
  )
  
  return (
    <form onChange={handleFormChange} role="search">
      <div className={(focusedField === 'search') ? 'search-bar focused-field' : 'search-bar'}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"
          className="icon icon-tabler icons-tabler-outline icon-tabler-search">
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M3 10a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
          <path d="M21 21l-6 -6" />
        </svg>
        <input
          name={idText}
          onFocus={() => setFocusField('search')}
          onBlur={() => setFocusField(null)}
          id="job-search" type="text"
          placeholder="Buscar trabajos, empresas o habilidades..."
        />
        {focusedField === 'search' && (
          <small className="input-hint">Busca por título de trabajo, empresa o tecnología</small>
        )}
      </div>
      <footer className="search-filters">
        <label htmlFor="technology-filter" hidden aria-hidden="true">Tecnología</label>
        <select
          id="technology-filter"
          name={idTechnology}
          onFocus={() => setFocusField('technology-filter')}
          onBlur={() => setFocusField(null)}
        >
          <option value="all">Tecnología</option>
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
          <option value="kotlin">Kotlin</option>
          <option value="aws">AWS</option>
        </select>
        <label htmlFor="location-filter" hidden aria-hidden="true">Ubicación</label>
        <select
          id="location-filter"
          name={idLocation}
          onFocus={() => setFocusField('location-filter')}
          onBlur={() => setFocusField(null)}
          className={(focusedField === 'location-filter') ? 'focused-field' : ''}
        >
          <option value="all">Ubicación</option>
          <option value="bsas">Buenos Aires</option>
          <option value="barcelona">Barcelona</option>
          <option value="cdmx">Ciudad de México</option>
          <option value="guadalajara">Guadalajara</option>
          <option value="madrid">Madrid</option>
          <option value="valencia">Valencia</option>
          <option value="bogota">Bogotá</option>
          <option value="lima">Lima</option>
          <option value="santiago">Santiago de chile</option>
          <option value="monterrey">Monterrey</option>
          <option value="remoto">Remoto</option>
        </select>
        <label htmlFor="experience-filter" hidden aria-hidden="true">Experiencia</label>
        <select 
          id="experience-filter" 
          name={idExperienceLevel}
          onFocus={() => setFocusField('experience-filter')} 
          onBlur={() => setFocusField(null)}
          className={(focusedField === 'experience-filter') ? 'focused-field' : ''}
        >
          <option value="all">Experiencia</option>
          <option value="junior">Junior</option>
          <option value="mid">Mid</option>
          <option value="senior">Senior</option>
        </select>
        <button className='button' type="reset" onClick={handleReset}>Limpiar filtros</button>
      </footer>
    </form>
  )
}