# Mutation Observer Util

This util is a functional wrapper of the Object Mutation Observer API. Its purpose is to make observing DOM changes to specific DOM element(s) and then conditionally executing logic when those changes occur more easily and intuitively done. It can be used simply to watch for the addition or removal of children elements or to observe for mutations of a specific attribute type and condition.

*By default when using the attribute observer it will observe changes to all the children of the target element. It is possible to ignore these mutations by setting the configuration object props of childList and subtree to false.*

## SYNTAX

observeMutations(domElement, configObject);

### PARAMETERS

*domElement*

Type: Node

*configObject*

Type: PlainObject

#### Observe mutations for elements being added or removed from the DOM

required props

```javascript
childList: {
  callback: callbackFunc // function to be called mutation occurs
}
```

basic usage example

```javascript
const elAddedOrRemovedConfig = {
  childList: {
    callback: myCallbackFunction
  }
};
const elParent = document.querySelector("myElementSelector");
observeMutations(elParent, elAddedOrRemovedConfig);
```

#### Observe mutations of element attributes

required props

```javascript
attribute: {
  name: 'attributeName',
  condition: conditionFunc,
  callback: callbackFunc
}
```

optional props
```javascript
childList: false; // if ommited will be true by default
subtree: false; // if ommited will be true by default
```

basic usage example

```javascript
const classMutationConfig = {
   attribute: {
    name: 'class',
    condition: mutation => mutation.target.className.trim().includes('some-class'),
    callback: myCallbackFunction;
  }
  childList: false; // if ommited would be true by default
  subtree: false; // if ommited would be true by default
};
const el = document.querySelector("myElementSelector");
observeMutations(el, classMutationConfig);
```
