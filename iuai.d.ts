type Tags = keyof HTMLElementTagNameMap;
type Elem<T extends Tags> = HTMLElementTagNameMap[T];
type DeepPartial<T extends object> = {
    [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};
type TagObj<T extends Tags> = {
    tag: T;
    id?: string;
};
declare function elem<T extends Tags>(tag: T | TagObj<T>): Elem<T>;
declare function elem<T extends Tags>(tag: T | TagObj<T>, attributes: DeepPartial<Elem<T>>): Elem<T>;
declare function elem<T extends Tags>(tag: T | TagObj<T>, attributes: DeepPartial<Elem<T>>, children: Array<HTMLElement | string>): Elem<T>;
declare function elem<T extends Tags>(tag: T | TagObj<T>, children: Array<HTMLElement | string>): Elem<T>;
declare function elem<T extends Tags>(tag: T | TagObj<T>, text: string): Elem<T>;
declare function elem<T extends Tags>(tag: T | TagObj<T>, attributes: DeepPartial<Elem<T>>, text: string): Elem<T>;
declare namespace elem {
    var get: typeof elemGet;
    var getChild: typeof elemGetChild;
    var getParent: typeof elemGetParent;
    var ref: typeof elemRef;
}
declare function elemGet<T extends Tags>(id: string, tag?: T): "main" extends T ? HTMLElement : Elem<T>;
declare function elemGetChild<T extends Tags>(id: string, tag?: T): "main" extends T ? HTMLElement : Elem<T>;
declare function elemGetParent<T extends Tags>(id: string, tag?: T): "main" extends T ? HTMLElement : Elem<T>;
declare function elemRef<T extends Tags>(tag: T): {
    (): Elem<T>;
    id: string;
    tag: T;
};
export { elem };
export declare function style<T extends Partial<CSSStyleDeclaration>>(selector: string, properties: T): CSSStyleRule;
