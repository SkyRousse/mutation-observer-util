// wrap observe mutations function
const observeStackingOrderMutations = (carouselEl) => {
  // the target element has been passed into this wrapper and will be used as the first argument
  // setup the configuration obj that will be passed in as the second argument
  const mutationConfig = {
    childList: {
      callback: setActiveDot
    }
  };
  observeMutations(carouselEl, mutationConfig);
};

// call the function wrapping the ObserveMutations function
const carouselEl = document.querySelector('.carousel');
observeStackingOrderMutations(carouselEl);
