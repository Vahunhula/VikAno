/**
 * iOS specific fixes to be run at app load time
 */

// Fix for 100vh issue on iOS
function fixIOSHeight() {
  // First we get the viewport height and multiply it by 1% to get a value for a vh unit
  const vh = window.innerHeight * 0.01;
  // Then we set the value in the --vh custom property to the root of the document
  document.documentElement.style.setProperty('--vh', `${vh}px`);
  
  // Listen for resize events to update the value
  window.addEventListener('resize', () => {
    // We update the vh value when the window is resized
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  });
}

// Fix for iOS scroll restoration
function fixIOSScrollRestoration() {
  if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
    window.history.scrollRestoration = 'manual';
  }
}

// Run all iOS fixes
export function applyIOSFixes() {
  fixIOSHeight();
  fixIOSScrollRestoration();
}

export default applyIOSFixes;
