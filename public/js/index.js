const urlForm = document.querySelector("form");

urlForm.onsubmit = async (event) => {
  event.preventDefault();

  const urlInput = event.target.elements.urlInput;
  const logIps = event.target.elements.logIps;
  const submitButton = event.target.elements.submitButton;

  submitButton.innerText = "Please wait...";
  submitButton.removeAttribute("data-tooltip");
  submitButton.setAttribute("aria-busy", true);

  const response = await fetch("/createUrl", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url: urlInput.value, logIps: logIps.checked }),
  });

  submitButton.innerText = "Shorten URL";
  submitButton.removeAttribute("aria-busy");

  if (response.ok) {
    const { shortUrl } = await response.json();
    window.location.href = `${shortUrl}/info`;
  } else {
    const { errors } = await response.json();
    urlInput.setAttribute("aria-invalid", true);
    submitButton.setAttribute("data-tooltip", errors[0]);
  }
};
