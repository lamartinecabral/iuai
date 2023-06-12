# iuai

- [What is it?](#what-is-it)
- [Installation](#installation)
- [Usage example](#usage-example)
- [Reference](#reference)

# What is it?

A really small set of utilities to build web interfaces using only pure javascript.

### "Why don't you use React, Angular, etc?"

Most of them need transpilers. For simple web apps a browser ready lib would be nice.

### "So why don't you use jQuery or something?"

That's a good question. The thing is I want to build simple apps with pure javascript and only use my javascript knowledge. jQuery adds a layer of abstraction that requires jQuery knowledge. And I don't want/need that.

# Installation

In a browser:

```
<script src="https://unpkg.com/iuai@0.2.0/iuai.js"></script>
<script>
  const { elem, style, handle } = iuai;
</script>
```

Using npm:

```
$ npm install iuai
```

In Node.js:

```
const { elem, style, handle } = require("iuai");
```

# Usage example

The code below...

```html
<html>
  <head>
    <style>
      #app {
        text-align: center;
        width: fit-content;
        border: 1px solid;
        padding: 1em;
      }
      h1 {
        color: red;
      }
      * {
        font-family: monospace;
      }
    </style>
  </head>
  <body>
    <div id="app">
      <h1>Hello World!</h1>
      <button onclick="count()">click me</button>
      <p>you clicked <span id="counter">0</span> times.</p>
      <button id="clr" onclick="reset()">reset</button>
    </div>
    <script>
      let counter = +document.getElementById("counter").innerText;
      function count() {
        document.getElementById("counter").innerText = `${++counter}`;
        document.getElementById("clr").disabled = false;
      }
      function reset() {
        document.getElementById("counter").innerText = `${(counter = 0)}`;
        document.getElementById("clr").disabled = true;
      }
    </script>
  </body>
</html>
```

... can be rewritten like this:

```html
<body><script src="https://unpkg.com/iuai@0.2.0/iuai.js"></script><script>
  const { elem, style, handle } = iuai;

  style("#app", {
    textAlign: "center",
    width: "fit-content",
    border: "1px solid",
    padding: "1em",
  });
  style("h1", {
    color: "red",
  });
  style("*", {
    fontFamily: "monospace",
  });

  document.body.append(
    elem("div", { id: "app" }, [
      elem("h1", "Hello World!"),
      elem("button", { id: "clk" }, "click me"),
      elem("p", [
        " you clicked ",
        elem("span", { id: "counter" }, "0"),
        " times. ",
      ]),
      elem("button", { id: "clr", disabled: true }, "reset"),
    ])
  );

  let counter = +elem.get("counter").innerText;

  handle(elem.get("clk"), "click", () => {
    elem.get("counter").innerText = `${++counter}`;
    elem.get("clr").disabled = false;
  });
  handle(elem.get("clr"), "click", () => {
    elem.get("counter").innerText = `${(counter = 0)}`;
    elem.get("clr").disabled = true;
  });
</script></body>
```

ps: It may look like it's not really less code, but the point is that it's **only pure javascript**.

# Reference

### `elem()`

It abstracts the [`Document.createElement`](https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement), [`Element.setAttribute`](https://developer.mozilla.org/en-US/docs/Web/API/Element/setAttribute) and [`Element.append`](https://developer.mozilla.org/en-US/docs/Web/API/Element/append) methods. It returns the element created.

Signature:

```typescript
function elem(tag: TagName): HTMLElementTagNameMap[typeof tag];
function elem(tag: TagName, text: string): HTMLElementTagNameMap[typeof tag];
function elem(tag: TagName, children: Array<HTMLElement | string>): HTMLElementTagNameMap[typeof tag];
function elem(tag: TagName, attributes: object): HTMLElementTagNameMap[typeof tag];
function elem(tag: TagName, attributes: object, text: string): HTMLElementTagNameMap[typeof tag];
function elem(tag: TagName, attributes: object, children: Array<HTMLElement | string>): HTMLElementTagNameMap[typeof tag];
```

### `elem.get()`

Returns the element with the given `id`. You can also pass a `tag` for type checking purposes.

Signature:

```typescript
elem.get = function(id: string): HTMLElement;
elem.get = function(tag: TagName, id: string): HTMLElementTagNameMap[typeof tag];
```

### `elem.getChild()`

Selects the element with the given `id` and returns it's first child. You can also pass a `tag` for type checking purposes.

Signature:

```typescript
elem.getChild = function(id: string): HTMLElement;
elem.getChild = function(tag: TagName, id: string): HTMLElementTagNameMap[typeof tag];
```

### `elem.getParent()`

Selects the element with the given `id` and returns it's parent. You can also pass a `tag` for type checking purposes.

Signature:

```typescript
elem.getParent = function(id: string): HTMLElement;
elem.getParent = function(tag: TagName, id: string): HTMLElementTagNameMap[typeof tag];
```

### `style()`

It creates and returns a global [CSSRule](https://developer.mozilla.org/en-US/docs/Web/API/CSSRule) and abstracts the [`CSSStyleDeclaration.setProperty`](https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleDeclaration/setProperty).

Signature:

```typescript
function style(selector: string, properties: Partial<CSSStyleDeclaration>): CSSStyleRule;
```

### `handle()`

It abstracts the [Element.addEventListener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener) method and returns a function that can be called to [remove the `EventListener`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener).

Signature:

```typescript
function handle(element: HTMLElement, eventType: string, handler: Function): () => void;
```
