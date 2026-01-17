export async function apiFetch<T>(
  input: string,
  init?: RequestInit
): Promise<T> {
  const res = await fetch(input, init)
  if (!res.ok) {
    throw new Error(`Request failed: ${res.status}`)
  }
  return res.json()
}
