import { useState } from "react"

export function useForm() {
  const [formFields, setFormFields] = useState({})
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const handleSimpleFieldChange = (event, field) => {
    event.preventDefault()
    setFormFields(prevFields => ({
      ...prevFields,
      [field]: event.target.value
    }))
  }

  const handleTextFieldChange = (event, field) => {
    event.preventDefault()
    const text = event.target.value
    const isValid = /^[a-zA-Z\s]*$/.test(text)
    if (!isValid && text !== '') {
      setErrors(prevErrors => ({
        ...prevErrors,
        [field]: 'Solo se permiten letras y espacios'
      }))
    } else {
      setErrors(prevErrors => {
        const newErrors = { ...prevErrors }
        delete newErrors[field]
        return newErrors
      })
      setFormFields(prevFields => ({
        ...prevFields,
        [field]: text
      }))
    }
  }

  const handleNumericFieldChange = (event, field) => {
    event.preventDefault()
    const number = event.target.value
    //Verificar que el campo solo contenga números
    const isValid = /^\d*$/.test(number)
    if (!isValid) {
      setErrors(prevErrors => ({
        ...prevErrors,
        [field]: 'Solo se permiten números'
      }))
    } else {
      setErrors(prevErrors => {
        const newErrors = { ...prevErrors }
        delete newErrors[field]
        return newErrors
      })
      setFormFields(prevFields => ({
        ...prevFields,
        [field]: number
      }))
    }
  }

  const handleEmailFieldChange = (event, field) => {
    event.preventDefault()
    const email = event.target.value
    //Verificar que el campo tenga un formato de correo electrónico válido
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    if (!isValid && email !== '') {
      setErrors(prevErrors => ({
        ...prevErrors,
        [field]: 'Formato de correo electrónico no válido'
      }))
    } else {
      setErrors(prevErrors => {
        const newErrors = { ...prevErrors }
        delete newErrors[field]
        return newErrors
      })
      setFormFields(prevFields => ({
        ...prevFields,
        [field]: email
      }))
    }
  }

  const handleCheckboxChange = (event, skill) => {
    const isChecked = event.target.checked
    setFormFields(prevFields => {
      const newSkills = isChecked
        ? [...(prevFields.skills || []), skill]
        : (prevFields.skills || []).filter(s => s !== skill)
      return {
        ...prevFields,
        skills: newSkills
      }
    })
  }

  const handleFileFieldChange = (file, field) => {
    if (file) {
      setFormFields(prevFields => ({
        ...prevFields,
        [field]: file
      }))
    } else {
      setFormFields(prevFields => {
        const newFields = { ...prevFields }
        delete newFields[field]
      })
    }
  }

  const handleSubmit = (event, formRef) => {
    setIsLoading(true)
    event.preventDefault()
    console.log(formFields)
    formRef.current.reset()
    setFormFields({})
    alert('Perfil actualizado')
    setIsLoading(false)
  }

  return {
    errors,
    isLoading,
    handleSimpleFieldChange,
    handleTextFieldChange,
    handleEmailFieldChange,
    handleNumericFieldChange,
    handleCheckboxChange,
    handleFileFieldChange,
    handleSubmit
  }
}