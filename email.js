function contact(event) {
  event.preventDefault();

  const form = document.getElementById("contact__form");
  const name = form?.elements["user_name"]?.value;
  const email = form?.elements["user_email"]?.value;
  const message = form?.elements["message"]?.value;

console.info('[form submit]', { name, email, message })
}

document.addEventListener("DOMContentLoaded", () => {
  const attach = () => {
    const form = document.getElementById("contact__form");

    const submitBtn = document.getElementById("contact__submit");

    if (form) {
      form.addEventListener("submit", contact);
    } else {
      return false;
    }

    if (submitBtn) {
      // Log only for the "Let's connect!" button

      console.log("[connect button] element:", submitBtn);

      submitBtn.addEventListener("click", () => {
        console.log("[connect button] clicked");
      });
    } else {
      // No logging for other elements
    }

    return true;
  };

  // Try immediately, then retry a few times in case of late DOM parsing

  if (!attach()) {
    let attempts = 0;

    const maxAttempts = 10;

    const interval = setInterval(() => {
      attempts += 1;

      if (attach() || attempts >= maxAttempts) {
        clearInterval(interval);
      }
    }, 200);
  }
});
