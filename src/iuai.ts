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
        const value =
          typeof style[prop] === "string"
            ? style[prop].replace("!important", "")
            : style[prop];
        const important = value === style[prop] ? "" : "important";
        if (prop in element.style && !important) element.style[prop] = value;
        else element.style.setProperty(prop, value, important);
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

function initRule(
  sheet: CSSStyleSheet,
  selector: string | Stringable,
  content?: string
) {
  const index = sheet.cssRules.length;
  sheet.insertRule(
    selector + (content ? ` { content: "${content}"; }` : " {}"),
    index
  );
  const rule = sheet.cssRules.item(index) as CSSStyleRule;
  return rule;
}

let styleElement: HTMLStyleElement;
function style(selector: string | Stringable, properties: StyleProps) {
  if (!styleElement) {
    styleElement = document.createElement("style");
    document.head.appendChild(styleElement);
  }
  if (!styleElement.sheet) throw new Error("Unable to add style rule.");
  try {
    const rule = initRule(styleElement.sheet, selector, properties.content);
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

function queryElem<T extends Tags>(
  selector: string,
  tag?: T
): "main" extends T ? HTMLElement : Elem<T> {
  const el = document.querySelector(selector);
  return assertElement(el, tag) as any;
}

function getElem<T extends Tags>(
  id: string,
  tag?: T
): "main" extends T ? HTMLElement : Elem<T> {
  const el = document.getElementById(id);
  return assertElement(el, tag) as any;
}

function getChild<T extends Tags>(
  id: string,
  tag?: T
): "main" extends T ? HTMLElement : Elem<T> {
  const el = document.getElementById(id)?.firstElementChild;
  return assertElement(el, tag) as any;
}

function getParent<T extends Tags>(
  id: string,
  tag?: T
): "main" extends T ? HTMLElement : Elem<T> {
  const el = document.getElementById(id)?.parentElement;
  return assertElement(el, tag) as any;
}

let count = 0;
function refElem<T extends Tags>(tag: T) {
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

const thisModule = {
  elem,
  style,
  getElem,
  queryElem,
  getChild,
  getParent,
  refElem,
};

declare global {
  var iuai: typeof thisModule;
}

((typeof self !== "undefined" && self) || globalThis).iuai = thisModule;

export {};
