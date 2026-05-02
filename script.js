const lightbox = document.querySelector(".lightbox");
const lightboxImage = document.querySelector(".lightbox-image");
const closeButton = document.querySelector(".lightbox-close");

document.querySelectorAll("[data-full]").forEach((button) => {
  button.addEventListener("click", () => {
    const image = button.querySelector("img");
    lightboxImage.src = button.dataset.full;
    lightboxImage.alt = image ? image.alt : "";

    if (typeof lightbox.showModal === "function") {
      lightbox.showModal();
    }
  });
});

closeButton?.addEventListener("click", () => {
  lightbox.close();
});

lightbox?.addEventListener("click", (event) => {
  const box = lightbox.getBoundingClientRect();
  const outside =
    event.clientX < box.left ||
    event.clientX > box.right ||
    event.clientY < box.top ||
    event.clientY > box.bottom;

  if (outside) {
    lightbox.close();
  }
});
