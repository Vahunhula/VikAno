// More robust iOS detection
export const isIOS = () => {
  // Most reliable way to detect iOS devices
  const userAgent = window.navigator.userAgent.toLowerCase();
  const isIOS = /iphone|ipad|ipod/.test(userAgent);
  const isAppleDesktop = userAgent.includes('mac') && 'ontouchend' in document;
  
  return isIOS || isAppleDesktop;
};

// Add meta viewport tag for iOS
export const setupIOSViewport = () => {
  if (isIOS()) {
    // Find existing viewport meta tag or create a new one
    let viewportMeta = document.querySelector('meta[name="viewport"]');
    
    if (!viewportMeta) {
      viewportMeta = document.createElement('meta');
      viewportMeta.name = 'viewport';
      document.head.appendChild(viewportMeta);
    }
    
    // Set iOS-optimized viewport settings - single setting to avoid conflicts
    viewportMeta.content = 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover';
    
    // Add CSS class to body for iOS-specific styling
    document.body.classList.add('ios-device');
    
    // Add safe area insets for iOS
    const metaViewport = document.createElement('meta');
    metaViewport.name = 'viewport';
    metaViewport.content = 'width=device-width, initial-scale=1, viewport-fit=cover';
    document.head.appendChild(metaViewport);
  }
};
