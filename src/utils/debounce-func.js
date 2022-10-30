function debounce(cb, timerOpt) {
  const { delay = 1000, timeout } = timerOpt;

  return (...args) => {
    clearTimeout(timeout.current);
    timeout.current = setTimeout(() => {
      cb(...args);
      timeout.current = null;
    }, delay);
  };
}

export { debounce };
