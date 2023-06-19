const KEY_API = 'live_ov5icfKqNdcKLeo27W0nPTAEDNwLrOEUXrIBZVV02jU9clkOvh0q0XbqLPoYUeQJ';
const BASE_URL = 'https://api.thecatapi.com/v1/';

export function fetchBreeds() {
  return fetch(`${BASE_URL}breeds?api_key=${KEY_API}`)
  .then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  })
};

export function fetchCatByBreed(breedId) {
  return fetch(`${BASE_URL}images/search?breed_ids=${breedId}&api_key=${KEY_API}`)
  .then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  })
  .then((data) => {
    if (data.length > 0) {
      return data[0];
    } else {
      throw new Error("No cat found for the selected breed.");
    }
  });
}