declare type Tags = keyof HTMLElementTagNameMap;
declare type Elem<T extends Tags> = HTMLElementTagNameMap[T];
declare type EvTypes = keyof HTMLElementEventMap;
declare type Ev<T extends EvTypes> = HTMLElementEventMap[T];
declare function elem<T extends Tags>(tag: T): Elem<T>;
declare function elem<T extends Tags>(tag: T, text: string): Elem<T>;
declare function elem<T extends Tags>(tag: T, attributes: Partial<Elem<T>>): Elem<T>;
declare function elem<T extends Tags, W extends HTMLElement | string>(tag: T, children: W[]): Elem<T>;
declare function elem<T extends Tags>(tag: T, attributes: Partial<Elem<T>>, text: string): Elem<T>;
declare function elem<T extends Tags, W extends HTMLElement | string>(tag: T, attributes: Partial<Elem<T>>, children: W[]): Elem<T>;
declare namespace elem {
    var get: typeof elemGet;
    var getChild: typeof elemGetChild;
    var getParent: typeof elemGetParent;
}
declare function elemGet<T extends Tags = "main">(id: string): Elem<T>;
declare function elemGet<T extends Tags>(tag: T, id: string): Elem<T>;
declare function elemGetChild<T extends Tags = "main">(id: string): Elem<T>;
declare function elemGetChild<T extends Tags>(tag: T, id: string): Elem<T>;
declare function elemGetParent<T extends Tags = "main">(id: string): Elem<T>;
declare function elemGetParent<T extends Tags>(tag: T, id: string): Elem<T>;
export { elem };
export declare function style<T extends Partial<CSSStyleDeclaration>>(selector: string, properties: T): void;
export declare function event<W extends HTMLElement, T extends EvTypes>(element: W, eventType: T, handler: (ev: Ev<T>) => void): () => void;
