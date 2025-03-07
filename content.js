function sendClipboardLines() {
    chrome.storage.sync.get('enabled', (data) => {
      const isEnabled = data.enabled !== false; // Default to true if not set
      if (!isEnabled) {
        console.log("Clipboard Line Sender is disabled.");
        return;
      }
  
      navigator.clipboard.readText().then((clipboardText) => {
        const lines = clipboardText.split('\n').filter(line => line.trim() !== '');
  
        const activeElement = document.activeElement;
        if (!activeElement || !activeElement.isContentEditable && activeElement.tagName !== 'INPUT' && activeElement.tagName !== 'TEXTAREA') {
          console.log("No suitable text input focused.");
          return;
        }
  
        lines.forEach((line, index) => {
          setTimeout(() => {
            const inputEvent = new Event('input', { bubbles: true });
            activeElement.value = line;
            activeElement.dispatchEvent(inputEvent);
  
            if (activeElement.tagName === 'TEXTAREA') {
              const keydownEvent = new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true });
              activeElement.dispatchEvent(keydownEvent);
            }
          }, index * 50);
        });
      }).catch(err => {
        console.error("Failed to read clipboard: ", err);
      });
    });
  }
  
  setTimeout(sendClipboardLines, 1000);