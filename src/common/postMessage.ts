export function parentPostMessage(pluginMessage: { [key: string]: any }) {
  parent.postMessage({ pluginMessage }, '*');
}
