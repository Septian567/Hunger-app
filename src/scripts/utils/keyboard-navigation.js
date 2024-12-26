const setupKeyboardNavigation = () => {
  const menuSection = document.getElementById("menu-section");
  const menuItems = menuSection.querySelectorAll("li");

  menuItems.forEach((item, index) => {
    item.addEventListener("keydown", (event) => {
      if (event.key === "ArrowDown") {
        const nextItem = menuItems[index + 1] || menuItems[0];
        nextItem.focus();
        event.preventDefault();
      } else if (event.key === "ArrowUp") {
        const prevItem =
          menuItems[index - 1] || menuItems[menuItems.length - 1];
        prevItem.focus();
        event.preventDefault();
      } else if (event.key === "Enter" || event.key === " ") {
        alert(`You selected: ${item.textContent}`);
        event.preventDefault();
      }
    });
  });
};

export { setupKeyboardNavigation };
