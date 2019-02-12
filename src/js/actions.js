const login = () => {
  return {
    type: 'LOG_IN',
  }
}

const logout = () => {
  return {
    type: 'LOG_OUT'
  }
}

export { login, logout }
