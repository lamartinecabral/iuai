type Tags = keyof HTMLElementTagNameMap;
type Elem<T extends Tags> = HTMLElementTagNameMap[T];
type Attr<T extends Tags> = Partial<Omit<Elem<T>, "style"> & {
    style: Partial<CSSStyleDeclaration>;
}>;
declare function elem<T extends Tags>(tag: T): Elem<T>;
declare function elem<T extends Tags>(tag: T, text: string): Elem<T>;
declare function elem<T extends Tags>(tag: T, attributes: Attr<T>): Elem<T>;
declare function elem<T extends Tags>(tag: T, children: Array<HTMLElement | string>): Elem<T>;
declare function elem<T extends Tags>(tag: T, attributes: Attr<T>, text: string): Elem<T>;
declare function elem<T extends Tags>(tag: T, attributes: Attr<T>, children: Array<HTMLElement | string>): Elem<T>;
declare namespace elem {
    var get: typeof elemGet;
    var getChild: typeof elemGetChild;
    var getParent: typeof elemGetParent;
}
declare function elemGet<T extends Tags = "main">(id: string, tag?: T): Elem<T>;
declare function elemGetChild<T extends Tags = "main">(id: string, tag?: T): Elem<T>;
declare function elemGetParent<T extends Tags = "main">(id: string, tag?: T): Elem<T>;
export { elem };
export declare function style<T extends Partial<CSSStyleDeclaration>>(selector: string, properties: T): CSSStyleRule;
