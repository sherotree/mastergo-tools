export function copyToClipboard(data) {
  const dataString = JSON.stringify(data).replace(/^"|"$/g, '');
  try {
    if (window.isSecureContext && navigator.clipboard) {
      navigator.clipboard.writeText(dataString);
    } else {
      unsecuredCopyToClipboard(dataString);
    }
    return true;
  } catch (error) {
    console.error('Unable to copy to clipboard', error);
    return false;
  }

  function unsecuredCopyToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
    } catch (err) {
      console.error('Unable to copy to clipboard', err);
    }
    document.body.removeChild(textArea);
  }
}
