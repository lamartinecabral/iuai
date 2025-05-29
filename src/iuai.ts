type Tags = keyof HTMLElementTagNameMap;
type Elem<T extends Tags> = HTMLElementTagNameMap[T];
type DeepPartial<T extends object> = T extends Function | Array<unknown>
  ? T
  : {
      [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
    };
type ElemAttributes<T extends Tags> = DeepPartial<Elem<T>>;
type ElemText = string | number;
type ElemChildren = Array<HTMLElement | ElemText>;
type TagObj<T extends Tags> = { tag: T; id?: string };
type TagLike<T extends Tags> = T | TagObj<T>;
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
        if (prop in element.style && !important)
          element.style[prop as any] = value;
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
    else if (name in element) element[name as keyof T] = value;
    else element.setAttribute(name, value);
  } catch (e) {
    throw e;
  }
}

function createElem<T extends Tags>(tag: T, attributes: ElemAttributes<T>) {
  if (tag === String("")) {
    return document.createDocumentFragment();
  } else {
    const el = document.createElement(tag);
    for (const attr in attributes) setAttribute(el, attr, attributes[attr]);
    return el;
  }
}

function appendChildren(parent: Node, children: any[]) {
  for (const child of children) {
    if (typeof child === "boolean" || typeof child === "function") continue;
    if (child === null || child === undefined) continue;
    if (Array.isArray(child)) {
      appendChildren(parent, child);
      continue;
    }
    try {
      parent.appendChild(
        typeof child === "object"
          ? child
          : child !== "" && document.createTextNode(String(child))
      );
    } catch (err) {
      console.error(err);
    }
  }
}

function elemArgs<T extends Tags>(args: any[]) {
  const [tag, id]: [T, string] =
    typeof args[0] === "string" ? [args[0], ""] : [args[0].tag, args[0].id];
  let attributes = {} as ElemAttributes<T>;
  let children = [] as ElemChildren;
  if (args[1]) {
    if (typeof args[1] === "string" || typeof args[1] === "number")
      children = [args[1]];
    else if (Array.isArray(args[1])) children = args[1];
    else if (args[1]) attributes = args[1];
  }
  if (args.length >= 3) {
    children = args.slice(2);
  } else {
    if (Array.isArray(attributes.children)) children = attributes.children;
  }
  if (id) attributes = { ...attributes, id };

  return [tag, attributes, children] as const;
}

function elem<T extends Tags>(tag: TagLike<T>): Elem<T>;
function elem<T extends Tags>(
  tag: TagLike<T>,
  attributes: ElemAttributes<T>
): Elem<T>;
function elem<T extends Tags>(
  tag: TagLike<T>,
  attributes: ElemAttributes<T>,
  children: ElemChildren
): Elem<T>;
function elem<T extends Tags>(tag: TagLike<T>, children: ElemChildren): Elem<T>;
function elem<T extends Tags>(tag: TagLike<T>, text: ElemText): Elem<T>;
function elem<T extends Tags>(
  tag: TagLike<T>,
  attributes: ElemAttributes<T>,
  text: ElemText
): Elem<T>;
function elem(...args: any[]) {
  try {
    const component = getComponent(args);
    if (component) return component;
    const [tag, attributes, children] = elemArgs(args);
    const el = createElem(tag, attributes);
    appendChildren(el, children);
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

const refElem = (() => {
  let refCount = 0;
  return <T extends Tags>(tag: T) => {
    const id = "e" + (refCount++).toString(36);
    const ref = function () {
      return getElem(id, tag) as Elem<T>;
    };
    ref.id = id;
    ref.tag = tag;
    ref.selector = tag + "#" + id;
    ref.toString = function (): string {
      return this.selector;
    };
    return Object.freeze(ref);
  };
})();

function isRef(value: Function): value is ReturnType<typeof refElem> {
  return (
    Object.isFrozen(value) &&
    "selector" in value &&
    value.selector === String(value)
  );
}

function isComponent(value: unknown): value is Function {
  return typeof value === "function" && !isRef(value);
}

function getComponent(args: any[]) {
  if (!isComponent(args[0])) return;
  try {
    // this is for jsx compatibility
    return args[0]({
      children: args.slice(2),
      ...args[1],
    }) as HTMLElement;
  } catch (err) {
    console.error(err);
    return;
  }
}

const thisModule = Object.freeze({
  elem,
  style,
  getElem,
  queryElem,
  getChild,
  getParent,
  refElem,
});

declare global {
  var iuai: typeof thisModule;
}

Object.defineProperty(
  (typeof self !== "undefined" && self) || globalThis,
  "iuai",
  {
    value: thisModule,
    enumerable: true,
  }
);

export {};
