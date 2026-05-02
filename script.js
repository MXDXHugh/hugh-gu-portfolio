const lightbox = document.querySelector(".lightbox");
const lightboxImage = document.querySelector(".lightbox-image");
const closeButton = document.querySelector(".lightbox-close");

const clickables = document.querySelectorAll("a, button");

clickables.forEach((element) => {
  element.addEventListener("click", (event) => {
    element.classList.add("is-clicking");
    window.setTimeout(() => element.classList.remove("is-clicking"), 150);

    if (!(element instanceof HTMLAnchorElement)) {
      return;
    }

    const href = element.getAttribute("href");
    const isModifiedClick =
      event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0;
    const shouldStayOnPage =
      !href ||
      href.startsWith("#") ||
      href.startsWith("mailto:") ||
      href.startsWith("http") ||
      element.target ||
      isModifiedClick;

    if (shouldStayOnPage) {
      return;
    }

    event.preventDefault();
    document.body.classList.add("is-leaving");
    window.setTimeout(() => {
      window.location.href = element.href;
    }, 140);
  });
});

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
