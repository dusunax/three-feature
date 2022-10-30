function throttle(cb, timerOpt) {
  const { delay = 1000, timer, setTimer } = timerOpt;

  let shouldWait = false;
  let waitingArgs;

  const timoutFunc = () => {
    if (waitingArgs === null) {
      shouldWait = false;
    } else {
      cb(...waitingArgs);
      waitingArgs = null;
      setTimeout(timoutFunc, delay);
    }
  };

  return (...args) => {
    if (shouldWait) {
      waitingArgs = args;
      return;
    }

    cb(...args);
    shouldWait = true;

    setTimeout(timoutFunc, delay);
  };
}

export { throttle };
