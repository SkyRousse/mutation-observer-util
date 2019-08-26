// example config for observing mutations to an aria attribute

const observeActiveClassMutations = (carouselEl) => {
  // the target element has been passed into this wrapper and will be used as the first argument
  // setup the configuration obj that will be passed in as the second argument
  const mutationConfig = {
    attribute: {
      name: 'class',
      condition: mutation => mutation.target.className.trim().includes('product-card-image-selected'),
      callback: updateClass
    }
  };
  observeMutations(carouselEl, mutationConfig);
};

// call the function wrapping the ObserveMutations function
const carouselEl = document.querySelector('.carousel');
observeActiveClassMutations(carouselEl);
