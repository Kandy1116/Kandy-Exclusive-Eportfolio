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

function toggleModal() {
  if (isModalOpen) {
    isModalOpen = false;
    return document.body.classList.remove("modal--open");
  }
  isModalOpen = true;
  document.body.classList += " modal--open";
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
  const STAR_COUNT = 1500;
  const BRIGHT_STAR_CHANCE = 0.005;
  let activeConstellationIndices = [];

  const constellations = {
    virgo: [
      { x: 100, y: -50, connections: [1] },
      { x: 150, y: 0, connections: [2] },
      { x: 130, y: 80, connections: [3] },
      { x: 50, y: 120, connections: [4] },
      { x: 0, y: 80, connections: [5, 0] },
      { x: -80, y: 50, connections: [] },
      { x: 200, y: -80, connections: [1] },
      { x: 250, y: -40, connections: [6] },
    ],
    taurus: [
        { x: 0, y: 0, connections: [1] },
        { x: -80, y: -30, connections: [2] },
        { x: -120, y: 20, connections: [0] },
        { x: 40, y: 50, connections: [0] },
        { x: 90, y: 100, connections: [3] },
        { x: 150, y: 130, connections: [4] },
    ],
    leo: [
        { x: 0, y: 0, connections: [1] },
        { x: -50, y: -50, connections: [2] },
        { x: -20, y: -100, connections: [3] },
        { x: 40, y: -80, connections: [0] },
        { x: 80, y: 20, connections: [0] },
        { x: 130, y: 70, connections: [4] },
    ]
  };

  function init() {
    stars = [];
    for (let i = 0; i < STAR_COUNT; i++) {
      const isBright = Math.random() < BRIGHT_STAR_CHANCE;
      stars.push({
        x: Math.random() * canvas.width - canvas.width / 2,
        y: Math.random() * canvas.height - canvas.height / 2,
        z: Math.random() * canvas.width,
        size: isBright ? Math.random() * 2 + 1 : Math.random() * 1 + 0.5,
        isBright: isBright,
        isConstellation: false,
      });
    }

    Object.values(constellations).forEach((constellation, cIndex) => {
      constellation.forEach(starData => {
        const angle = (cIndex / Object.keys(constellations).length) * 2 * Math.PI;
        const xOffset = Math.cos(angle) * (canvas.width / 3);
        const yOffset = Math.sin(angle) * (canvas.height / 3);
        stars.push({
          x: starData.x * (canvas.width / 1000) + xOffset,
          y: starData.y * (canvas.height / 800) + yOffset,
          z: canvas.width / 4, // All constellations start close
          size: 4.5,
          isBright: true,
          isConstellation: true,
          connections: starData.connections,
          constellationIndex: cIndex,
        });
      });
    });

    activeConstellationIndices = Object.keys(constellations).map((_, index) => index);
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const starColor = document.body.classList.contains('dark-theme') ? 'white' : 'black';
    const constellationLineColor = document.body.classList.contains('dark-theme') ? 'rgba(255, 255, 255, 0.5)' : 'rgba(153, 0, 0, 0.2)';

    const projectedConstellations = {};

    stars.forEach(star => {
      star.z -= 0.5;
      if (star.z < 1) {
        star.z = canvas.width / 2; // Reset to the middle
      }

      const k = 128 / star.z;
      const px = star.x * k + canvas.width / 2;
      const py = star.y * k + canvas.height / 2;

      const isVisible = px > 0 && px < canvas.width && py > 0 && py < canvas.height;
      const isActiveConstellation = star.isConstellation && activeConstellationIndices.includes(star.constellationIndex);

      if (isVisible) {
        const size = star.size * k;

        if (star.isBright) {
          const twinkle = Math.random() * 0.5 + 0.5;
          const glow = ctx.createRadialGradient(px, py, size, px, py, size * 5);
          glow.addColorStop(0, `rgba(255, 255, 255, ${0.8 * twinkle})`);
          glow.addColorStop(0.5, `rgba(173, 216, 230, ${0.3 * twinkle})`);
          glow.addColorStop(1, 'rgba(173, 216, 230, 0)');
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(px, py, size * 5, 0, Math.PI * 2);
          ctx.fill();
        }
        
        if (!star.isConstellation || isActiveConstellation) {
            ctx.fillStyle = starColor;
            ctx.beginPath();
            ctx.arc(px, py, size, 0, Math.PI * 2);
            ctx.fill();
        }

        if (isActiveConstellation) {
          if (!projectedConstellations[star.constellationIndex]) {
            projectedConstellations[star.constellationIndex] = [];
          }
          const originalIndex = stars.filter(s => s.isConstellation && s.constellationIndex === star.constellationIndex).indexOf(star);
          projectedConstellations[star.constellationIndex][originalIndex] = { x: px, y: py, connections: star.connections };
        }
      }
    });

    ctx.strokeStyle = constellationLineColor;
    ctx.lineWidth = 0.5;
    Object.values(projectedConstellations).forEach(constellation => {
      constellation.forEach((star, index) => {
        if (star) {
          star.connections.forEach(connIndex => {
            if (constellation[connIndex]) {
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