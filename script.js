const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
const yearElement = document.getElementById('year');

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    nav.classList.toggle('open');
  });
}

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

function openImage(imageSrc) {
  const modal = document.getElementById("imageModal");
  const largeImage = document.getElementById("largeImage");

  largeImage.src = imageSrc;
  modal.style.display = "flex";
}

function closeImage() {
  document.getElementById("imageModal").style.display = "none";
}