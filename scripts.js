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
KGZ1bmN0aW9uICgpIHsKICBmdW5jdGlvbiBpbml0R2xvYmFsQW5pbWF0aW9ucygpIHsKICAgIGNvbnN0IERVUkFUSU9OID0gMC41OwogICAgY29uc3QgdGwgPSBnc2FwLnRpbWVsaW5lKCk7CgogICAgY29uc3QgY3VycmVudEZyYW1lID0gJy5taWRkbGUtZnJhbWUnOwoKICAgIC8vICBEZWZpbmUgZWxlbWVudCBzZWxlY3RvcnMKICAgIGNvbnN0IGhlYWRsaW5lU2VsZWN0b3IgPSBgJHtjdXJyZW50RnJhbWV9IC5oZWFkbGluZWA7CiAgICBjb25zdCBzdWJoZWFkbGluZVNlbGVjdG9yID0gYCR7Y3VycmVudEZyYW1lfSAuc3ViaGVhZGxpbmVgOwoKICAgIHRsLnRvKGN1cnJlbnRGcmFtZSwgeyBvcGFjaXR5OiAxLCBkdXJhdGlvbjogRFVSQVRJT04gfSkgLy8gZW5kIHRpbWU6IDAuNQogICAgICAuZnJvbVRvKGhlYWRsaW5lU2VsZWN0b3IsIHsgeDogJy0xMDAlJyB9LCB7IHg6IDAsIGR1cmF0aW9uOiBEVVJBVElPTiB9KSAvLyBlbmQgdGltZTogMQogICAgICAuZnJvbVRvKAogICAgICAgIHN1YmhlYWRsaW5lU2VsZWN0b3IsCiAgICAgICAgeyB4OiAnLTEwMCUnIH0sCiAgICAgICAgeyB4OiAwLCBkdXJhdGlvbjogRFVSQVRJT04gfSwKICAgICAgICAnKz0xJwogICAgICApIC8vIGVuZCB0aW1lOiAyLjUKICAgICAgLnRvKAogICAgICAgIFtoZWFkbGluZVNlbGVjdG9yLCBzdWJoZWFkbGluZVNlbGVjdG9yXSwKICAgICAgICB7IHg6ICcxMDAlJywgZHVyYXRpb246IERVUkFUSU9OIH0sCiAgICAgICAgJys9MycKICAgICAgKSAvLyBlbmQgdGltZTogNS41CiAgICAgIC50byhjdXJyZW50RnJhbWUsIHsKICAgICAgICBvcGFjaXR5OiAwLAogICAgICAgIHZpc2liaWxpdHk6ICdoaWRkZW4nLAogICAgICAgIGR1cmF0aW9uOiBEVVJBVElPTiwKICAgICAgfSk7IC8vIGVuZCB0aW1lOiA2CiAgfQogIGluaXRHbG9iYWxBbmltYXRpb25zKCk7Cn0pKCk7

// End
(function () {
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
      defaults: { duration: 0.125, scale: 1 },
      extendTimeline: true,
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

  initGlobalAnimations();
})();
