import { useRouter } from "../hooks/useRouter"

export function HomePage() {

  const { navigateTo } = useRouter()

  const handleSearch = (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const searchTerm = formData.get('search')

    const url = searchTerm
      ? `/search?text=${encodeURIComponent(searchTerm)}`
      : '/search'

    navigateTo(url)
  }

  return (
    <main>
      <section className="hero">
        <img src="./background.webp" alt="DevJobs Logo" width="200" />

        <h1>Encuentra el trabajo de tus sueños</h1>

        <p>Únete a nuestra comunidad de desarrolladores y encuentra el empleo perfecto para ti.</p>

        <form className="search-offer" role="search" onSubmit={handleSearch}>
          <div>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M3 10a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
              <path d="M21 21l-6 -6" />
            </svg>
            <input type="text" name="search" required placeholder="Buscar ofertas de trabajo..." />
            <button className="button primary-button" type="submit">Buscar</button>
          </div>
        </form>
      </section>

      <section className="features">
        <header>
          <h2>¿Por qué DevJobs?</h2>
          <p>DevJobs es una plataforma especializada para desarrolladores que busca conectar a los profesionales
            con las mejores oportunidades laborales en el sector tecnológico.</p>
        </header>
        <footer className="features-grid">
          <article className="feature-card">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M3 9a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2l0 -9" />
              <path d="M8 7v-2a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v2" />
              <path d="M12 12l0 .01" />
              <path d="M3 13a20 20 0 0 0 18 0" />
            </svg>
            <h3>Encuentra el trabajo de tus sueños</h3>
            <p>Explora una amplia variedad de ofertas de trabajo diseñadas específicamente para desarrolladores.
            </p>
          </article>

          <article className="feature-card">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M5 7a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
              <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              <path d="M21 21v-2a4 4 0 0 0 -3 -3.85" />
            </svg>
            <h3>Conecta con las mejores empresas</h3>
            <p>Trabaja con empresas líderes en tecnología que valoran el talento y la innovación.</p>
          </article>

          <article className="feature-card">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M3 21h18" />
              <path d="M5 21v-12l5 4v-4l5 4h4" />
              <path d="M19 21v-8l-1.436 -9.574a.5 .5 0 0 0 -.495 -.426h-1.145a.5 .5 0 0 0 -.494 .418l-1.43 8.582" />
              <path d="M9 17h1" />
              <path d="M14 17h1" />
            </svg>
            <h3>Recibe alertas personalizadas</h3>
            <p>Mantente informado sobre las últimas ofertas de trabajo que se ajustan a tus habilidades y
              preferencias.</p>
          </article>
        </footer>
      </section>
    </main>
  )
}