import axios from 'axios';
const API_URL = 'https://pixabay.com/api/';
const KEY = '36135097-9ce084688f13669976d3cf799';

export async function getPhoto (searchValue, page) {
  try {
    const response = await axios.get(API_URL, {
      params: {
        key: KEY,
        q: searchValue,
        page: page,
        per_page: 12,
      },
    });

    return response.data.hits;
  } catch (error) {
    // Obsługa błędu, jeśli wystąpi
    console.error('Wystąpił błąd podczas pobierania zdjęć:', error);
    throw error;
  }
}