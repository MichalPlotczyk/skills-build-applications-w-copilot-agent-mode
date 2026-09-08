export interface ApiItem {
  _id?: string
  [key: string]: unknown
}

export async function fetchCollection(endpoint: string): Promise<ApiItem[]> {
  const response = await fetch(endpoint)
  if (!response.ok) throw new Error(`Unable to load ${endpoint} (${response.status})`)
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