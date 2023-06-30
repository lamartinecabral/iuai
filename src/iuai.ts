type Tags = keyof HTMLElementTagNameMap;
type Elem<T extends Tags> = HTMLElementTagNameMap[T];
type DeepPartial<T extends object> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};
type TagObj<T extends Tags> = { tag: T; id?: string };
type Stringable = { toString(): string };
type StyleProps = Partial<CSSStyleDeclaration> & { [property: string]: string };

function setInlineStyle<T extends HTMLElement>(element: T, style: StyleProps) {
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
  const [tag, id]: [T, string] =
    typeof args[0] === "string" ? [args[0], ""] : [args[0].tag, args[0].id];
  let attributes: DeepPartial<Elem<T>> = {};
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
  if (id) attributes = { ...attributes, id };
  return [tag, attributes, children] as [
    T,
    DeepPartial<Elem<T>>,
    Array<HTMLElement | string>
  ];
}

function elem<T extends Tags>(tag: T | TagObj<T>): Elem<T>;
function elem<T extends Tags>(
  tag: T | TagObj<T>,
  attributes: DeepPartial<Elem<T>>
): Elem<T>;
function elem<T extends Tags>(
  tag: T | TagObj<T>,
  attributes: DeepPartial<Elem<T>>,
  children: Array<HTMLElement | string>
): Elem<T>;
function elem<T extends Tags>(
  tag: T | TagObj<T>,
  children: Array<HTMLElement | string>
): Elem<T>;
function elem<T extends Tags>(tag: T | TagObj<T>, text: string): Elem<T>;
function elem<T extends Tags>(
  tag: T | TagObj<T>,
  attributes: DeepPartial<Elem<T>>,
  text: string
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

function elemQuery<T extends Tags>(
  selector: string,
  tag?: T
): "main" extends T ? HTMLElement : Elem<T> {
  const el = document.querySelector(selector);
  return assertElement(el, tag) as any;
}
function elemGet<T extends Tags>(
  id: string,
  tag?: T
): "main" extends T ? HTMLElement : Elem<T> {
  const el = document.getElementById(id);
  return assertElement(el, tag) as any;
}
function elemGetChild<T extends Tags>(
  id: string,
  tag?: T
): "main" extends T ? HTMLElement : Elem<T> {
  const el = document.getElementById(id)?.firstElementChild;
  return assertElement(el, tag) as any;
}
function elemGetParent<T extends Tags>(
  id: string,
  tag?: T
): "main" extends T ? HTMLElement : Elem<T> {
  const el = document.getElementById(id)?.parentElement;
  return assertElement(el, tag) as any;
}
let count = 0;
function elemRef<T extends Tags>(tag: T) {
  const id = "e" + (count++).toString(36);
  const ref = function () {
    return elemGet(id, tag) as Elem<T>;
  };
  ref.id = id;
  ref.tag = tag;
  ref.toString = () => "#" + id;
  return ref;
}

elem.query = elemQuery;
elem.get = elemGet;
elem.getChild = elemGetChild;
elem.getParent = elemGetParent;
elem.ref = elemRef;

export { elem };

let styleElement: HTMLStyleElement;
export function style(selector: string | Stringable, properties: StyleProps) {
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
