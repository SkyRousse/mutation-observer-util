// flag to be used to prevent recursive execution and stackoverflow
let disableObserver = false;

// helper functions
const missingProperty = (obj, prop, required = true) => {
  if (typeof (obj[prop]) === 'undefined' && required) {
    console.error(`mutation config is missiing the required ${prop} property`);
  }
  return typeof (obj[prop]) === 'undefined';
};

const executeCallBack = (el, callback) => {
  disableObserver = true;
  callback(el);
  disableObserver = false;
};

const observeMutations = (target, mutationConfig = {}) => {
  const configCallback = (mutationsList) => {
    if (disableObserver === true) return;
    // eslint-disable-next-line no-restricted-syntax
    for (const mutation of mutationsList) {
      if (mutation.type === 'attributes') {
        if (missingProperty(mutationConfig, 'attribute')) return;
        if (missingProperty(mutationConfig.attribute, 'condition')) return;
        if (missingProperty(mutationConfig.attribute, 'callback')) return;
        // is the mutated attribute in the mutations list iteration equal to the type of attribute to be watched
        if (mutation.attributeName === mutationConfig.attribute.name) {
          if (mutationConfig.attribute.condition(mutation)) {
            // mutation observer change occured for provided attribute and matching condition returns true',
            executeCallBack(mutation.target, mutationConfig.attribute.callback);
          }
        }
      } else if (mutation.type === 'childList') {
        // a child node has been added or removed
        if (missingProperty(mutationConfig.childList, 'callback')) return;
        executeCallBack(mutation.target, mutationConfig.childList.callback);
      }
    }
  };

  // setup config options for mutation observer
  const watch = {};
  if (mutationConfig.attribute) watch.attributes = true;
  // set childList and subtree to true by default
  if (missingProperty(mutationConfig, 'childList', false)) {
    watch.childList = true;
  } else {
    watch.childList = mutationConfig.childList;
  }
  if (missingProperty(mutationConfig, 'subtree', false)) {
    watch.subtree = true;
  } else {
    watch.subtree = mutationConfig.subtree;
  }
  // Create an observer instance linked to the configCallback function
  const observer = new MutationObserver(configCallback);
  observer.observe(target, watch);
};

export default observeMutations;
