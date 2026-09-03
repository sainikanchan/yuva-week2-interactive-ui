/* =========================================
   Accessible Modal Controller
   ========================================= */

(() => {
  "use strict";

  const openButton = document.getElementById("openModal");
  const closeButton = document.getElementById("closeModal");
  const cancelButton = document.getElementById("cancelModal");
  const confirmButton = document.getElementById("confirmModal");
  const modal = document.getElementById("modal");
  const feedback = document.getElementById("feedback");

  // Fail safely if the expected DOM elements are missing.
  if (!openButton || !closeButton || !cancelButton || !confirmButton || !modal) {
    console.error("Modal initialization failed: required elements are missing.");
    return;
  }

  let lastFocusedElement = null;

  const getFocusableElements = () =>
    modal.querySelectorAll(
      'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled])'
    );

  function openModal() {
    lastFocusedElement = document.activeElement;

    modal.hidden = false;
    document.body.classList.add("modal-open");

    // Allow the browser to apply the initial state before adding the animation class.
    requestAnimationFrame(() => {
      modal.classList.add("is-open");
      closeButton.focus();
    });
  }

  function closeModal(message = "") {
    modal.classList.remove("is-open");
    document.body.classList.remove("modal-open");
    feedback.textContent = message;

    // Keep the element in the DOM long enough for the close transition.
    window.setTimeout(() => {
      modal.hidden = true;

      if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
        lastFocusedElement.focus();
      }
    }, 200);
  }

  function handleKeydown(event) {
    if (modal.hidden) return;

    // ESC closes the modal.
    if (event.key === "Escape") {
      event.preventDefault();
      closeModal();
      return;
    }

    // Trap keyboard focus inside the dialog.
    if (event.key === "Tab") {
      const focusable = [...getFocusableElements()];
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  }

  openButton.addEventListener("click", openModal);
  closeButton.addEventListener("click", () => closeModal());
  cancelButton.addEventListener("click", () => closeModal("Action cancelled."));
  confirmButton.addEventListener("click", () => closeModal("Action completed successfully."));

  // Event delegation makes the backdrop reusable without extra selectors.
  modal.addEventListener("click", (event) => {
    if (event.target.matches("[data-close-modal]")) {
      closeModal();
    }
  });

  document.addEventListener("keydown", handleKeydown);
})();
