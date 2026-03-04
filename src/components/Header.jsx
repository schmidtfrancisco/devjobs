import { NavLink } from "react-router";
import { useAuthStore } from "../store/authStore";
import { useFavoritesStore } from "../store/favoritesStore";

export function Header() {
  const { isLoggedIn, login, logout} = useAuthStore()
  const { countFavorites } = useFavoritesStore()
  const numberOfFavorites = countFavorites()
  return (
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
        <NavLink
          className={({ isActive }) => isActive ? 'nav-link-active' : ''}
          to="/"
        >
          Inicio
        </NavLink>
        <NavLink
          className={({ isActive }) => isActive ? 'nav-link-active' : ''}
          to="/search"
        >
          Empleos
        </NavLink>
        {
          isLoggedIn && (
            <NavLink
              className={({ isActive }) => isActive ? 'nav-link-active' : ''}
              to='/profile'
            >
              Perfil ⭐ {numberOfFavorites}
            </NavLink>
          )

        }
      </nav>
      <div>
        {
          isLoggedIn
            ? <button className="button" onClick={logout}>Cerrar sesión</button>
            : <button className="button" onClick={login}>Iniciar sesión</button>
        }
        {//<devjobs-avatar service="x" username="midudev" size="32"></devjobs-avatar>
        }
      </div>
    </header>
  )
}