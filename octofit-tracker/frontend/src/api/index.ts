export interface ApiItem {
  _id?: string
  [key: string]: unknown
}

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
export const API_BASE_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api'

export async function fetchCollection(resource: string): Promise<ApiItem[]> {
  const response = await fetch(`${API_BASE_URL}/${resource}/`)
  if (!response.ok) throw new Error(`Unable to load ${resource} (${response.status})`)
  const payload: unknown = await response.json()
  if (Array.isArray(payload)) return payload as ApiItem[]
  if (payload && typeof payload === 'object') {
    const record = payload as Record<string, unknown>
    for (const key of ['data', 'items', 'results']) {
      if (Array.isArray(record[key])) return record[key] as ApiItem[]
    }
    return [record as ApiItem]
  }
  return []
}