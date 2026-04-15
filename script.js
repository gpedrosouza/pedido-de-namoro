const revealElements = document.querySelectorAll(".reveal");
const proposalButtons = document.querySelectorAll(".proposal-button");
const proposalCard = document.getElementById("proposalCard");
const proposalResponse = document.getElementById("proposalResponse");
const proposalResponseNote = document.getElementById("proposalResponseNote");
const heartsLayer = document.getElementById("heartsLayer");
const interactiveCards = document.querySelectorAll(".hero__content, .proposal, .gallery__item");

revealElements.forEach((element, index) => {
  element.style.transitionDelay = `${Math.min(index * 70, 280)}ms`;
});

// Reveal suave ao rolar a página.
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.18,
    rootMargin: "0px 0px -30px 0px",
  }
);

revealElements.forEach((element) => revealObserver.observe(element));

interactiveCards.forEach((card) => {
  card.addEventListener("pointermove", handlePointerMove);
  card.addEventListener("pointerleave", resetPointerMove);
});

// Mensagem final ao aceitar o pedido.
const celebrateProposal = () => {
  if (proposalCard.classList.contains("is-celebrating")) {
    for (let index = 0; index < 12; index += 1) {
      window.setTimeout(() => createHeart(), index * 130);
    }
    return;
  }

  proposalCard.classList.add("is-celebrating");
  proposalResponse.textContent =
    "Agora este instante ficou ainda mais bonito: ele ganhou nós dois. ❤️";
  proposalResponseNote.textContent =
    "Que esse seja só o começo de uma história ainda mais leve, mais linda e mais nossa.";

  for (let index = 0; index < 26; index += 1) {
    window.setTimeout(() => createHeart(), index * 105);
  }
};

proposalButtons.forEach((button) => {
  button.addEventListener("click", celebrateProposal);
});

// Pequenos corações sobem de forma leve e elegante.
function createHeart() {
  const heart = document.createElement("span");
  const symbols = ["❤", "♡", "❤", "♥"];
  const drift = `${Math.random() * 110 - 55}px`;
  const rotation = `${Math.random() * 90 - 45}deg`;
  const left = `${10 + Math.random() * 80}%`;
  const size = `${0.95 + Math.random() * 1.05}rem`;
  const symbol = symbols[Math.floor(Math.random() * symbols.length)];

  heart.className = "floating-heart";
  heart.textContent = symbol;
  heart.style.left = left;
  heart.style.fontSize = size;
  heart.style.setProperty("--drift-x", drift);
  heart.style.setProperty("--rotate", rotation);
  heart.style.setProperty("--rise-distance", `${15 + Math.random() * 7}rem`);
  heart.style.color = Math.random() > 0.4 ? "#CA2C92" : "#FF9BF3";
  heart.style.animationDelay = `${Math.random() * 120}ms`;

  heartsLayer.appendChild(heart);

  window.setTimeout(() => {
    heart.remove();
  }, 2600);
}

function handlePointerMove(event) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  const card = event.currentTarget;
  const rect = card.getBoundingClientRect();
  const offsetX = (event.clientX - rect.left) / rect.width;
  const offsetY = (event.clientY - rect.top) / rect.height;
  const rotateY = (offsetX - 0.5) * 4;
  const rotateX = (0.5 - offsetY) * 4;

  card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`;
}

function resetPointerMove(event) {
  event.currentTarget.style.transform = "";
}
