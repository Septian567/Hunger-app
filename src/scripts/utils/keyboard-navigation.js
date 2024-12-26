import Swal from "sweetalert2";

const setupKeyboardNavigation = () => {
  const menuSection = document.getElementById("menu-section");
  const menuItems = menuSection.querySelectorAll("li");

  // Function to show the success alert
  const showSuccessAlert = (item) => {
    Swal.fire({
      title: "Pesanan berhasil!",
      text: `${item.textContent} sedang di proses, harap tunggu. Terima kasih!`,
      icon: "success",
      confirmButtonText: "Oke!",
      customClass: {
        popup: "casual-popup", // Class for casual popup styling
        title: "casual-title", // Casual title styling
        content: "casual-content", // Casual content styling
        confirmButton: "casual-button", // Casual button styling
      },
    });
  };

  menuItems.forEach((item, index) => {
    // Keyboard navigation handling
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
        // Show confirmation alert when selecting with Enter/Space
        Swal.fire({
          title: `Apakah Anda ingin memesan ${item.textContent}?`,
          icon: "question",
          showCancelButton: true,
          confirmButtonText: "Ya",
          cancelButtonText: "Tidak",
          customClass: {
            popup: "casual-popup", // Class for casual popup styling
            title: "casual-title", // Casual title styling
            content: "casual-content", // Casual content styling
            confirmButton: "casual-button", // Casual button styling
            cancelButton: "casual-button", // Casual cancel button styling
          },
        }).then((result) => {
          if (result.isConfirmed) {
            // If user confirms, show success alert
            showSuccessAlert(item);
          }
        });
        event.preventDefault();
      }
    });

    // Mouse click handling
    item.addEventListener("click", () => {
      // Show confirmation alert when clicking
      Swal.fire({
        title: `Apakah Anda ingin memesan ${item.textContent}?`,
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Ya",
        cancelButtonText: "Tidak",
        customClass: {
          popup: "casual-popup", // Class for casual popup styling
          title: "casual-title", // Casual title styling
          content: "casual-content", // Casual content styling
          confirmButton: "casual-button", // Casual button styling
          cancelButton: "casual-button", // Casual cancel button styling
        },
      }).then((result) => {
        if (result.isConfirmed) {
          // If user confirms, show success alert
          showSuccessAlert(item);
        }
      });
    });
  });
};

export { setupKeyboardNavigation };
