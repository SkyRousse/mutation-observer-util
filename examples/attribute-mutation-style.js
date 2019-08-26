// example config observing changes to the style attribute

const observeStyleMutations = (carouselEl) => {
  // the target element has been passed into this wrapper and will be used as the first argument
  // setup the configuration obj that will be passed in as the second argument
  const mutationConfig = {
    attribute: {
      name: 'style',
      condition: mutation => mutation.target.style.includes('display:none'),
      callback: updateStyle
    }
  };
  observeMutations(carouselEl, mutationConfig);
};

// call the function wrapping the ObserveMutations function
const carouselEl = document.querySelector('.carousel');
observeStyleMutations(carouselEl);
