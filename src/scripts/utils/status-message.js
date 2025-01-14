export const showError = (element, message) => {
  element.style.display = 'block';
  element.classList.add('error-message');
  element.innerHTML = `<p><strong>Oops!</strong> ${message}</p>`;
};

export const showInfo = (element, message) => {
  element.style.display = 'block';
  element.classList.add('info-message');
  element.innerHTML = `<p>${message}</p>`;
};
