function debounce(cb, timerOpt) {
  const { delay = 1000, timer, setTimer } = timerOpt;

  return (...args) => {
    clearTimeout(timer);
    const newTimer = setTimeout(() => {
      cb(...args);
    }, delay);
    setTimer(newTimer);
  };
}

export { debounce };
