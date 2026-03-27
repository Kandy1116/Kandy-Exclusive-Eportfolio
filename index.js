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
  const constellationSpeed = 2.0;
  const starfieldSpeed = 0.2;
  let activeConstellationIndices = [];
  let animationState = 'INITIAL_ALL';
  let singleConstellationIndex = 0;

  const constellations = {
    virgo: [ // Spica at bottom
      { x: -20, y: -220, connections: [1] },    // 0: Vindemiatrix
      { x: -40, y: -70, connections: [2] },     // 1: Minelauva
      { x: -60, y: -10, connections: [3, 6] },   // 2: Porrima
      { x: -140, y: -180, connections: [] },   // 3: Heze (no connection from here in map)
      { x: -200, y: -100, connections: [3] },  // 4: Syrma
      { x: 0, y: 0, connections: [2, 3] },        // 5: Spica
      { x: 130, y: -50, connections: [7] },     // 6: Zaniah
      { x: 150, y: -20, connections: [] }      // 7: Zavijava
    ],
    taurus: [
        { x: -150, y: -100, connections: [1] }, // Elnath
        { x: -50, y: -50, connections: [2] },
        { x: 0, y: 0, connections: [3, 4] },   // Aldebaran
        { x: 50, y: -40, connections: [2] },
        { x: -20, y: 50, connections: [2] },
        { x: 100, y: 80, connections: [3] },
        { x: 150, y: 120, connections: [5] },
        { x: 200, y: 150, connections: [6] }
    ],
    leo: [
        { x: 80, y: 120, connections: [1] },    // 0: Regulus
        { x: 50, y: 80, connections: [2] },     // 1
        { x: 0, y: 0, connections: [1, 3, 5] }, // 2
        { x: -50, y: 50, connections: [2, 4] }, // 3
        { x: -250, y: 20, connections: [3] },   // 4: Denebola
        { x: 20, y: -50, connections: [2, 6] }, // 5: Sickle 1
        { x: 0, y: -100, connections: [5, 7] }, // 6: Sickle 2
        { x: 50, y: -120, connections: [6, 8] }, // 7: Sickle 3
        { x: 80, y: -100, connections: [7] }    // 8: Sickle 4
    ]
  };

  function setupConstellations(state) {
    const constellationStars = stars.filter(s => s.isConstellation);
    const zPos = state === 'INITIAL_ALL' ? canvas.width / 4 : canvas.width;

    constellationStars.forEach(star => {
      star.z = zPos;
    });

    if (state === 'INITIAL_ALL' || state === 'ALL_AGAIN') {
      activeConstellationIndices = Object.keys(constellations).map((_, index) => index);
    } else if (state === 'ONE_BY_ONE') {
      activeConstellationIndices = [singleConstellationIndex];
    }
  }

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
        let xOffset = 0;
        let yOffset = 0;
        if (cIndex === 0) { // Virgo
            xOffset = 0;
            yOffset = -canvas.height / 3.5;
        } else if (cIndex === 1) { // Taurus
            xOffset = -canvas.width / 3;
            yOffset = canvas.height / 4;
        } else { // Leo
            xOffset = canvas.width / 3;
            yOffset = canvas.height / 4;
        }
        stars.push({
          x: starData.x * (canvas.width / 1000) + xOffset,
          y: starData.y * (canvas.height / 800) + yOffset,
          z: 0, // Will be set by setupConstellations
          size: 4.5,
          isBright: true,
          isConstellation: true,
          connections: starData.connections,
          constellationIndex: cIndex,
        });
      });
    });

    setupConstellations(animationState);
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const starColor = document.body.classList.contains('dark-theme') ? 'white' : 'black';
    const constellationLineColor = document.body.classList.contains('dark-theme') ? 'rgba(255, 255, 255, 0.5)' : 'rgba(153, 0, 0, 0.2)';

    const projectedConstellations = {};

    let allConstellationStarsOffScreen = true;
    
    stars.forEach(star => {
      if (star.isConstellation) {
        star.z -= constellationSpeed;
      } else {
        star.z -= starfieldSpeed;
      }
      
      if (star.isConstellation && star.z > 1) {
        allConstellationStarsOffScreen = false;
      }

      if (star.z < 1) {
        if (!star.isConstellation) {
            star.z = canvas.width / 2; // Reset to the middle
            star.x = Math.random() * canvas.width - canvas.width / 2;
            star.y = Math.random() * canvas.height - canvas.height / 2;
        }
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
            if (isActiveConstellation) {
                ctx.strokeStyle = constellationLineColor;
                ctx.lineWidth = 1;
                ctx.stroke();
            }
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

    if (allConstellationStarsOffScreen) {
        if (animationState === 'INITIAL_ALL' || animationState === 'ALL_AGAIN') {
            animationState = 'ONE_BY_ONE';
            singleConstellationIndex = 0;
            setupConstellations('ONE_BY_ONE');
        } else if (animationState === 'ONE_BY_ONE') {
            singleConstellationIndex++;
            if (singleConstellationIndex >= Object.keys(constellations).length) {
                animationState = 'ALL_AGAIN';
                setupConstellations('ALL_AGAIN');
            } else {
                setupConstellations('ONE_BY_ONE');
            }
        }
    }

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