document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('toggleButton');
  
    chrome.storage.sync.get('enabled', (data) => {
      const isEnabled = data.enabled !== false; 
      toggleButton.textContent = isEnabled ? 'Disable' : 'Enable';
    });
  
    toggleButton.addEventListener('click', () => {
      chrome.storage.sync.get('enabled', (data) => {
        const isEnabled = data.enabled !== false;
        const newState = !isEnabled;
        chrome.storage.sync.set({ enabled: newState }, () => {
          toggleButton.textContent = newState ? 'Disable' : 'Enable';
        });
      });
    });
  });