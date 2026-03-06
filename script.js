const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const availabilityForm = document.getElementById("availability-form");
const formStatus = document.getElementById("form-status");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation menu" : "Open navigation menu"
    );
  });
}

function setError(fieldId, message) {
  const field = document.getElementById(fieldId);
  const error = document.getElementById(`${fieldId}-error`);

  if (!field || !error) return;

  field.setAttribute("aria-invalid", "true");
  error.textContent = message;
}

function clearError(fieldId) {
  const field = document.getElementById(fieldId);
  const error = document.getElementById(`${fieldId}-error`);

  if (!field || !error) return;

  field.removeAttribute("aria-invalid");
  error.textContent = "";
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

if (availabilityForm) {
  availabilityForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const nameField = document.getElementById("name");
    const emailField = document.getElementById("email");

    const name = nameField.value.trim();
    const email = emailField.value.trim();

    let hasError = false;

    clearError("name");
    clearError("email");

    if (!name) {
      setError("name", "Please enter your full name.");
      hasError = true;
    }

    if (!email) {
      setError("email", "Please enter your email address.");
      hasError = true;
    } else if (!isValidEmail(email)) {
      setError("email", "Please enter a valid email address.");
      hasError = true;
    }

    if (hasError) {
      formStatus.className = "form-status";
      formStatus.textContent = "Please correct the highlighted fields and try again.";
      formStatus.classList.add("is-visible");
      formStatus.focus();

      const firstInvalid = availabilityForm.querySelector('[aria-invalid="true"]');
      if (firstInvalid) {
        firstInvalid.focus();
      }
      return;
    }

    formStatus.className = "form-status is-visible is-success";
    formStatus.textContent =
      "Preview mode only: this form is not connected to a live email or booking service yet.";
    formStatus.focus();
  });
}
