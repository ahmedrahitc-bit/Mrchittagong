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

const quickViewModal = document.createElement('div');
quickViewModal.className = 'quick-view-modal';
quickViewModal.hidden = true;
quickViewModal.setAttribute('role', 'dialog');
quickViewModal.setAttribute('aria-modal', 'true');
quickViewModal.setAttribute('aria-labelledby', 'quickViewTitle');
quickViewModal.innerHTML = `
  <div class="quick-view-dialog">
    <button class="quick-view-close" type="button" aria-label="Close quick view">&times;</button>
    <div class="quick-view-content">
      <img class="quick-view-image" alt="">
      <div class="quick-view-details">
        <span class="quick-view-category"></span>
        <h2 id="quickViewTitle"></h2>
        <div class="quick-view-rating"></div>
        <div class="quick-view-pricing"></div>
        <p class="quick-view-description"></p>
        <p class="quick-view-options" hidden></p>
        <div class="quick-view-actions">
          <a class="btn btn-primary quick-view-order" target="_blank" rel="noopener noreferrer">Add to Cart</a>
          <button class="btn btn-secondary quick-view-dismiss" type="button">Close</button>
        </div>
      </div>
    </div>
  </div>
`;
document.body.append(quickViewModal);

const quickViewImage = quickViewModal.querySelector('.quick-view-image');
const quickViewCategory = quickViewModal.querySelector('.quick-view-category');
const quickViewTitle = quickViewModal.querySelector('#quickViewTitle');
const quickViewRating = quickViewModal.querySelector('.quick-view-rating');
const quickViewPricing = quickViewModal.querySelector('.quick-view-pricing');
const quickViewDescription = quickViewModal.querySelector('.quick-view-description');
const quickViewOptions = quickViewModal.querySelector('.quick-view-options');
const quickViewOrder = quickViewModal.querySelector('.quick-view-order');
let quickViewTrigger = null;
let previousBodyOverflow = '';

document.querySelectorAll('.product-card-item').forEach((card) => {
  const button = document.createElement('button');
  button.className = 'btn btn-secondary quick-view-trigger';
  button.type = 'button';
  button.textContent = 'Quick View';
  button.setAttribute('aria-label', `Quick view ${card.querySelector('h3')?.textContent.trim() || 'product'}`);
  card.append(button);
});

function openQuickView(card, trigger) {
  const image = card.querySelector('.product-shot img');
  const title = card.querySelector('h3')?.textContent.trim();
  const category = card.querySelector('.badge')?.textContent.trim();
  const rating = card.querySelector('.review')?.textContent.trim();
  const price = card.querySelector('.price');
  const oldPrice = card.querySelector('.old-price, del, s');
  const description = card.querySelector('p.product-meta');
  const options = card.querySelector('.product-options, [data-options]');
  const orderLink = card.querySelector('.product-pricing a[href*="wa.me"]');

  if (!image || !title || !price) {
    console.error('Unable to open Quick View: product image, name, or price is missing.', card);
    return;
  }

  quickViewImage.src = image.src;
  quickViewImage.alt = image.alt || title;
  quickViewCategory.textContent = category || '';
  quickViewCategory.hidden = !category;
  quickViewTitle.textContent = title;
  quickViewRating.textContent = rating || '';
  quickViewRating.hidden = !rating;
  quickViewPricing.replaceChildren();
  quickViewPricing.append(document.createTextNode(price.textContent.trim()));
  if (oldPrice) {
    const originalPrice = document.createElement('del');
    originalPrice.className = 'quick-view-old-price';
    originalPrice.textContent = oldPrice.textContent.trim();
    quickViewPricing.append(originalPrice);
  }
  quickViewDescription.textContent = description?.textContent.trim() || '';
  quickViewDescription.hidden = !quickViewDescription.textContent;
  quickViewOptions.textContent = options?.textContent.trim() || '';
  quickViewOptions.hidden = !quickViewOptions.textContent;

  if (orderLink) {
    const orderUrl = new URL(orderLink.href);
    orderUrl.searchParams.set('text', `Hello, I want to order ${title}`);
    quickViewOrder.href = orderUrl.href;
    quickViewOrder.hidden = false;
  } else {
    quickViewOrder.removeAttribute('href');
    quickViewOrder.hidden = true;
  }

  quickViewTrigger = trigger;
  previousBodyOverflow = document.body.style.overflow;
  quickViewModal.hidden = false;
  document.body.style.overflow = 'hidden';
  quickViewModal.querySelector('.quick-view-close').focus();
}

function closeQuickView() {
  if (quickViewModal.hidden) return;
  quickViewModal.hidden = true;
  document.body.style.overflow = previousBodyOverflow;
  quickViewTrigger?.focus();
}

document.addEventListener('click', (event) => {
  const trigger = event.target.closest('.quick-view-trigger');
  if (trigger) {
    openQuickView(trigger.closest('.product-card-item'), trigger);
  }
});

quickViewModal.addEventListener('click', (event) => {
  if (
    event.target === quickViewModal ||
    event.target.closest('.quick-view-close, .quick-view-dismiss')
  ) {
    closeQuickView();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeQuickView();
});

function openImage(imageSrc) {
  const modal = document.getElementById("imageModal");
  const largeImage = document.getElementById("largeImage");

  largeImage.src = imageSrc;
  modal.style.display = "flex";
}

function closeImage() {
  document.getElementById("imageModal").style.display = "none";
}