export async function parseBody(response) {
  const text = await response.text();
  return text ? JSON.parse(text) : null;
}
