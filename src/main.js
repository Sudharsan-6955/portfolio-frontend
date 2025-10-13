function initMenu() {
  const menuBtn = document.getElementById("menu-btn");
  const menu = document.getElementById("menu");

  if (!menuBtn || !menu) return;

  menuBtn.addEventListener("click", () => {
    menu.classList.toggle("hidden");
  });

  document.querySelectorAll("#menu a").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.add("hidden");
    });
  });
}

// Initialize now or on DOM ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initMenu);
} else {
  initMenu();
}
