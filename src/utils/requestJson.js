export async function getSapatos() {
  try {
    const response = await fetch(`/data/sapatos.json`);
    if (!response.ok) {
      throw new Error('Erro ao carregar o JSON');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao buscar sapatos:', error);
    return [];
  }
}