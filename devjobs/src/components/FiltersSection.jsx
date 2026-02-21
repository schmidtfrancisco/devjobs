export function FiltersSection() {
  return (
    <footer className="search-filters">
      <label htmlFor="technology-filter" hidden aria-hidden="true">Tecnología</label>
      <select id="technology-filter" name="technology">
        <option value="all">Tecnología</option>
        <option value="javascript">JavaScript</option>
        <option value="python">Python</option>
        <option value="java">Java</option>
        <option value="kotlin">Kotlin</option>
        <option value="aws">AWS</option>
      </select>
      <label htmlFor="location-filter" hidden aria-hidden="true">Ubicación</label>
      <select id="location-filter" name="location">
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
      <select id="experience-filter" name="experience">
        <option value="all">Experiencia</option>
        <option value="junior">Junior</option>
        <option value="mid">Mid</option>
        <option value="senior">Senior</option>
      </select>
    </footer>
  )
}