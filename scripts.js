// Start
(function () {
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

    const currentFrame = '.start-frame';

    //  Define element selectors
    const headlineSelector = `${currentFrame} .headline`;
    const subheadlineSelector = `${currentFrame} .subheadline`;

    tl.fromTo(headlineSelector, { x: '-100%' }, { x: 0, duration: DURATION }) // end time: 0.5
      .fromTo(
        subheadlineSelector,
        { x: '-100%' },
        { x: 0, duration: DURATION },
        '+=1'
      ) // end time: 2
      .to(
        [headlineSelector, subheadlineSelector],
        { x: '100%', duration: DURATION },
        '+=3.5'
      ) // end time: 5.5
      .to(currentFrame, {
        opacity: 0,
        visibility: 'hidden',
        duration: DURATION,
      }); // end time: 6
  }

  checkForGsap(initGlobalAnimations);
})();

// Middle
(function () {
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

    const currentFrame = '.middle-frame';

    //  Define element selectors
    const headlineSelector = `${currentFrame} .headline`;
    const subheadlineSelector = `${currentFrame} .subheadline`;

    tl.to(currentFrame, { opacity: 1, duration: DURATION }) // end time: 0.5
      .fromTo(headlineSelector, { x: '-100%' }, { x: 0, duration: DURATION }) // end time: 1
      .fromTo(
        subheadlineSelector,
        { x: '-100%' },
        { x: 0, duration: DURATION },
        '+=1'
      ) // end time: 2.5
      .to(
        [headlineSelector, subheadlineSelector],
        { x: '100%', duration: DURATION },
        '+=3'
      ) // end time: 5.5
      .to(currentFrame, {
        opacity: 0,
        visibility: 'hidden',
        duration: DURATION,
      }); // end time: 6
  }
  checkForGsap(initGlobalAnimations);
})();

// End
(function () {
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

    const currentFrame = '.end-frame';

    //  Define element selectors
    const ctaSelector = `${currentFrame} .cta-container`;
    const headlineSelector = `${currentFrame} .headline`;
    const subheadlineSelector = `${currentFrame} .subheadline`;

    const tl = gsap.timeline();

    gsap.registerEffect({
      name: 'pulse',
      effect: (targets, config) => {
        return gsap.to(targets, {
          duration: config.duration,
          scale: config.scale,
        });
      },
      defaults: { duration: 0.125, scale: 1 }, //defaults get applied to any "config" object passed to the effect
      extendTimeline: true, //now you can call the effect directly on any GSAP timeline to have the result immediately inserted in the position you define (default is sequenced at the end)
    });

    tl.to(currentFrame, { opacity: 1, duration: DURATION }) // end time: 0.5
      .fromTo(headlineSelector, { x: '-100%' }, { x: 0, duration: DURATION }) // end time: 1
      .fromTo(
        subheadlineSelector,
        { x: '-100%' },
        { x: 0, duration: DURATION },
        '+=1'
      )
      // end time: 2.5
      .fromTo(ctaSelector, { opacity: 0 }, { opacity: 1, duration: 0.5 })
      .pulse(ctaSelector, { scale: 1.1 })
      .pulse(ctaSelector, { scale: 1 })
      .pulse(ctaSelector, { scale: 1.05 })
      .pulse(ctaSelector, { scale: 1 });
  }
  checkForGsap(initGlobalAnimations);
})();
