export const loadFont = async (url: string): Promise<void> => {
    if (!url) return;
    
    try {
      const link = document.createElement('link');
      link.href = url;
      link.rel = 'stylesheet';
      document.head.appendChild(link);
      
      // Wait for font to load
      await document.fonts.ready;
    } catch (error) {
      console.error('Error loading font:', error);
    }
  };