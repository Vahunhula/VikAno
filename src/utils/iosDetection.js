// Utility function to detect iOS devices
export const isIOS = () => {
  return (
    // Standard iOS detection
    /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream ||
    // MacOS using touch (likely iPad OS)
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
  );
};

// Add meta viewport tag to prevent zooming on iOS
export const setupIOSViewport = () => {
  if (isIOS()) {
    // Find existing viewport meta tag or create a new one
    let viewportMeta = document.querySelector('meta[name="viewport"]');
    
    if (!viewportMeta) {
      viewportMeta = document.createElement('meta');
      viewportMeta.name = 'viewport';
      document.head.appendChild(viewportMeta);
    }
    
    // Set optimal viewport settings for iOS
    viewportMeta.content = 'width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no, viewport-fit=cover';
    
    // Add CSS class to body for iOS-specific styling
    document.body.classList.add('ios-device');
    
    viewportMeta.content = 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no';
    
    // Add safe area insets for iOS
    const metaViewport = document.createElement('meta');
    metaViewport.name = 'viewport';
    metaViewport.content = 'width=device-width, initial-scale=1, viewport-fit=cover';
    document.head.appendChild(metaViewport);
  }
};
