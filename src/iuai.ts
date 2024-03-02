type Tags = keyof HTMLElementTagNameMap;
type Elem<T extends Tags> = HTMLElementTagNameMap[T];
type DeepPartial<T extends object> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};
type TagObj<T extends Tags> = { tag: T; id?: string };
type Stringable = { toString: () => string };
type StyleProps = Partial<CSSStyleDeclaration> & { [property: string]: string };

function setInlineStyle<T extends HTMLElement | CSSStyleRule>(
  element: T,
  style: StyleProps
) {
  try {
    for (const prop in style) {
      try {
        if (prop in element.style) element.style[prop] = style[prop] as string;
        else element.style.setProperty(prop, style[prop] as string);
      } catch (e) {
        console.error(e);
      }
    }
  } catch (e) {
    throw e;
  }
}

function setAttribute<T extends HTMLElement>(
  element: T,
  name: string,
  value: any
) {
  try {
    if (name === "style") setInlineStyle(element, value);
    else if (name in element) element[name] = value;
    else element.setAttribute(name, value);
  } catch (e) {
    throw e;
  }
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

export function elem<T extends Tags>(tag: T | TagObj<T>): Elem<T>;
export function elem<T extends Tags>(
  tag: T | TagObj<T>,
  attributes: DeepPartial<Elem<T>>
): Elem<T>;
export function elem<T extends Tags>(
  tag: T | TagObj<T>,
  attributes: DeepPartial<Elem<T>>,
  children: Array<HTMLElement | string>
): Elem<T>;
export function elem<T extends Tags>(
  tag: T | TagObj<T>,
  children: Array<HTMLElement | string>
): Elem<T>;
export function elem<T extends Tags>(tag: T | TagObj<T>, text: string): Elem<T>;
export function elem<T extends Tags>(
  tag: T | TagObj<T>,
  attributes: DeepPartial<Elem<T>>,
  text: string
): Elem<T>;
export function elem(...args) {
  try {
    const [tag, attributes, children] = elemArgs(args);
    const el = document.createElement(tag);
    for (const attr in attributes) setAttribute(el, attr, attributes[attr]);
    for (const child of children)
      el.appendChild(
        typeof child === "string" ? document.createTextNode(child) : child
      );
    return el;
  } catch (e) {
    console.error(e);
    return "";
  }
}

let styleElement: HTMLStyleElement;
export function style(selector: string | Stringable, properties: StyleProps) {
  if (!styleElement) {
    styleElement = document.createElement("style");
    document.head.appendChild(styleElement);
  }
  if (!styleElement.sheet) throw new Error("Unable to add style rule.");
  try {
    const index = styleElement.sheet.insertRule(selector + " {}");
    const rule = styleElement.sheet.cssRules[index] as CSSStyleRule;
    setInlineStyle(rule, properties);
    return rule;
  } catch (e) {
    console.error(e);
    return null;
  }
}

function assertElement<T extends Element>(
  el: T | null | undefined,
  tag?: string
) {
  if (!el) throw new ReferenceError("Element not found.");
  if (tag && el.tagName.toLowerCase() !== tag)
    throw new TypeError("tag parameter and element's tag do not match.");
  return el;
}

export function queryElem<T extends Tags>(
  selector: string,
  tag?: T
): "main" extends T ? HTMLElement : Elem<T> {
  const el = document.querySelector(selector);
  return assertElement(el, tag) as any;
}

export function getElem<T extends Tags>(
  id: string,
  tag?: T
): "main" extends T ? HTMLElement : Elem<T> {
  const el = document.getElementById(id);
  return assertElement(el, tag) as any;
}

export function getChild<T extends Tags>(
  id: string,
  tag?: T
): "main" extends T ? HTMLElement : Elem<T> {
  const el = document.getElementById(id)?.firstElementChild;
  return assertElement(el, tag) as any;
}

export function getParent<T extends Tags>(
  id: string,
  tag?: T
): "main" extends T ? HTMLElement : Elem<T> {
  const el = document.getElementById(id)?.parentElement;
  return assertElement(el, tag) as any;
}

let count = 0;
export function refElem<T extends Tags>(tag: T) {
  const id = "e" + (count++).toString(36);
  const ref = function () {
    return getElem(id, tag) as Elem<T>;
  };
  ref.id = id;
  ref.tag = tag;
  ref.selector = "#" + id;
  ref.toString = () => ref.selector;
  return ref;
}
