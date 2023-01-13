export const base64FromFile = (file: File): Promise<string | null> => {
  const reader = new FileReader()
  reader.readAsDataURL(file)

  return new Promise((resolve, reject) => {
    reader.onload = () => {
      const result = reader.result as string | null
      resolve(result)
    }

    reader.onerror = (error) => {
      reject(error)
    }
  })
}