document.addEventListener('DOMContentLoaded', () => {
  try {
    const menuBtn = document.getElementById('menu-btn');
    const menu = document.getElementById('menu');

    if (menuBtn && menu) {
      menuBtn.addEventListener('click', () => {
        menu.classList.toggle('hidden');
      });

      document.querySelectorAll('#menu a').forEach(link => {
        link.addEventListener('click', () => {
          menu.classList.add('hidden');
        });
      });
    }
  } catch (e) {
    // swallow any unexpected errors to avoid breaking the app
    // (optionally log to console during development)
    // console.error('menu script error', e);
  }
});
