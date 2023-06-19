import { fetchBreeds,fetchCatByBreed } from './js/cat-api';

const breedSelectEl = document.querySelector(".breed-select");
const loaderEl = document.querySelector(".loader");
const errorEl = document.querySelector(".error");
const catInfo = document.querySelector(".cat-info");
catInfo.style.marginTop = "20px";

loaderEl.style.display = "block";
errorEl.style.display = "none";
breedSelectEl.style.display = "none";

fetchBreeds()
  .then((data) => {
    data.forEach((breed) => {
      const option = document.createElement("option");
      option.value = breed.id;
      option.textContent = breed.name;
      breedSelectEl.appendChild(option);
    });

    loaderEl.style.display = "none";
    breedSelectEl.style.display = "block";
    errorEl.style.display = "none";
  })


  .catch((error) => {
    loaderEl.style.display = "none";
    errorEl.style.display = "block";
    errorEl.style.color = "red";
  });

breedSelectEl.addEventListener("change", () => {
  const selectedBreedId = breedSelectEl.value;
  catInfo.innerHTML = "";
  errorEl.style.display = "none";

  loaderEl.style.display = "block";
  catInfo.style.display = "none";

  fetchCatByBreed(selectedBreedId)
    .then((cat) => {
      const breed = cat.breeds && cat.breeds.length > 0 ? cat.breeds[0] : null;

      if (breed) {
        const image = document.createElement("img");
        image.src = cat.url;
        image.width =900;
        catInfo.appendChild(image);

        const infoContainer = document.createElement("div");
        infoContainer.style.marginLeft = "50px";
        infoContainer.style.width = "400px";

        const breedName = document.createElement("h3");
        breedName.textContent = breed.name;
        infoContainer.appendChild(breedName);

        const description = document.createElement("p");
        description.textContent = breed.description;
        infoContainer.appendChild(description);

        const temperament = document.createElement("p");
        const temperamentLabel = document.createElement("strong");
        temperamentLabel.textContent = "Temperament: ";
        temperament.appendChild(temperamentLabel);

        const temperamentText = document.createTextNode(breed.temperament);
        temperament.appendChild(temperamentText);

        infoContainer.appendChild(temperament);

        catInfo.appendChild(infoContainer);


        loaderEl.style.display = "none";
        catInfo.style.display = "flex";
      }
    })
    .catch((error) => {
      loaderEl.style.display = "none";
      errorEl.style.display = "block";
      errorEl.style.color = "red";
    });
});
