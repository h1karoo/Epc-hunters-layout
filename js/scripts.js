function scaleStepsBlock() {
    const steps = document.querySelector('.steps');
    if (!steps || !steps.parentElement) return;
    const containerWidth = steps.parentElement.clientWidth;
    const designWidth = 1140;
    const scale = containerWidth / designWidth;
    steps.style.transform = `scale(${scale})`;
  }
  document.addEventListener('DOMContentLoaded', () => {
    scaleStepsBlock();
    window.addEventListener('resize', scaleStepsBlock);
    const openBtn = document.querySelector('.main__button');
    const modalOverlay = document.getElementById('modalOverlay');
    const closeBtn = document.getElementById('modalClose');
    if (openBtn && modalOverlay && closeBtn) {
      // Открытие
      openBtn.addEventListener('click', () => {
        modalOverlay.classList.add('active');
      });
      // Закрытие по крестику
      closeBtn.addEventListener('click', () => {
        modalOverlay.classList.remove('active');
      });
      // Закрытие при клике вне окна
      modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
          modalOverlay.classList.remove('active');
        }
      });
    }
  });
  