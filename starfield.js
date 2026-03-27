const stars = 800; // Number of stars in the starfield
const speed = 3; // Speed of the stars

for (let i = 0; i < stars; i++) {
  let star = document.createElement("div");
  star.className = "star";
  document.body.appendChild(star);
}

function animateStars() {
  const allStars = document.querySelectorAll(".star");
  allStars.forEach((star) => {
    let x = parseInt(star.style.left);
    let y = parseInt(star.style.top);

    // Move the star
    y += speed;

    // Reset star to the top if it goes off-screen
    if (y > window.innerHeight) {
      y = 0;
      x = Math.random() * window.innerWidth;
      star.style.left = x + "px";
    }

    star.style.top = y + "px";
  });

  requestAnimationFrame(animateStars);
}

// Initial placement of stars
const allStars = document.querySelectorAll(".star");
allStars.forEach((star) => {
  star.style.left = Math.random() * window.innerWidth + "px";
  star.style.top = Math.random() * window.innerHeight + "px";
});

animateStars();
