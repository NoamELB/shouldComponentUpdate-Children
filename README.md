# shouldComponentUpdate-Children
"Shallow Equal" HOC implementation to optimize shouldComponentUpdate with children / React elements 🐇➰

# Usage
### Option 1: As an [HOC](https://facebook.github.io/react/docs/higher-order-components.html) when exporting a component:
```javascript
import useShallowEqual from 'shouldComponentUpdate-Children';

class MyComponent extends React.Component {
    ....
}
const MyPerformantComponent = useShallowEqual(MyComponent);

export default MyPerformantComponent;
```

### Option 2: As an [HOC](https://facebook.github.io/react/docs/higher-order-components.html) when importing a component:
```javascript
import useShallowEqual from 'shouldComponentUpdate-Children';
import MyComponent from "../my-component";

const MyPerformantComponent = useShallowEqual(MyComponent); // use it just like you would use MyComponent
```

# Q&A
## Why use shouldComponentUpdate?
Performance.
If the change in state or props does not affect your component, you can tell React. React will not re-render your component for no reason in that case.
Read more: https://facebook.github.io/react/docs/react-component.html#shouldcomponentupdate

## How to use shouldComponentUpdate?
```javascript
MyClass extends React.Component {
    ...
    shouldComponentUpdate(nextProps, nextState) {
       // return true or false
    }
}
```
It's common to want to re-render when either the state or any prop has changed - so react created a class that does it for us:
```javascript
MyClass extends React.PureComponent {
    ...
    // don't need to implement shouldComponentUpdate
}
```
Read more: https://facebook.github.io/react/docs/react-api.html#react.purecomponent

## What's the problem with PureComponents?
If "children" (or any other prop) is a React element or an array, it will send a new instance every time.
This means that in most cases, the following check will always be true:
```javascript
this.props.children !== nextProps.children
```
The result is that our component will render even if our prop didn't actually change.

## The solution - shouldComponentUpdate-Children
Wrap your components with this HOC and it will perform a wiser shallow equal check. It will skip props that would have always returned true, regardless of their value:
```javascript
const MyPerformantComponent = useShallowEqual(MyComponent);
```
