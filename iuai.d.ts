type Tags = keyof HTMLElementTagNameMap;
type Elem<T extends Tags> = HTMLElementTagNameMap[T];
type DeepPartial<T extends object> = T extends Function | Array<unknown> ? T : {
    [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};
type ElemAttributes<T extends Tags> = DeepPartial<Elem<T>>;
type ElemText = string | number;
type ElemChildren = Array<HTMLElement | ElemText>;
type TagObj<T extends Tags> = {
    tag: T;
    id?: string;
};
type TagLike<T extends Tags> = T | TagObj<T>;
type Stringable = {
    toString: () => string;
};
type StyleProps = Partial<CSSStyleDeclaration> & {
    [property: string]: string;
};
declare const iuai: Readonly<{
    elem: {
        <T extends Tags>(tag: TagLike<T>): Elem<T>;
        <T extends Tags>(tag: TagLike<T>, attributes: ElemAttributes<T>): Elem<T>;
        <T extends Tags>(tag: TagLike<T>, attributes: ElemAttributes<T>, children: ElemChildren): Elem<T>;
        <T extends Tags>(tag: TagLike<T>, children: ElemChildren): Elem<T>;
        <T extends Tags>(tag: TagLike<T>, text: ElemText): Elem<T>;
        <T extends Tags>(tag: TagLike<T>, attributes: ElemAttributes<T>, text: ElemText): Elem<T>;
    };
    style: (selector: string | Stringable, properties: StyleProps) => CSSStyleRule | null;
    media: (condition: string, styleRules: Record<string, StyleProps>) => CSSMediaRule | null;
    getElem: <T extends Tags>(id: string, tag?: T) => "main" extends T ? HTMLElement : Elem<T>;
    queryElem: <T extends Tags>(selector: string, tag?: T) => "main" extends T ? HTMLElement : Elem<T>;
    getChild: <T extends Tags>(id: string, tag?: T) => "main" extends T ? HTMLElement : Elem<T>;
    getParent: <T extends Tags>(id: string, tag?: T) => "main" extends T ? HTMLElement : Elem<T>;
    refElem: <T extends Tags>(tag: T) => {
        (): Elem<T>;
        id: string;
        tag: T;
        selector: string;
        toString(): string;
    };
    version: string;
}>;
export type Iuai = typeof iuai;
declare global {
    var iuai: Iuai;
}
export {};
