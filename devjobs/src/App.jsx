
function App() {

  return (
    <>
      <header className="navbar">
        <h1>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-code">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M7 8l-4 4l4 4" />
            <path d="M17 8l4 4l-4 4" />
            <path d="M14 4l-4 16" />
          </svg>
          DevJobs
        </h1>
        <nav>
          <a href="/">Inicio</a>
          <a href="empleos.html">Empleos</a>
        </nav>
        <div>
          {//<devjobs-avatar service="x" username="midudev" size="32"></devjobs-avatar>
          }
        </div>
      </header>

      <main className="search-main">
        <section className="search-section">
          <h1>Encuentra tu próximo trabajo</h1>
          <p>Explora miles de oportunidades en el sector tecnológico.</p>

          <form role="search">
            <div className="search-bar">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"
                className="icon icon-tabler icons-tabler-outline icon-tabler-search">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M3 10a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
                <path d="M21 21l-6 -6" />
              </svg>
              <input id="job-search" type="text" placeholder="Buscar trabajos, empresas o habilidades..." />
            </div>

            <footer className="search-filters">
              <label for="technology-filter" hidden aria-hidden="true">Tecnología</label>
              <select id="technology-filter" name="technology">
                <option value="all">Tecnología</option>
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
                <option value="java">Java</option>
                <option value="kotlin">Kotlin</option>
                <option value="aws">AWS</option>
              </select>
              <label for="location-filter" hidden aria-hidden="true">Ubicación</label>
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
              <label for="experience-filter" hidden aria-hidden="true">Experiencia</label>
              <select id="experience-filter" name="experience">
                <option value="all">Experiencia</option>
                <option value="junior">Junior</option>
                <option value="mid">Mid</option>
                <option value="senior">Senior</option>
              </select>

            </footer>
          </form>
        </section>
        <section className="search-results">
          <header>
            <h2>Resultados de búsqueda</h2>
          </header>
          <footer className="results-list">
          </footer>
          <p className="results-number"></p>
        </section>
        <nav className="pagination">

        </nav>
      </main>
      <footer className="global-footer">
        <small>&copy; 2026 DevJobs. Todos los derechos reservados.</small>
      </footer>

    </>
  )
}

export default App
