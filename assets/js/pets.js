const initPetsPhoto = () => {
  const wrappers = document.querySelectorAll(".pets-photo-trigger-wrap");

  wrappers.forEach((wrapper) => {
    const trigger = wrapper.querySelector(".pets-photo-trigger");
    if (!trigger) return;

    const setOpen = (open) => {
      wrapper.classList.toggle("is-open", open);
      trigger.setAttribute("aria-expanded", String(open));
    };

    let openBeforePointerDown = false;

    trigger.addEventListener("pointerdown", () => {
      openBeforePointerDown = wrapper.classList.contains("is-open");
    });

    trigger.addEventListener("click", (event) => {
      event.stopPropagation();
      if (event.detail === 0) {
        setOpen(true);
      } else {
        setOpen(!openBeforePointerDown);
      }
    });

    trigger.addEventListener("focus", () => setOpen(true));
    trigger.addEventListener("blur", () => {
      window.setTimeout(() => {
        if (!wrapper.contains(document.activeElement)) setOpen(false);
      }, 0);
    });

    document.addEventListener("pointerdown", (event) => {
      if (!wrapper.contains(event.target)) setOpen(false);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && wrapper.classList.contains("is-open")) {
        setOpen(false);
        trigger.focus();
      }
    });
  });

  document.documentElement.dataset.petsInteractive = "true";
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initPetsPhoto, { once: true });
} else {
  initPetsPhoto();
}
