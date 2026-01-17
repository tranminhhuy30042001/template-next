// src/lib/apiFetch.ts
export async function apiFetch<T>(
  input: RequestInfo,
  init?: RequestInit
): Promise<T> {
  const res = await fetch(input, init)

  if (!res.ok) {
    let message = `Request failed: ${res.status}`

    try {
      const data = await res.json()
      if (data?.message) message = data.message
    } catch {}

    const error = new Error(message)
    ;(error as any).status = res.status

    throw error
  }

  return res.json()
}
