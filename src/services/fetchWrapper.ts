export async function fetchWrapper<T>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(errorText || 'Something went wrong')
  }

  const contentType = response.headers.get('Content-Type') || ''

  if (contentType.includes('application/json')) {
    return await response.json() as T
  } else {
    return {} as T
  }
}
