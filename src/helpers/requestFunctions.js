export const loginRequest = async (formData) => {
  const { email, password } = formData
  try {
    const url = `${import.meta.env.VITE_BACKEND_URL}/api/users/login`
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })

    const data = await response.json()
    if (!response.ok) {
      return { msg: data.msg, error: true }
    }

    // Save auth token for future automatic logins (Expires when log out or 28d)
    window.localStorage.setItem('auth_token', data.token)

    return { msg: data.msg, error: false, userLogged: data } // Data set to authContext on useFetch
  } catch (error) {
    return { msg: 'Error occurred during the request', error: true }
  }
}

export const signUpRequest = async (formData) => {
  const { name, email, password } = formData
  try {
    const url = `${import.meta.env.VITE_BACKEND_URL}/api/users`
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password })
    })

    const data = await response.json()

    if (!response.ok) { // All server validations (Errors)
      return { msg: data.msg, error: true }
    }

    return { msg: data.msg, error: false, userSigned: data }
  } catch (error) {
    return { msg: 'Error occurred during the request', error: true }
  }
}

export const forgotPasswordRequest = async (formData) => {
  const { email } = formData
  try {
    const url = `${import.meta.env.VITE_BACKEND_URL}/api/users/forgot-password`
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email })
    })

    const data = await response.json()

    if (!response.ok) {
      return { msg: data.msg, error: true }
    }

    return { msg: data.msg, error: false }
  } catch (error) {
    return { msg: 'Error occurred during the request', error: true }
  }
}

export const newPasswordRequest = async (formData) => {
  const { password, resetToken } = formData

  try {
    const url = `${import.meta.env.VITE_BACKEND_URL}/api/users/reset-password/${resetToken}`
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ password })
    })

    const data = await response.json()
    if (!response.ok) {
      return { msg: data.msg, error: true }
    }

    return { msg: data.msg, error: false }
  } catch (error) {
    return { msg: 'Error occurred during the request', error: true }
  }
}

export const newProject = async (formData) => {
  const AUTH_TOKEN = window.localStorage.getItem('auth_token')
  const { name, description, deadLine, client } = formData
  if (!AUTH_TOKEN) {
    return
  }

  try {
    const url = `${import.meta.env.VITE_BACKEND_URL}/api/projects`
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${AUTH_TOKEN}`
      },
      body: JSON.stringify({ name, description, deadLine, client })
    })
    const data = await response.json()

    if (!response.ok) {
      return { msg: data.msg, error: true }
    }

    return { msg: data.msg, error: false, savedProject: data.savedProject }
  } catch (error) {
    return { msg: 'Error occurred during the request', error: true }
  }
}

export const updateProject = async (formData) => {
  const AUTH_TOKEN = window.localStorage.getItem('auth_token')
  const { id, name, description, deadLine, client } = formData
  if (!AUTH_TOKEN) {
    return
  }

  try {
    const url = `${import.meta.env.VITE_BACKEND_URL}/api/projects/${id}`
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${AUTH_TOKEN}`
      },
      body: JSON.stringify({ name, deadLine, description, client })
    })
    const data = await response.json()
    if (!response.ok) {
      return { msg: data.msg, error: true }
    }

    return { msg: data.msg, error: false, updatedProject: data.updatedProject }
  } catch (error) {
    return { msg: 'Error occurred during the request', error: true }
  }
}

export const deleteProject = async (formData) => {
  const AUTH_TOKEN = window.localStorage.getItem('auth_token')
  const { id } = formData
  if (!AUTH_TOKEN) {
    return
  }

  try {
    const url = `${import.meta.env.VITE_BACKEND_URL}/api/projects/${id}`
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${AUTH_TOKEN}`
      },
      body: JSON.stringify({ id })
    })
    const data = await response.json()

    if (!response.ok) {
      return { msg: data.msg, error: true }
    }

    return { msg: data.msg, error: false, deletedProject: data.deletedProject }
  } catch (error) {
    return { msg: 'Error occurred during the request', error: true }
  }
}

export const addTask = async (formData) => {
  const AUTH_TOKEN = window.localStorage.getItem('auth_token')
  const { name, description, deadLine, priority, project } = formData
  if (!AUTH_TOKEN) {
    return
  }

  try {
    const url = `${import.meta.env.VITE_BACKEND_URL}/api/tasks`
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${AUTH_TOKEN}`
      },
      body: JSON.stringify({ name, description, deadLine, priority, project })
    })

    const data = await response.json()

    if (!response.ok) {
      return { msg: data.msg, error: true }
    }

    return { msg: data.msg, error: false, addedTask: data.addedTask }
  } catch (error) {
    return { msg: 'Error occurred during the request', error: true }
  }
}

export const editTask = async (formData) => {
  const AUTH_TOKEN = window.localStorage.getItem('auth_token')
  const { id, name, description, deadLine, priority, project } = formData

  if (!AUTH_TOKEN) {
    return
  }

  try {
    const url = `${import.meta.env.VITE_BACKEND_URL}/api/tasks/${id}`
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${AUTH_TOKEN}`
      },
      body: JSON.stringify({ name, description, deadLine, priority, project })
    })

    const data = await response.json()

    if (!response.ok) {
      return { msg: data.msg, error: true }
    }

    return { msg: data.msg, error: false, editedTask: data.editedTask }
  } catch (error) {
    return { msg: 'Error occurred during the request', error: true }
  }
}

// Update Status On DragEnd
export const updateTaskStatus = async (itemToUpdate) => {
  const AUTH_TOKEN = window.localStorage.getItem('auth_token')
  const { _id, status } = itemToUpdate

  if (!AUTH_TOKEN) {
    return
  }

  try {
    const url = `${import.meta.env.VITE_BACKEND_URL}/api/tasks/${_id}`
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${AUTH_TOKEN}`
      },
      body: JSON.stringify({ status })
    })
    const data = await response.json()
    if (!response.ok) {
      return { msg: data.msg, error: true }
    }
    return { msg: data.msg, error: false, editedTask: data.editedTask }
  } catch (error) {
    return { msg: 'Error occurred during the request', error: true }
  }
}
export const deleteTask = async (formData) => {
  const AUTH_TOKEN = window.localStorage.getItem('auth_token')
  const { id } = formData

  if (!AUTH_TOKEN) {
    return
  }

  try {
    const url = `${import.meta.env.VITE_BACKEND_URL}/api/tasks/${id}`
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${AUTH_TOKEN}`
      },
      body: JSON.stringify({ id })
    })
    const data = await response.json()

    if (!response.ok) {
      return { msg: data.msg, error: true }
    }

    return { msg: data.msg, error: false, deletedTask: data.deletedTask }
  } catch (error) {
    return { msg: 'Error occurred during the request', error: true }
  }
}

export const searchCollab = async (formData) => {
  const AUTH_TOKEN = window.localStorage.getItem('auth_token')
  const { email } = formData
  if (!AUTH_TOKEN) return

  try {
    const url = `${import.meta.env.VITE_BACKEND_URL}/api/projects/collabs`
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${AUTH_TOKEN}`
      },
      body: JSON.stringify({ email })
    })
    const data = await response.json()

    if (!response.ok) {
      return { msg: data.msg, error: true }
    }
    return { msg: data.msg, error: false, userFound: data.userFound }
  } catch (error) {
    return { msg: 'Error occurred during the request', error: true }
  }
}

export const addCollab = async (formData) => {
  const AUTH_TOKEN = window.localStorage.getItem('auth_token')

  const { id, email } = formData
  if (!AUTH_TOKEN) return

  try {
    const url = `${import.meta.env.VITE_BACKEND_URL}/api/projects/collabs/${id}` //
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${AUTH_TOKEN}`
      },
      body: JSON.stringify({ email })
    })

    const data = await response.json()

    if (!response.ok) {
      return { msg: data.msg, error: true }
    }

    return { msg: data.msg, error: false, addedCollab: data.addedCollab }
  } catch (error) {
    return { msg: 'Error occurred during the request', error: true }
  }
}
export const deleteCollab = async (formData) => {
  const AUTH_TOKEN = window.localStorage.getItem('auth_token')
  const { projectId, collaboratorId } = formData
  if (!AUTH_TOKEN) return

  try {
    const url = `${import.meta.env.VITE_BACKEND_URL}/api/projects/delete-collab/${projectId}` //
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${AUTH_TOKEN}`
      },
      body: JSON.stringify({ collaboratorId })
    })

    const data = await response.json()

    if (!response.ok) {
      return { msg: data.msg, error: true }
    }
    return { msg: data.msg, error: false, deletedCollaboratorId: data.deletedCollaboratorId }
  } catch (error) {
    return { msg: 'Error occurred during the request', error: true }
  }
}
// 🔽 USED IN PROJECTSCONTEXT FOR MANTAIN FRONTEND UPDATED WITH BACKEND WITHOUT MANY REQUEST TO DB 🔽

export const getProjects = async () => {
  const AUTH_TOKEN = window.localStorage.getItem('auth_token')
  if (!AUTH_TOKEN) return
  try {
    const url = `${import.meta.env.VITE_BACKEND_URL}/api/projects`
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${AUTH_TOKEN}`
      }
    })
    const data = await response.json()
    if (!response.ok) {
      return { msg: data.msg, error: true }
    }
    return data
  } catch (error) {
    return { msg: 'Error occurred during the request', error: true }
  }
}

export const getProject = async (id) => {
  const AUTH_TOKEN = window.localStorage.getItem('auth_token')
  try {
    if (!AUTH_TOKEN) return

    const url = `${import.meta.env.VITE_BACKEND_URL}/api/projects/${id}`
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${AUTH_TOKEN}`
      }
    })
    const data = await response.json()

    if (!response.ok) {
      return { msg: data.msg, error: true }
    }

    return data
  } catch (error) {
    return { msg: 'Error occurred during the request', error: true }
  }
}
