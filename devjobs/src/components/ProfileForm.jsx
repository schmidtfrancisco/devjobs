import { useRef, useState } from "react"
import { useForm } from "../hooks/useForm"

export function ProfileForm() {
  const inputRef = useRef(null)
  const formRef = useRef(null)
  const {
    errors,
    isLoading,
    handleSimpleFieldChange,
    handleTextFieldChange,
    handleEmailFieldChange,
    handleNumericFieldChange,
    handleCheckboxChange,
    handleFileFieldChange,
    handleSubmit
  } = useForm()
  const [isDragging, setIsDragging] = useState(false)
  const [fileName, setFileName] = useState(null)
  

  const handleDragClick = () => {
    inputRef.current.click()
  }

  const handleDragOver = (event) => {
    event.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (event) => {
    event.preventDefault()
    setIsDragging(false)

    const file = event.dataTransfer.files[0]
    if (file) {
      setFileName(file.name)
      handleFileFieldChange(file, 'cv')
    }
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (file) 
      setFileName(file.name)
    handleFileFieldChange(file, 'cv')
  }

  return (
    <form className="profile-form" onSubmit={(e) => handleSubmit(e, formRef)} ref={formRef}>
      <fieldset className="info-fieldset">
        <legend>Información personal</legend>
        <div className="form-group">
          <label htmlFor="name">Nombre</label>
          <input 
            id="name" 
            type="text" 
            placeholder="Marisa" 
            onChange={((e) => handleTextFieldChange(e, 'name'))}
          />
          {errors?.name &&
            <p className="input-error">{errors.name}</p>
          }
        </div>
        <div className="form-group">
          <label htmlFor="email">Correo electrónico</label>
          <input 
            id="email" 
            type="email" 
            placeholder="marisa@example.com" 
            onChange={((e) => handleEmailFieldChange(e, 'email'))}
          />
          {errors?.email &&
            <p className="input-error">{errors.email}</p>
          }
        </div>
        <div className="form-group">
          <label htmlFor="location">Ubicación</label>
          <input 
            id="location" 
            name="location" 
            type="text" 
            placeholder="Barcelona, España"
            onChange={((e) => handleSimpleFieldChange(e, 'location'))}  
          />
        </div>
        <div id="bio-section" className="form-group">
          <label htmlFor="bio">Sobre mí</label>
          <textarea 
            id="bio" 
            placeholder="Escribe algo sobre ti..." 
            onChange={((e) => handleSimpleFieldChange(e, 'about'))}
          />
        </div>
      </fieldset>
      <fieldset className="experience-fieldset">
        <legend>Experiencia</legend>
        <div className="form-group">
          <label htmlFor="experience">Cargo</label>
          <input 
            id="experience" 
            type="text" 
            placeholder="Cargo"
            onChange={((e) => handleTextFieldChange(e, 'experience'))}
          />
          {errors?.experience &&
            <p className="input-error">{errors.experience}</p>
          }
        </div>
        <div className="form-group">
          <label htmlFor="company">Empresa</label>
          <input 
            id="company" 
            type="text" 
            placeholder="Nombre de la empresa" 
            onChange={((e) => handleSimpleFieldChange(e, 'company'))}
          />
        </div>
        <div className="form-group">
          <label htmlFor="experienceYears">Años de experiencia</label>
          <input 
            id="experiencYears" 
            type="text" 
            placeholder="10" 
            onChange={((e) => handleNumericFieldChange(e, 'experienceYears'))}
          />
          {errors?.experienceYears &&
            <p className="input-error">{errors.experienceYears}</p>
          }
        </div>
      </fieldset>
      <fieldset className="skills-fieldset">
        <h3>Habilidades</h3>
        <div className="skills-options">
          <input className="skill-input" id="javascript" name="skills[]" value="javascript" type="checkbox" onChange={(e) => handleCheckboxChange(e, 'javascript')} />
          <label className="skill-button" htmlFor="javascript">JavaScript</label>
          <input className="skill-input" id="python" name="skills[]" value="python" type="checkbox" onChange={(e) => handleCheckboxChange(e, 'python')} />
          <label className="skill-button" htmlFor="python">Python</label>
          <input className="skill-input" id="java" name="skills[]" value="java" type="checkbox" onChange={(e) => handleCheckboxChange(e, 'java')} />
          <label className="skill-button" htmlFor="java">Java</label>
          <input className="skill-input" id="kotlin" name="skills[]" value="kotlin" type="checkbox" onChange={(e) => handleCheckboxChange(e, 'kotlin')} />
          <label className="skill-button" htmlFor="kotlin">Kotlin</label>
          <input className="skill-input" id="aws" name="skills[]" value="aws" type="checkbox" onChange={(e) => handleCheckboxChange(e, 'aws')} />
          <label className="skill-button" htmlFor="aws">AWS</label>
        </div>
      </fieldset>
      <fieldset className="cv-fieldset">
        <legend>CV</legend>
        <div
          className={`dropzone ${isDragging ? "dragover" : ""}`}
          onClick={handleDragClick}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            type="file"
            ref={inputRef}
            onChange={handleFileChange}
            style={{ display: "none" }}
            accept=".pdf,.doc,.docx"
          />
          {fileName ? (
            <p>{fileName}</p>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-cloud-upload"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M7 18a4.6 4.4 0 0 1 0 -9a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7h-1" /><path d="M9 15l3 -3l3 3" /><path d="M12 12l0 9" /></svg>
              <p><strong>Sube tu CV</strong> o arrastra y suelta</p>
              <span>PDF, DOC, DOCX (MAX. 5MB)</span>
            </>
          )}
        </div>
      </fieldset>
      <button className="button secondary-button" type="submit" disabled={Object.keys(errors).length > 0 || isLoading }>Guardar cambios</button>
    </form>
  )
}