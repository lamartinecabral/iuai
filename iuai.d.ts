type Tags = keyof HTMLElementTagNameMap;
type Elem<T extends Tags> = HTMLElementTagNameMap[T];
type DeepPartial<T extends object> = {
    [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};
type TagObj<T extends Tags> = {
    tag: T;
    id?: string;
};
type Stringable = {
    toString: () => string;
};
type StyleProps = Partial<CSSStyleDeclaration> & {
    [property: string]: string;
};
export declare function elem<T extends Tags>(tag: T | TagObj<T>): Elem<T>;
export declare function elem<T extends Tags>(tag: T | TagObj<T>, attributes: DeepPartial<Elem<T>>): Elem<T>;
export declare function elem<T extends Tags>(tag: T | TagObj<T>, attributes: DeepPartial<Elem<T>>, children: Array<HTMLElement | string>): Elem<T>;
export declare function elem<T extends Tags>(tag: T | TagObj<T>, children: Array<HTMLElement | string>): Elem<T>;
export declare function elem<T extends Tags>(tag: T | TagObj<T>, text: string): Elem<T>;
export declare function elem<T extends Tags>(tag: T | TagObj<T>, attributes: DeepPartial<Elem<T>>, text: string): Elem<T>;
export declare function style(selector: string | Stringable, properties: StyleProps): CSSStyleRule;
export declare function queryElem<T extends Tags>(selector: string, tag?: T): "main" extends T ? HTMLElement : Elem<T>;
export declare function getElem<T extends Tags>(id: string, tag?: T): "main" extends T ? HTMLElement : Elem<T>;
export declare function getChild<T extends Tags>(id: string, tag?: T): "main" extends T ? HTMLElement : Elem<T>;
export declare function getParent<T extends Tags>(id: string, tag?: T): "main" extends T ? HTMLElement : Elem<T>;
export declare function refElem<T extends Tags>(tag: T): {
    (): Elem<T>;
    id: string;
    tag: T;
    selector: string;
    toString(): string;
};
export {};
