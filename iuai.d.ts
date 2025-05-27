type Tags = keyof HTMLElementTagNameMap;
type Elem<T extends Tags> = HTMLElementTagNameMap[T];
type DeepPartial<T extends object> = T extends Function | Array<unknown> ? T : {
    [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};
type ElemAttributes<T extends Tags> = DeepPartial<Elem<T>>;
type ElemChildren = Array<HTMLElement | string>;
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
declare function elem<T extends Tags>(tag: T | TagObj<T>): Elem<T>;
declare function elem<T extends Tags>(tag: T | TagObj<T>, attributes: ElemAttributes<T>): Elem<T>;
declare function elem<T extends Tags>(tag: T | TagObj<T>, attributes: ElemAttributes<T>, children: ElemChildren): Elem<T>;
declare function elem<T extends Tags>(tag: T | TagObj<T>, children: ElemChildren): Elem<T>;
declare function elem<T extends Tags>(tag: T | TagObj<T>, text: string): Elem<T>;
declare function elem<T extends Tags>(tag: T | TagObj<T>, attributes: ElemAttributes<T>, text: string): Elem<T>;
declare function style(selector: string | Stringable, properties: StyleProps): CSSStyleRule;
declare function queryElem<T extends Tags>(selector: string, tag?: T): "main" extends T ? HTMLElement : Elem<T>;
declare function getElem<T extends Tags>(id: string, tag?: T): "main" extends T ? HTMLElement : Elem<T>;
declare function getChild<T extends Tags>(id: string, tag?: T): "main" extends T ? HTMLElement : Elem<T>;
declare function getParent<T extends Tags>(id: string, tag?: T): "main" extends T ? HTMLElement : Elem<T>;
declare function refElem<T extends Tags>(tag: T): {
    (): Elem<T>;
    id: string;
    tag: T;
    selector: string;
    toString(): string;
};
declare const thisModule: Readonly<{
    elem: typeof elem;
    style: typeof style;
    getElem: typeof getElem;
    queryElem: typeof queryElem;
    getChild: typeof getChild;
    getParent: typeof getParent;
    refElem: typeof refElem;
}>;
declare global {
    var iuai: typeof thisModule;
}
export {};
