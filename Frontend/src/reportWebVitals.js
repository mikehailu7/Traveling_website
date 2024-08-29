//Author: Mikias Hailu and yared Tsgie
const reportWebVitals = onPerfEntry => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
    });
  }
};

export default reportWebVitals;
