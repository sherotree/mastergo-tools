export type EventHandler = {
  name: string;
  handler: (...args: any) => void;
};

const eventHandlers: Record<string, EventHandler> = {};

let currentId = 0;

/**
 * Registers an event `handler` for the given event `name`.
 *
 * @returns Returns a function for deregistering the `handler`.
 * @category Events
 */
export function on<Handler extends EventHandler>(name: Handler['name'], handler: Handler['handler']): () => void {
  const id = `${currentId}`;
  currentId += 1;
  eventHandlers[id] = { handler, name };
  return function (): void {
    delete eventHandlers[id];
  };
}

type EmitFunction = <Handler extends EventHandler>(
  name: Handler['name'],
  ...args: Parameters<Handler['handler']>
) => void;

export const emit: EmitFunction = (name, ...args) => {
  mg.ui.postMessage({ pluginMessage: [name, ...args] });
};

function invokeEventHandler(name: string, args: Array<unknown>): void {
  let invoked = false;
  for (const id in eventHandlers) {
    if (eventHandlers[id].name === name) {
      eventHandlers[id].handler.apply(null, args);
      invoked = true;
    }
  }
  if (invoked === false) {
    throw new Error(`No event handler with name \`${name}\``);
  }
}

mg.ui.onmessage = function (args: any): void {
  if (!Array.isArray(args?.pluginMessage)) {
    return;
  }
  const [name, ...rest]: Array<unknown> = args?.pluginMessage;
  if (typeof name !== 'string') {
    return;
  }

  invokeEventHandler(name, rest);
};
