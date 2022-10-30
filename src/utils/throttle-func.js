function throttle(cb, timerOpt) {
  let { delay = 1000, shouldWait, waitingArgs } = timerOpt;

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
