(function () {
  let dac = document.querySelector('.dynamicAdvertContainer');

  if (isDevEnv()) {
    console.log('On Orca');
    addClickout(devClickout);
    addGsap();
  } else {
    addClickout(exitClickHandler);
    // gsap should be added in shell in live environment
  }
  checkForGsap(initGlobalAnimations);

  function isDevEnv() {
    return (
      window.location.href.indexOf('orca.adylic.com') > 0 ||
      window.location.href.indexOf('template.adylicorca.com') > 0 ||
      window.location.href.indexOf('saturn.adylic.com') > 0 ||
      window.location.hostname === '127.0.0.1' ||
      window.location.hostname === 'localhost'
    );
  }

  function devLog(message) {
    if (isDevEnv()) console.log(message);
  }

  function addClickout(callback) {
    dac.addEventListener('click', callback);
  }

  function devClickout() {
    console.log('Clickout works');
  }

  function addGsap() {
    let s1 = document.createElement('script');
    // Update src to latest version of vendor specific GSAP CDN: i.e. Doubleclick, Sizmek
    s1.setAttribute(
      'src',
      'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.4.2/gsap.min.js'
    );
    define = null;
    dac.appendChild(s1);
  }

  function checkForGsap(callback) {
    let DEADLINE_MS = 10000;
    let RETRY_MS = 100;
    let interval;

    let timeout = setTimeout(() => {
      clearInterval(interval);
      devLog('GSAP failed to load after ' + DEADLINE_MS / 1000 + ' second(s).');
    }, DEADLINE_MS);

    try {
      if (gsap) {
        clearTimeout(timeout);
        callback();
      }
    } catch {
      devLog('Initial GSAP load failed. Trying again.');
      interval = setInterval(() => {
        try {
          if (gsap) {
            clearTimeout(timeout);
            clearInterval(interval);
            callback();
          }
        } catch {}
      }, RETRY_MS);
    }
  }

  function initGlobalAnimations() {
    const DURATION = 0.5;
    const tl = gsap.timeline();

    // Define frame classes
    const frames = ['.start-frame', '.middle-frame', '.end-frame'];

    frames.forEach((frame, index) => {
      // Check if current frame exists within the document
      const isPresent = document.querySelector(frame);
      if (!isPresent) return;

      //  Define element selectors
      const headlineSelector = `${frame} .headline`;
      const subheadlineSelector = `${frame} .subheadline`;

      tl.fromTo(headlineSelector, { x: '-100%' }, { x: 0, duration: DURATION }) // end time: 0.5
        .fromTo(subheadlineSelector, { x: '-100%' }, { x: 0, duration: DURATION }, '+=1'); // end time: 2

      const nextFrame = frames[index + 1];
      const isLastFrame = index === frames.length - 1;

      // Check if the next frame exists within the document before fading in
      const nextFrameIsPresent = document.querySelector(nextFrame);
      if (!nextFrameIsPresent) return;

      if (!isLastFrame) {
        tl.to([headlineSelector, subheadlineSelector],{ x: '100%', duration: DURATION }, '+=3') // end time: 5.5
            .to(frame, { opacity: 0, duration: DURATION }) // end time: 6
            // frame out current frame and fade in next frame at the same time
            .to(nextFrame, { opacity: 1, duration: DURATION }, '<'); // end time: 6
      }
    });
  }
})();
