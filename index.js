// template_91wrldd
// service_fr3vq0s
// KJXHaU6B8Zzu04vLT
let isModalOpen = false;
let contrastToggle = true;
const scaleFactor = 1 / 20;

function toggleContrast() {
  contrastToggle = !contrastToggle;
  if (contrastToggle) {
    document.body.classList += " dark-theme";
  } else {
    document.body.classList.remove("dark-theme");
  }
}

function contact(event) {
  event.preventDefault();
  const loading = document.querySelector(".modal__overlay--loading");
  const success = document.querySelector(".modal__overlay--success");
  loading.classList += " modal__overlay--visible";
  emailjs
    .sendForm(
      "service_fr3vq0s",
      "template_91wrldd",
      event.target,
      "KJXHaU6B8Zzu04vLT"
    )
    .then(() => {
      loading.classList.remove("modal__overlay--visible");
      success.classList += " modal__overlay--visible";
    })
    .catch(() => {
      loading.classList.remove("modal__overlay--visible");
      alert(
        "The email service is temporarily unavailable Please contact me directly on venus.kandy@gmail.com"
      );
    });
}

function toggleModal(section = 'about') {
  if (isModalOpen) {
    isModalOpen = false;
    return document.body.classList.remove("modal--open");
  }
  isModalOpen = true;
  document.body.classList.add("modal--open");

  // Scroll to the correct section on mobile
  if (window.innerWidth <= 768) {
    const selector = section === 'contact' ? '.modal__contact' : '.modal__about';
    const element = document.querySelector(selector);
    if (element) {
      // Use timeout to wait for modal animation
      setTimeout(() => {
        element.scrollIntoView({ behavior: 'smooth' });
      }, 400);
    }
  }
}

function openMenu() {
    document.body.classList += " menu--open";
}

function closeMenu() {
    document.body.classList.remove("menu--open");
}

window.onload = () => {
  function moveBackground(event) {
    const shapes = document.querySelectorAll(".shape");
    const x = event.clientX * scaleFactor;
    const y = event.clientY * scaleFactor;

    for (let i = 0; i < shapes.length; ++i) {
      const isOdd = i % 2 !== 0;
      const boolInt = isOdd ? -1 : 1;
      shapes[i].style.transform = `translate(${x * boolInt}px, ${y * boolInt}px)`;
    }
  }
  document.onmousemove = moveBackground;

  const canvas = document.getElementById('starfield');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let stars = [];
  const STAR_COUNT = window.innerWidth > 768 ? 1500 : 500;
  const BRIGHT_STAR_CHANCE = 0.2;
  const MILKY_WAY_COUNT = window.innerWidth > 768 ? 1000 : 200;
  let drawState = {};

  const constellations = {
    virgo: [
      { x: -226, y: 118, connections: [1] },
      { x: -99, y: 7, connections: [2] },
      { x: -61, y: 225, connections: [3] },
      { x: 67, y: 26, connections: [4] },
      { x: 29, y: -72, connections: [5] },
      { x: 11, y: -225, connections: [] },
      { x: 138, y: -9, connections: [7] },
      { x: 226, y: -40, connections: [] }
    ],
    leo: [
      { x: 144, y: -80, connections: [1] },
      { x: 111, y: -105, connections: [2] },
      { x: 42, y: -56, connections: [3] },
      { x: 40, y: -11, connections: [4, 7] },
      { x: 88, y: 23, connections: [5] },
      { x: 97, y: 87, connections: [6] },
      { x: -133, y: 65, connections: [7, 8] },
      { x: -143, y: -1, connections: [8] },
      { x: -242, y: 78, connections: [] }
    ],
    taurus: [
      { x: 349, y: 175, connections: [1] },
      { x: 338, y: 155, connections: [2] },
      { x: 171, y: 116, connections: [3] },
      { x: 77, y: 58, connections: [4] },
      { x: 57, y: 21, connections: [5] },
      { x: 32, y: -6, connections: [6] },
      { x: -33, y: -77, connections: [7] },
      { x: -230, y: -181, connections: [] },
      { x: 35, y: 59, connections: [9] },
      { x: 1, y: 49, connections: [10] },
      { x: -284, y: -41, connections: [] }
    ]
  };

  function setupConstellations() {
    Object.values(constellations).forEach((constellation, cIndex) => {
        drawState[cIndex] = { progress: 0, lastUpdate: Date.now() };
        constellation.forEach((starData, starIndex) => {
            let scale = Math.min(canvas.width, canvas.height) / 720;
            if (cIndex === 0) { // Make Virgo 30% smaller
              scale *= 0.7;
            }
            let xOffset, yOffset;

            if (cIndex === 0) { // Start Virgo on the right
              xOffset = canvas.width / 2.5;
              yOffset = 0;
            } else { // Keep other constellations offset
              const angle = (cIndex / Object.keys(constellations).length) * 2 * Math.PI;
              xOffset = Math.cos(angle) * (canvas.width / 2.2);
              yOffset = Math.sin(angle) * (canvas.height / 2.2);
            }
            
            let startZ;
            if (cIndex === 0) { // Virgo
                startZ = canvas.width;
            } else { // Leo and Taurus
                startZ = (canvas.width * 0.75);
            }
            stars.push({
                x: starData.x * scale + xOffset,
                y: starData.y * scale + yOffset,
                z: startZ,
                size: Math.random() * 2 + 3,
                isBright: true,
                isConstellation: true,
                isMilkyWay: false,
                connections: starData.connections,
                constellationIndex: cIndex,
                originalIndex: starIndex, // Assign original index
                shape: 'circle',
                brightness: Math.random() * 0.2 + 0.8,
                twinklePhase: Math.random() * Math.PI * 2,
                twinkleSpeed: (Math.random() * 0.04) + 0.01,
            });
        });
    });
  }

  function init() {
    stars = [];

    // Milky Way
    for (let i = 0; i < MILKY_WAY_COUNT; i++) {
        const x = Math.random() * canvas.width * 2 - canvas.width;
        const y = (Math.random() - 0.5) * (canvas.height * 0.4) + (x * 0.2);
        stars.push({
            x: x,
            y: y,
            z: Math.random() * canvas.width,
            size: Math.random() * 0.5 + 0.1,
            isBright: false,
            isConstellation: false,
            isMilkyWay: true,
            shape: 'circle',
            brightness: Math.random() * 0.1 + 0.05, // Very faint
        });
    }

    // Starfield
    for (let i = 0; i < STAR_COUNT; i++) {
      const shapes = ['circle', 'square', 'diamond'];
      const isBright = Math.random() < BRIGHT_STAR_CHANCE;
      stars.push({
        x: Math.random() * canvas.width - canvas.width / 2,
        y: Math.random() * canvas.height - canvas.height / 2,
        z: Math.random() * canvas.width,
        size: isBright ? Math.random() * 2 + 1 : Math.random() * 1 + 0.5,
        isBright: isBright,
        isConstellation: false,
        isMilkyWay: false,
        shape: shapes[Math.floor(Math.random() * shapes.length)],
        brightness: Math.random() * 0.5 + 0.5,
        twinklePhase: Math.random() * Math.PI * 2,
        twinkleSpeed: (Math.random() * 0.04) + 0.01,
      });
    }

    setupConstellations();
  }

  function animate() {
    const now = Date.now();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const starColor = document.body.classList.contains('dark-theme') ? 'white' : 'black';
    const constellationLineColor = document.body.classList.contains('dark-theme') ? 'rgba(238, 130, 238, 0.05)' : 'rgba(255, 0, 0, 0.05)';

    const projectedConstellations = {};

    stars.forEach(star => {
      star.z -= 0.8;

      if (star.isBright) {
          star.twinklePhase += star.twinkleSpeed;
      }

      if (star.z < 1) {
        if(!star.isConstellation) {
            star.z = canvas.width;
            star.x = star.isMilkyWay ? Math.random() * canvas.width * 2 - canvas.width : Math.random() * canvas.width - canvas.width / 2;
            star.y = star.isMilkyWay ? (Math.random() - 0.5) * (canvas.height * 0.4) + (star.x * 0.2) : Math.random() * canvas.height - canvas.height / 2;
        } else {
            const stagger = star.constellationIndex * (canvas.width / 2);
            if (star.constellationIndex === 0) { // Virgo
                star.z = canvas.width + stagger;
            } else { // Leo and Taurus
                star.z = (canvas.width * 0.75) + stagger;
            }
            if(drawState[star.constellationIndex]) {
                drawState[star.constellationIndex].progress = 0; // Reset progress
            }
        }
      }

      let px = star.x * (256 / star.z) + canvas.width / 2;
      const py = star.y * (256 / star.z) + canvas.height / 2;

      if (star.isConstellation) {
        const curveFactor = Math.sin((1 - (star.z / (canvas.width * 2))) * Math.PI);
        px += curveFactor * 300; // Apply a curve to the x-position
      }

      let opacity = 1;
      if (star.isBright && star.z < 512) { // Fade out only the brightest stars
          opacity = Math.pow(star.z / 512, 2);
      }

      const isVisible = px > 0 && px < canvas.width && py > 0 && py < canvas.height;
      let shouldDraw = !star.isConstellation;

      if(star.isConstellation) {
        const state = drawState[star.constellationIndex];
        const constellationSize = constellations[Object.keys(constellations)[star.constellationIndex]].length;
        if(state && now - state.lastUpdate > 350 && state.progress < constellationSize) {
            state.progress++;
            state.lastUpdate = now;
        }
        if(state && star.originalIndex < state.progress) {
            shouldDraw = true;
        }
      }

      if (isVisible && (shouldDraw || star.isMilkyWay)) {
        const size = star.size * (256 / star.z);
        let twinkle;
        if (star.isConstellation) {
            // More pronounced blink for constellations
            const baseTwinkle = (Math.sin(star.twinklePhase) + 1) / 2; // Range 0-1
            twinkle = Math.pow(baseTwinkle, 20); // Sharpen the peak for a blink effect
        } else {
            // Regular twinkle for other stars
            twinkle = star.isBright ? (Math.sin(star.twinklePhase) * 0.2) + 0.8 : 1;
        }

        if (star.isBright && !star.isMilkyWay) {
          const glow = ctx.createRadialGradient(px, py, size, px, py, size * 2.5);
          glow.addColorStop(0, `rgba(255, 255, 255, ${0.4 * twinkle * opacity})`);
          glow.addColorStop(0.5, `rgba(0, 0, 100, ${0.05 * twinkle * opacity})`);
          glow.addColorStop(1, 'rgba(0, 0, 100, 0)');
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(px, py, size * 2.5, 0, Math.PI * 2);
          ctx.fill();
        }
        
        ctx.save();
        ctx.globalAlpha = opacity * star.brightness * twinkle;
        ctx.fillStyle = star.isMilkyWay ? 'rgba(255, 255, 255, 0.5)' : starColor;
        ctx.beginPath();
        if (star.shape === 'circle') {
            ctx.arc(px, py, size, 0, Math.PI * 2);
        } else if (star.shape === 'square') {
            ctx.rect(px - size / 2, py - size / 2, size, size);
        } else if (star.shape === 'diamond') {
            ctx.moveTo(px, py - size);
            ctx.lineTo(px + size, py);
            ctx.lineTo(px, py + size);
            ctx.lineTo(px - size, py);
            ctx.closePath();
        }
        ctx.fill();
        ctx.restore();

        if (star.isConstellation) {
          if (!projectedConstellations[star.constellationIndex]) {
            projectedConstellations[star.constellationIndex] = [];
          }
          projectedConstellations[star.constellationIndex][star.originalIndex] = { x: px, y: py, connections: star.connections };
        }
      }
    });

    ctx.strokeStyle = constellationLineColor;
    Object.keys(projectedConstellations).forEach(cIndex => {
        const constellation = projectedConstellations[cIndex];
        const progress = drawState[cIndex] ? drawState[cIndex].progress : 0;
        constellation.forEach((star, index) => {
            if (star && index < progress) {
                star.connections.forEach(connIndex => {
                    if (constellation[connIndex] && connIndex < progress) {
                        ctx.beginPath();
                        ctx.moveTo(star.x, star.y);
                        ctx.lineTo(constellation[connIndex].x, constellation[connIndex].y);
                        ctx.stroke();
                    }
                });
            }
        });
    });

    requestAnimationFrame(animate);
  }

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
  });

  init();
  animate();
};
