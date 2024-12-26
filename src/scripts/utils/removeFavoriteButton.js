// removeFavoriteButton.js
import FavRestoIdb from "../data/resto-idb";

// Fungsi untuk mengatur event listener pada tombol hapus
export function setupRemoveFavoriteButtons() {
  const removeFavoriteButtons = document.querySelectorAll(
    ".remove-favorite-button"
  );
  removeFavoriteButtons.forEach((button) => {
    button.addEventListener("click", async (event) => {
      event.stopPropagation(); // Mencegah trigger listener click pada item restoran
      const id = event.target.dataset.id;

      try {
        await FavRestoIdb.deleteResto(id); // Menghapus restoran dari database
        // Memanggil afterRender() dari halaman untuk memperbarui tampilan
        const favoritePage = document.querySelector("favoritePage"); // Sesuaikan dengan elemen halaman yang sesuai
        await favoritePage.afterRender();
      } catch (error) {
        console.error("Failed to remove favorite restaurant:", error);
      }
    });
  });
}
