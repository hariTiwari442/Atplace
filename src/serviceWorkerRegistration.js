const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
    window.location.hostname === '[::1]' ||
    window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)
);

export function register() {
  if ('serviceWorker' in navigator) {
    const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
    if (publicUrl.origin !== window.location.origin) return;

    window.addEventListener('load', () => {
      const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;

      if (isLocalhost) {
        checkValidServiceWorker(swUrl);
      } else {
        registerValidSW(swUrl);
      }
    });
  }
}

function registerValidSW(swUrl) {
  navigator.serviceWorker
    .register(swUrl)
    .then((registration) => {
      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        if (!installingWorker) return;
        installingWorker.onstatechange = () => {
          if (installingWorker.state === 'installed' && navigator.serviceWorker.controller) {
            // New version available — show update banner
            showUpdateBanner();
          }
        };
      };
    })
    .catch((error) => console.error('Service worker registration failed:', error));
}

function showUpdateBanner() {
  // Remove existing banner if any
  const existing = document.getElementById('sw-update-banner');
  if (existing) existing.remove();

  const banner = document.createElement('div');
  banner.id = 'sw-update-banner';
  banner.style.cssText = `
    position: fixed; bottom: 20px; left: 50%; transform: translateX(-50%);
    background: #002677; color: white; padding: 12px 24px;
    border-radius: 12px; box-shadow: 0 4px 16px rgba(0,0,0,0.3);
    display: flex; align-items: center; gap: 12px;
    z-index: 9999; font-family: Inter, sans-serif; font-size: 14px;
  `;
  banner.innerHTML = `
    <span>🚀 New update available!</span>
    <button id="sw-update-btn" style="
      background: #FF6900; color: white; border: none;
      padding: 6px 16px; border-radius: 8px; cursor: pointer; font-weight: 600;
    ">Update Now</button>
  `;
  document.body.appendChild(banner);

  document.getElementById('sw-update-btn').addEventListener('click', () => {
    window.location.reload();
  });
}

function checkValidServiceWorker(swUrl) {
  fetch(swUrl, { headers: { 'Service-Worker': 'script' } })
    .then((response) => {
      const contentType = response.headers.get('content-type');
      if (response.status === 404 || (contentType && !contentType.includes('javascript'))) {
        navigator.serviceWorker.ready.then((registration) => registration.unregister()).then(() => window.location.reload());
      } else {
        registerValidSW(swUrl);
      }
    })
    .catch(() => console.log('No internet connection. App is running in offline mode.'));
}

export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then((registration) => registration.unregister()).catch(console.error);
  }
}
