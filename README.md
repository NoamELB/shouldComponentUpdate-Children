# shouldComponentUpdate-Children
A PureComponent alternative that will actually improve your application performance!

"Shallow Equal" HOC implementation to optimize shouldComponentUpdate with children / React elements.

# The Problem
React will create a new instance of a React Element on each *render*, so generic implementations to shouldComponentUpdate will return true even if nothing had changed!

Basically, this simple shouldComponentUpdate implementation:
```javascript
return this.props.children !== nextProps.children;
```
is almost as good as writing:
```javascript
return true;
```

See live example here: [codepen.io/NoamELB/pen/RLoxLv](https://codepen.io/NoamELB/pen/RLoxLv?editors=0010)

# Our Solution
**We created an [HOC](https://facebook.github.io/react/docs/higher-order-components.html) which uses [Inheritance Inversion](https://medium.com/@franleplant/react-higher-order-components-in-depth-cf9032ee6c3e#5247) to extend components with a generic shouldComponentUpdate functionality.**

Our generic shouldComponentUpdate implementation does the following:
* execute the wrapped component's shouldComponentUpdate and continue only if returned *true*.
* shallow equal *this.state* vs *next state* and return *true* if not equal.
* shallow equal all *this.props* vs *next props*, but skip React Elements. return *true* if not equal.
* if reached here - returns false


**But isn't this means that if any React Element is actually changing then my component won't render?**

Yes, but that is the whole point. **React Elements are not something you can rely upon when implementing shouldComponentUpdate!**

In order to tell a component that it should render - you can change any non-React-Element prop to indicate a state change (this can be a designated prop just for that or a prop that is actually in use inside the component).

# Usage
## Install
```
npm i -S shouldcomponentupdate-children
```

### Option 1: As an [HOC](https://facebook.github.io/react/docs/higher-order-components.html) when exporting a component:
```javascript
import useShallowEqual from 'shouldcomponentupdate-children';

class MyComponent extends React.Component {
    ....
}
const MyPerformantComponent = useShallowEqual(MyComponent);

export default MyPerformantComponent;
```

### Option 2: As an [HOC](https://facebook.github.io/react/docs/higher-order-components.html) when importing a component:
```javascript
import useShallowEqual from 'shouldcomponentupdate-children';
import MyComponent from './my-component';

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

## How do you determine that a prop is a React Element
1. Any prop that returns true for *React.isValidElement(prop)*.
2. Any array prop that have at least one item which returns true for *React.isValidElement(prop[i])*

## Why implement as an HOC?
HOC is very flexible. You can use it either from the inside when exporting or on the outside when importing.
Using inside is trivial, so let's see some nice example of when to use on the outside:
* Using a vendor component that has performance issues? Just wrap it with the HOC after the import.
* Implementing shouldComponentUpdate in a given component is a refactor headache? HOC to the rescue.
* shouldComponentUpdate is already implemented but not good enough for your usage? I <3 HOC.

# License
MIT
