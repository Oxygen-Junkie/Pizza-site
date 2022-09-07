export default function fileHeader(): Record<string, string> {
  const storedUser = localStorage.getItem('user')
  const user = JSON.parse(storedUser || '')

  if (user && user.accessToken) {
    return {
      'x-access-token': user.accessToken,
      'Content-Type': 'multipart/form-data',
    }
  }
  else { return {} }
}

