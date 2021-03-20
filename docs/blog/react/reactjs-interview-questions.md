---
title: React 面试题精选集
tags: [掘金专栏, 洛竹早茶馆]
---

> 大家好，我是 [@洛竹](https://github.com/youngjuning)
>
> 本文首发于 [洛竹早茶馆](https://youngjuning.js.org/)
>
> 本文翻译自 [sudheerj/reactjs-interview-questions](https://github.com/sudheerj/reactjs-interview-questions)
>
> 本文同步于公众号洛竹早茶馆，转载请联系作者。

## Core React

### 1. 什么是 React？

React 是一个**开源前端 JavaScript 库**，用于构建用户界面，尤其是单页应用程序。它用于处理 Web 和移动应用程序的视图层。React 是由 Facebook 的软件工程师 [乔丹·沃克](https://github.com/jordwalke) 创建的。React 于 2011 年在 Facebook 的 News Feed 上首次发布，2012 年首次在 Instagram 发布。

### 2. React 的主要特性是什么？

React 的主要特性是:

- 考虑到 DOM 操作内存开销大，React 使用**虚拟 DOM（VirtualDOM）** 替代了真实 DOM（RealDOM）
- 支持**服务端渲染**
- 遵循**单向**数据流或数据绑定
- 使用**可复用/可组合**的 UI 组件来进行视图开发

### 3. 什么是 JSX？

JSX 是 ECMAScript 的类似 XML 的语法扩展（缩写是 JavaScript XML）。实际上，它只是为 `React.createElement()` 函数提供语法糖，为我们提供了在 JavaScript 中使用类 HTML 模板语法的能力。

下面的示例中，`<h1>` 标签内的文本会作为 JavaScript 函数（`React.createElement()`）的返回值返回给 render 函数：

```jsx | pure
class App extends React.Component {
  render() {
    return (
      <div>
        <h1>{'Welcome to React world!'}</h1>
      </div>
    );
  }
}
```

### 4. 元素（Element）和组件（Component）的区别是什么？

元素是一个普通的对象，它描述了你希望以 DOM 节点或其他组件的形式出现在屏幕上的内容。元素可以在其 props 中包含其他 元素。创建一个 React 元素开销很小。一旦创建了元素，就永远不会对其进行修改。

React Element 的对象表示如下：

```js
const element = React.createElement('div', { id: 'login-btn' }, 'Login');
```

上面的 `React.createElement()` 函数会返回一个如下的对象：

```js
{
  type: 'div',
  props: {
    children: 'Login',
    id: 'login-btn'
  }
}
```

最终，它会使用 `ReactDOM.render()` 将元素渲染到 DOM：

```html
<div id="login-btn">Login</div>
```

而**组件**可以用几种不同的方式声明。它可以是带有 `render()` 方法的类。或者，你可以简单地将其定义为一个函数。无论哪种情况，它都将 props 作为输入，并返回 JSX 树作为输出：

```js
const Button = ({ onLogin }) => (
  <div id={'login-btn'} onClick={onLogin}>
    Login
  </div>
);
```

然后将 JSX 编译成 `React.createElement()` 函数：

```js
const Button = ({ onLogin }) =>
  React.createElement('div', { id: 'login-btn', onClick: onLogin }, 'Login');
```

### 5. 如何在 React 中创建组件？

这里有两种可以用方式来创建一个组件：

1. **函数组件：** 这是创建组件最简单的方式。它们是纯 JavaScript 函数，接受 props 对象作为第一个参数并返回 React 元素：

```jsx | pure
function Greeting({ message }) {
  return <h1>{`Hello, ${message}`}</h1>;
}
```

2. **类组件：** 你也可以使用 ES6 的 class 语法来定义一个组件。上面的函数组件可以被改写为：

```jsx | pure
class Greeting extends React.Component {
  render() {
    return <h1>{`Hello, ${this.props.message}`}</h1>;
  }
}
```

### 6. 何时选择类组件或函数组件

如果一个组件需要状态或者生命周期方法，则使用类组件，否则使用函数组件。

然而，从 React 16.8 引入 Hooks 后，你可以在函数组件中使用之前只在类组件中有的特性，比如状态和生命周期方法。

### 7. Pure Components 是什么？

`React.PureComponent` 与 `React.Component` 几乎完全相同，不同之处在于它为你处理了 `shouldComponentUpdate()` 方法。当 props 和 state 改变时，PureComponent 将对 props 和 state 进行浅表比较。另一方面，Component 初始不会将当前 props 和 state 与 nextPorps 和 nextState 进行比较。因此，每当调用 `shouldComponentUpdate` 时，组件将默认重新渲染。

### 8. React 中的 state 是什么？

组件的状态是一个对象，其中包含一些在组件的生命周期中可能会发生变化的信息。我们应该始终尝试使状态尽可能简单，并最大程度减少有状态组件的数量。

让我们来创建一个带有 message 状态的 user 组件：

```jsx | pure
class User extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      message: 'Welcome to React world',
    };
  }

  render() {
    return (
      <div>
        <h1>{this.state.message}</h1>
      </div>
    );
  }
}
```

![state](https://i.loli.net/2021/03/18/gvlFoRVyBGurS47.png)

状态类似于 Props，但它是私有的，并由组件完全控制。也就是说除了拥有和设置它的组件之外，其他任何组件都无法访问它。

### 9. React 中的 props 是什么

Props 是组件的输入。它们是单个值或包含一组值的对象，这些对象在创建时会使用类似于 HTML 标签属性的命名约定传递给组件。它们是从父组件传递到子组件的数据。

React 中 props 的主要目的是提供以下组件功能：

1. 将自定义数据传递到你的组件。
2. 触发状态更改。
3. 通过组件的 `render()` 方法中的 `this.props.reactProp` 使用。

举个例子，让我们创建一个带有 `reactProp` 属性的元素：

```jsx | pure
<Element reactProp={'1'} />
```

然后，这个 `reactProp`（或你想出的任何名称）成为附加到 React 的本地 props 对象的属性，该对象最初已经存在于使用 React 库创建的所有组件上。

```js
props.reactProp;
```

### 10. state 和 props 的区别是什么？

props 和 state 都是普通的 JavaScript 对象。尽管它们两者都拥有影响渲染输出的信息，但它们在组件层面的功能却有所不同。将 props 传递给组件类似于传递参数给函数，而 state 则类似于函数中声明的变量一样在组件内进行管理。

### 11. Why should we not update the state directly?

If you try to update state directly then it won't re-render the component.

```javascript
//Wrong
this.state.message = 'Hello world';
```

Instead use `setState()` method. It schedules an update to a component's state object. When state changes, the component responds by re-rendering.

```javascript
//Correct
this.setState({ message: 'Hello World' });
```

**Note:** You can directly assign to the state object either in _constructor_ or using latest javascript's class field declaration syntax.

### 12. What is the purpose of callback function as an argument of `setState()`?

The callback function is invoked when setState finished and the component gets rendered. Since `setState()` is **asynchronous** the callback function is used for any post action.

**Note:** It is recommended to use lifecycle method rather than this callback function.

```javascript
setState({ name: 'John' }, () =>
  console.log('The name has updated and component re-rendered'),
);
```

### 13. What is the difference between HTML and React event handling?

Below are some of the main differences between HTML and React event handling,

1. In HTML, the event name should be in _lowercase_:

```html
<button onclick="activateLasers()"></button>
```

Whereas in React it follows _camelCase_ convention:

```jsx | pure
<button onClick={activateLasers}>
```

2. In HTML, you can return `false` to prevent default behavior:

```html
<a href="#" onclick='console.log("The link was clicked."); return false;' />
```

Whereas in React you must call `preventDefault()` explicitly:

```javascript
function handleClick(event) {
  event.preventDefault();
  console.log('The link was clicked.');
}
```

3. In HTML, you need to invoke the function by appending `()`:

Whereas in react you should not append `()` with the function name. (refer "activateLasers" function in the first point for example)

### 14. How to bind methods or event handlers in JSX callbacks?

There are 3 possible ways to achieve this:

1. **Binding in Constructor:** In JavaScript classes, the methods are not bound by default. The same thing applies for React event handlers defined as class methods. Normally we bind them in constructor.

```javascript
class Component extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    // ...
  }
}
```

2. **Public class fields syntax:** If you don't like to use bind approach then _public class fields syntax_ can be used to correctly bind callbacks.

```jsx | pure
handleClick = () => {
  console.log('this is:', this);
};
```

```jsx | pure
<button onClick={this.handleClick}>{'Click me'}</button>
```

3. **Arrow functions in callbacks:** You can use _arrow functions_ directly in the callbacks.

```jsx | pure
<button onClick={event => this.handleClick(event)}>{'Click me'}</button>
```

**Note:** If the callback is passed as prop to child components, those components might do an extra re-rendering. In those cases, it is preferred to go with `.bind()` or _public class fields syntax_ approach considering performance.

### 15. How to pass a parameter to an event handler or callback?

You can use an _arrow function_ to wrap around an _event handler_ and pass parameters:

```jsx | pure
<button onClick={() => this.handleClick(id)} />
```

This is an equivalent to calling `.bind`:

```jsx | pure
<button onClick={this.handleClick.bind(this, id)} />
```

Apart from these two approaches, you can also pass arguments to a function which is defined as arrow function

```jsx | pure
<button onClick={this.handleClick(id)} />;
handleClick = id => () => {
  console.log('Hello, your ticket number is', id);
};
```

### 16. What are synthetic events in React?

`SyntheticEvent` is a cross-browser wrapper around the browser's native event. It's API is same as the browser's native event, including `stopPropagation()` and `preventDefault()`, except the events work identically across all browsers.

### 17. What are inline conditional expressions?

You can use either _if statements_ or _ternary expressions_ which are available from JS to conditionally render expressions. Apart from these approaches, you can also embed any expressions in JSX by wrapping them in curly braces and then followed by JS logical operator `&&`.

```jsx | pure
<h1>Hello!</h1>;
{
  messages.length > 0 && !isLogin ? (
    <h2>You have {messages.length} unread messages.</h2>
  ) : (
    <h2>You don't have unread messages.</h2>
  );
}
```

### 18. What is "key" prop and what is the benefit of using it in arrays of elements?

A `key` is a special string attribute you **should** include when creating arrays of elements. _Key_ prop helps React identify which items have changed, are added, or are removed.

Most often we use ID from our data as _key_:

```jsx | pure
const todoItems = todos.map(todo => <li key={todo.id}>{todo.text}</li>);
```

When you don't have stable IDs for rendered items, you may use the item _index_ as a _key_ as a last resort:

```jsx | pure
const todoItems = todos.map((todo, index) => <li key={index}>{todo.text}</li>);
```

**Note:**

1. Using _indexes_ for _keys_ is **not recommended** if the order of items may change. This can negatively impact performance and may cause issues with component state.
2. If you extract list item as separate component then apply _keys_ on list component instead of `li` tag.
3. There will be a warning message in the console if the `key` prop is not present on list items.

### 19. What is the use of refs?

The _ref_ is used to return a reference to the element. They _should be avoided_ in most cases, however, they can be useful when you need a direct access to the DOM element or an instance of a component.

### 20. How to create refs?

There are two approaches

1. This is a recently added approach. _Refs_ are created using `React.createRef()` method and attached to React elements via the `ref` attribute. In order to use _refs_ throughout the component, just assign the _ref_ to the instance property within constructor.

```jsx | pure
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }
  render() {
    return <div ref={this.myRef} />;
  }
}
```

2. You can also use ref callbacks approach regardless of React version. For example, the search bar component's input element accessed as follows.

```jsx | pure
class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.txtSearch = null;
    this.state = { term: '' };
    this.setInputSearchRef = e => {
      this.txtSearch = e;
    };
  }
  onInputChange(event) {
    this.setState({ term: this.txtSearch.value });
  }
  render() {
    return (
      <input
        value={this.state.term}
        onChange={this.onInputChange.bind(this)}
        ref={this.setInputSearchRef}
      />
    );
  }
}
```

You can also use _refs_ in function components using **closures**.

**Note**: You can also use inline ref callbacks even though it is not a recommended approach

![](https://youngjuning.js.org/img/luozhu.png)
