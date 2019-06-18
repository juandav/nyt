import Cookies from 'js-cookie'

/**
 * 
 * @param {boolean} withToken true || false
 */
export const getHeaders = (withToken = false) => {
  try {
    const token = Cookies.get('token')
    let header = {
      'Content-Type': 'application/json'
    }
    if (withToken) 
      header['Authorization'] = `Bearer ${token}`
    
    return header
  } catch (error) {
    console.error(`getHeaders: ${error.message}`)
  }
}

export const getCookie = name => {
  try {
    return Cookies.get(name)
  } catch (error) {
    console.error(`getCookie ${error.message}`)
  }
}

export const setCookie = (name, value) => {
  try {
    Cookies.set(name, value)
  } catch (error) {
    console.error(`setCookie: ${error.message}`)
  }
}

export const removeCookie = name => {
  try {
    Cookies.remove(name)
  } catch (error) {
    console.error(`removeCookie: ${error.message}`)
  }
}