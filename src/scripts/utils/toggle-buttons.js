const setupToggleMenuAndReviews = () => {
  const toggleButtonConfig = [
    {
      id: "toggle-menu",
      sectionId: "menu-section",
      defaultState: "hidden",
      showText: "Show Menus",
      hideText: "Hide Menus",
    },
    {
      id: "toggle-reviews",
      sectionId: "reviews-section",
      defaultState: "visible",
      showText: "Show Reviews",
      hideText: "Hide Reviews",
    },
    {
      id: "toggle-description",
      sectionId: "description-section",
      defaultState: "visible",
      showText: "Show Description",
      hideText: "Hide Description",
    },
  ];

  toggleButtonConfig.forEach(
    ({ id, sectionId, defaultState, showText, hideText }) => {
      const section = document.getElementById(sectionId);
      const toggleButton =
        document.getElementById(id) || document.createElement("button");

      if (!toggleButton.parentNode) {
        toggleButton.id = id;
        toggleButton.classList.add("toggle-button");
        section.before(toggleButton);
      }

      const isVisible = defaultState === "visible";
      section.style.display = isVisible ? "block" : "none";
      toggleButton.textContent = isVisible ? hideText : showText;
      toggleButton.setAttribute("aria-expanded", isVisible);

      toggleButton.addEventListener("click", () => {
        const currentlyVisible = section.style.display === "block";
        section.style.display = currentlyVisible ? "none" : "block";
        toggleButton.textContent = currentlyVisible ? showText : hideText;
        toggleButton.setAttribute("aria-expanded", !currentlyVisible);
      });
    }
  );
};

export { setupToggleMenuAndReviews };
