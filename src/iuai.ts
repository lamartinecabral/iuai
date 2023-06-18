type Tags = keyof HTMLElementTagNameMap;
type Elem<T extends Tags> = HTMLElementTagNameMap[T];
type Attr<T extends Tags> = Partial<
  Omit<Elem<T>, "style"> & { style: Partial<CSSStyleDeclaration> }
>;

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

function elemArgs<T extends Tags>(args: any[]) {
  const tag: T = args[0];
  let attributes: Attr<T> = {};
  let children: Array<HTMLElement | string> = [];
  if (args[1]) {
    if (typeof args[1] === "string") children = [args[1]];
    else if (Array.isArray(args[1])) children = args[1];
    else attributes = args[1];
  }
  if (args[2]) {
    if (typeof args[2] === "string") children = [args[2]];
    else children = args[2];
  }
  return [tag, attributes, children] as [
    T,
    Attr<T>,
    Array<HTMLElement | string>
  ];
}

function elem<T extends Tags>(tag: T): Elem<T>;
function elem<T extends Tags>(tag: T, text: string): Elem<T>;
function elem<T extends Tags>(tag: T, attributes: Attr<T>): Elem<T>;
function elem<T extends Tags>(
  tag: T,
  children: Array<HTMLElement | string>
): Elem<T>;
function elem<T extends Tags>(
  tag: T,
  attributes: Attr<T>,
  text: string
): Elem<T>;
function elem<T extends Tags>(
  tag: T,
  attributes: Attr<T>,
  children: Array<HTMLElement | string>
): Elem<T>;
function elem(...args) {
  const [tag, attributes, children] = elemArgs(args);
  const el = document.createElement(tag);
  for (const attr in attributes) setAttribute(el, attr, attributes[attr]);
  for (const child of children) el.append(child);
  return el;
}

function assertElement<T extends Element>(el: T, tag?: string) {
  if (!el) throw new ReferenceError("Element not found.");
  if (tag && el.tagName.toLowerCase() != tag)
    throw new TypeError("tag parameter and element's tag do not match.");
  return el;
}

function elemGet<T extends Tags = "main">(id: string, tag?: T) {
  const el = document.getElementById(id);
  return assertElement(el, tag) as Elem<T>;
}
function elemGetChild<T extends Tags = "main">(id: string, tag?: T) {
  const el = document.getElementById(id)?.firstElementChild;
  return assertElement(el, tag) as Elem<T>;
}
function elemGetParent<T extends Tags = "main">(id: string, tag?: T) {
  const el = document.getElementById(id)?.parentElement;
  return assertElement(el, tag) as Elem<T>;
}

elem.get = elemGet;
elem.getChild = elemGetChild;
elem.getParent = elemGetParent;

export { elem };

let styleElement: HTMLStyleElement;
export function style<T extends Partial<CSSStyleDeclaration>>(
  selector: string,
  properties: T
) {
  if (!styleElement) {
    styleElement = document.createElement("style");
    document.head.append(styleElement);
  }
  if (!styleElement.sheet) throw new Error("Unable to add style rule.");
  const index = styleElement.sheet.insertRule(selector + " {}");
  const rule = styleElement.sheet.cssRules[index] as CSSStyleRule;
  setInlineStyle(rule as any, properties);
  return rule;
}
