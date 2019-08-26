// example config for observing mutations to an aria attribute

const minValues = [1, 25, 50, 100, 150, 200];

const matchesMinVal = (mutation) => {
  const currentMinVal = Math.round(mutation.target.getAttribute('aria-valuenow'));
  return minValues.includes(currentMinVal);
};

const observeMinSliderPriceChanges = (el) => {
  // the target element has been passed into this wrapper and will be used as the first argument
  // setup the configuration obj that will be passed in as the second argument
  const mutationConfig = {
    attribute: {
      name: 'aria-valuenow',
      condition: matchesMinVal,
      callback: updateInputs
    }
  };
  observeMutations(el, mutationConfig);
};
