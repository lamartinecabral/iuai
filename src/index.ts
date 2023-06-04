type Tags = keyof HTMLElementTagNameMap;
type Elem<T extends Tags> = HTMLElementTagNameMap[T];
type EvTypes = keyof HTMLElementEventMap;
type Ev<T extends EvTypes> = HTMLElementEventMap[T];

function setInlineStyle<
  T extends HTMLElement,
  W extends Partial<CSSStyleDeclaration>
>(element: T, style: W) {
  for (const prop in style) {
    if (prop in element.style) element.style[prop] = style[prop] as string;
    else element.style.setProperty(prop, style[prop] as string);
  }
}

function setAttribute<T extends HTMLElement>(
  element: T,
  name: string,
  value: any
) {
  if (name === "style") setInlineStyle(element, value);
  else if (name in element) element[name] = value;
  else element.setAttribute(name, value);
}

function elem<T extends Tags>(tag: T): Elem<T>;
function elem<T extends Tags>(tag: T, text: string): Elem<T>;
function elem<T extends Tags>(tag: T, attributes: Partial<Elem<T>>): Elem<T>;
function elem<T extends Tags, W extends HTMLElement | string>(
  tag: T,
  children: W[]
): Elem<T>;
function elem<T extends Tags>(
  tag: T,
  attributes: Partial<Elem<T>>,
  text: string
): Elem<T>;
function elem<T extends Tags, W extends HTMLElement | string>(
  tag: T,
  attributes: Partial<Elem<T>>,
  children: W[]
): Elem<T>;
function elem<T extends Tags, W extends HTMLElement | string>(...args) {
  const tag: T = args[0];
  let attributes: Partial<Elem<T>> = {},
    children: W[] = [];
  if (args[1]) {
    if (typeof args[1] === "string") children = [args[1] as W];
    else if (Array.isArray(args[1])) children = args[1];
    else attributes = args[1];
  }
  if (args[2]) {
    if (typeof args[2] === "string") children = [args[2] as W];
    else children = args[2];
  }
  const el = document.createElement(tag);
  for (const attr in attributes) setAttribute(el, attr, attributes[attr]);
  for (const child of children) el.append(child);
  return el;
}

function elemGetArgs<T extends Tags>(args: any[]) {
  const [id, tag]: [string, T] = args.reverse() as any;
  return [tag, id];
}

function checkElement<T extends Element>(el: T | null, tag?: string) {
  if (!el) throw new ReferenceError("Element not found.");
  if (tag && el.tagName.toLowerCase() != tag)
    console.warn(
      new TypeError("tag parameter and element's tag do not match.")
    );
}

function elemGet<T extends Tags = "main">(id: string): Elem<T>;
function elemGet<T extends Tags>(tag: T, id: string): Elem<T>;
function elemGet<T extends Tags = "main">(...args) {
  const [tag, id] = elemGetArgs<T>(args);
  const el = document.getElementById(id);
  checkElement(el, tag);
  return el as Elem<T>;
}
function elemGetChild<T extends Tags = "main">(id: string): Elem<T>;
function elemGetChild<T extends Tags>(tag: T, id: string): Elem<T>;
function elemGetChild<T extends Tags = "main">(...args) {
  const [tag, id] = elemGetArgs<T>(args);
  const el = document.getElementById(id)?.children[0] || null;
  checkElement(el, tag);
  return el as Elem<T>;
}
function elemGetParent<T extends Tags = "main">(id: string): Elem<T>;
function elemGetParent<T extends Tags>(tag: T, id: string): Elem<T>;
function elemGetParent<T extends Tags = "main">(...args) {
  const [tag, id] = elemGetArgs<T>(args);
  const el = document.getElementById(id)?.parentElement || null;
  checkElement(el, tag);
  return el as Elem<T>;
}

elem.get = elemGet;
elem.getChild = elemGetChild;
elem.getParent = elemGetParent;

export { elem };

function css<T extends Partial<CSSStyleDeclaration>>(
  selector: string,
  properties: T
) {
  var el = document.createElement("span");
  setInlineStyle(el, properties);
  return selector + " {" + el.style.cssText + "}";
}

let styleElement: HTMLStyleElement;
export function style<T extends Partial<CSSStyleDeclaration>>(
  selector: string,
  properties: T
) {
  if (!styleElement) {
    styleElement = document.createElement("style");
    document.head.append(styleElement);
  }
  styleElement.sheet?.insertRule(css(selector, properties));
}

export function event<W extends HTMLElement, T extends EvTypes>(
  element: W,
  eventType: T,
  handler: (ev: Ev<T>) => void
) {
  element.addEventListener(eventType, handler);
  return () => element.removeEventListener(eventType, handler);
}
