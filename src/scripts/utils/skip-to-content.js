// JavaScript to handle focus after clicking Skip to Content link
const skipLink = document.querySelector('.skip-to-content');
skipLink.addEventListener('click', (e) => {
  // Prevent the default anchor behavior
  e.preventDefault();

  // Set focus to the main content
  const mainContent = document.getElementById('mainContent');
  mainContent.focus(); // Focus on main content when skip link is clicked
});
