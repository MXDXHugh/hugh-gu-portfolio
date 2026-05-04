const lightbox = document.querySelector(".lightbox");
const lightboxImage = document.querySelector(".lightbox-image");
const closeButton = document.querySelector(".lightbox-close");

window.addEventListener("pageshow", () => {
  document.body.classList.remove("is-leaving");
});

document.querySelectorAll("a[href]").forEach((link) => {
  link.addEventListener("click", (event) => {
    const href = link.getAttribute("href");
    const isModifiedClick =
      event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0;

    if (!href || href.startsWith("#") || href.startsWith("mailto:") || link.target || isModifiedClick) {
      return;
    }

    const url = new URL(href, window.location.href);
    const isSameOrigin =
      url.origin === window.location.origin ||
      (url.protocol === "file:" && window.location.protocol === "file:");

    if (!isSameOrigin || url.href === window.location.href) {
      return;
    }

    event.preventDefault();
    document.body.classList.add("is-leaving");
    window.setTimeout(() => {
      window.location.href = url.href;
    }, 180);
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
