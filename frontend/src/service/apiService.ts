const API_URL = import.meta.env.VITE_API_URL;

export async function generateImage(word: string): Promise<Blob> {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ word })
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.error || 'Request failed');
  }

  return response.blob();
}
