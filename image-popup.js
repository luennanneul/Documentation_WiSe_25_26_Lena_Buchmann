// Image popup logic for drawing algorithms page
// Adds click-to-enlarge and close functionality for all images in .section

document.addEventListener('DOMContentLoaded', function() {
  const images = document.querySelectorAll('.section img');
  const videos = document.querySelectorAll('.popup-video');

  images.forEach(img => {
    img.style.cursor = 'pointer';
    img.addEventListener('click', function() {
      showMediaPopup('img', img.src, img.alt);
    });
  });

  videos.forEach(video => {
    video.addEventListener('click', function() {
      showMediaPopup('video', video.querySelector('source').src, video.getAttribute('alt') || 'Video');
    });
  });

  function showMediaPopup(type, src, alt) {
    const overlay = document.createElement('div');
    overlay.className = 'image-popup-overlay';
    let mediaHtml = '';
    if (type === 'img') {
      // Remove grayscale filter for popup image
      mediaHtml = `<img src="${src}" alt="${alt}" style="max-width:100%; max-height:80vh; border-radius:8px; box-shadow:0 4px 32px rgba(0,0,0,0.5);">`;
    } else if (type === 'video') {
      // Remove grayscale filter for popup video
      mediaHtml = `<video controls autoplay style="max-width:100%; max-height:80vh; border-radius:8px; box-shadow:0 4px 32px rgba(0,0,0,0.5);"><source src="${src}" type="video/mp4">Your browser does not support the video tag.</video>`;
    }
    overlay.innerHTML = `
      <div class="image-popup-content">
        <button class="image-popup-close" aria-label="Close">×</button>
        ${mediaHtml}
      </div>
    `;
    document.body.appendChild(overlay);

    overlay.querySelector('.image-popup-close').addEventListener('click', () => {
      overlay.remove();
    });
    overlay.addEventListener('click', e => {
      if (e.target === overlay) overlay.remove();
    });
  }
});
