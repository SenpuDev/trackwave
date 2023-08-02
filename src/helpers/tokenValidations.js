export const checkForgotPasswordToken = async (token) => {
  try {
    const url = `${import.meta.env.VITE_BACKEND_URL}/api/users/reset-password/${token}`
    const response = await fetch(url)

    if (!response.ok) {
      return false
    }

    return true
  } catch (error) {
    return false
  }
}

export const checkVerifyAccountToken = async (token) => {
  try {
    const url = `${import.meta.env.VITE_BACKEND_URL}/api/users/verify/${token}`
    const response = await fetch(url)

    if (!response.ok) {
      return false
    }

    return true
  } catch (error) {
    return false
  }
}
