/* =============================================
   BIRTHDAY WEBSITE — main.js
   Smooth page transitions + navigation
   ============================================= */

// Fade-in on page load
window.addEventListener('DOMContentLoaded', () => {
  const overlay = document.getElementById('pageTransition');
  if (!overlay) return;

  // Ensure we start with the overlay visible, then fade out
  overlay.style.opacity = '1';
  overlay.style.pointerEvents = 'all';

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      overlay.style.transition = 'opacity 0.45s ease';
      overlay.style.opacity = '0';
      overlay.style.pointerEvents = 'none';
    });
  });
});

/**
 * Navigate to a new page with a smooth pink fade-out → fade-in transition.
 * @param {string} url - destination page filename
 */
function navigateTo(url) {
  const overlay = document.getElementById('pageTransition');
  if (!overlay) { window.location.href = url; return; }

  overlay.style.transition = 'opacity 0.4s ease';
  overlay.style.opacity = '1';
  overlay.style.pointerEvents = 'all';

  setTimeout(() => {
    window.location.href = url;
  }, 420);
}

/**
 * Landing page: tap cake → navigate to gifts
 */
function goToGifts() {
  const cake = document.getElementById('cakeBtn');
  if (cake) {
    cake.style.transform = 'scale(0.85) rotate(10deg)';
    cake.style.transition = 'transform 0.25s ease';

    // Confetti burst effect
    spawnConfetti();

    setTimeout(() => { navigateTo('gifts.html'); }, 500);
  } else {
    navigateTo('gifts.html');
  }
}

/**
 * Simple emoji confetti burst on cake tap
 */
function spawnConfetti() {
  const emojis = ['🎉', '🎊', '🎈', '✨', '💕', '🌸', '🎀', '🍰'];
  const container = document.body;

  for (let i = 0; i < 18; i++) {
    const el = document.createElement('div');
    el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    el.style.cssText = `
      position: fixed;
      z-index: 9998;
      font-size: ${0.9 + Math.random() * 1.2}rem;
      left: ${30 + Math.random() * 40}%;
      top: ${30 + Math.random() * 30}%;
      pointer-events: none;
      animation: confettiFly ${0.6 + Math.random() * 0.6}s ease-out forwards;
      --dx: ${(Math.random() - 0.5) * 200}px;
      --dy: ${-60 - Math.random() * 160}px;
    `;
    container.appendChild(el);
    setTimeout(() => el.remove(), 1200);
  }

  // Inject keyframes once
  if (!document.getElementById('confettiStyles')) {
    const style = document.createElement('style');
    style.id = 'confettiStyles';
    style.textContent = `
      @keyframes confettiFly {
        0%   { transform: translate(0, 0) scale(1); opacity: 1; }
        100% { transform: translate(var(--dx), var(--dy)) scale(0.4); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }
}

/**
 * Gift item: subtle bounce animation on click (for visual feedback)
 */
document.addEventListener('DOMContentLoaded', () => {
  const giftItems = document.querySelectorAll('.gift-item');
  giftItems.forEach(item => {
    item.addEventListener('click', function () {
      this.style.transform = 'scale(0.88)';
      setTimeout(() => { this.style.transform = ''; }, 200);
    });
  });
});
