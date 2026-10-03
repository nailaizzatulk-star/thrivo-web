const API_URL = import.meta.env.VITE_API_BASE_URL

export async function getItems(params = {}) {
  const query = new URLSearchParams(params).toString()

  const response = await fetch(
    `${API_URL}/api/items${query ? `?${query}` : ''}`
  )

  const result = await response.json()

  if (!response.ok) {
    throw new Error(result.message || 'Gagal mengambil data barang')
  }

  return result
}

export async function getItemById(id) {
  const response = await fetch(`${API_URL}/api/items/${id}`)

  const result = await response.json()

  if (!response.ok) {
    throw new Error(result.message || 'Gagal mengambil detail barang')
  }

  return result
}

getItems()
  .then((result) => {
    console.log('ITEMS DARI BACKEND:', result)
  })
  .catch((error) => {
    console.error('GAGAL:', error)
  })