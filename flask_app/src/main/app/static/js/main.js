document.addEventListener('DOMContentLoaded', function() {
  const carousel = document.querySelector('.parks-carousel');
  const prevBtn = document.querySelector('.carousel-arrow-left');
  const nextBtn = document.querySelector('.carousel-arrow-right');
  
  if (!carousel || !prevBtn || !nextBtn) return;
  
  // Disable left button
  prevBtn.disabled = true;
  
  // Update button states
  function updateButtons() {
    const isAtStart = carousel.scrollLeft <= 10;
    const isAtEnd = carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth - 10;
    
    prevBtn.disabled = isAtStart;
    nextBtn.disabled = isAtEnd;
  }
  
  // Click events
  prevBtn.addEventListener('click', () => {
    if (!prevBtn.disabled) {
      carousel.scrollBy({ left: -300, behavior: 'smooth' });
    }
  });
  
  nextBtn.addEventListener('click', () => {
    if (!nextBtn.disabled) {
      carousel.scrollBy({ left: 300, behavior: 'smooth' });
    }
  });

  // Events to update button states
  carousel.addEventListener('scroll', updateButtons);
  window.addEventListener('resize', updateButtons);
  
  // Initial state
  setTimeout(updateButtons, 100);
  setTimeout(updateButtons, 500);

  window.addEventListener('load', updateButtons);
  
});

/* ============================
Park Gallery Functionality 
=============================*/

document.addEventListener('DOMContentLoaded', function() {
  const mainImg = document.getElementById('gallery-main-img');
  const thumbItems = document.querySelectorAll('.thumb-item');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  
  let currentIndex = 1;
  const totalImages = 4;
  
  // Update main image
  function updateMainImage(index) {
    const thumb = document.querySelector(`.thumb-item[data-index="${index}"]`);
    if (!thumb) return;
    
    mainImg.src = thumb.dataset.src;
    
    thumbItems.forEach(item => {
      item.classList.remove('active');
    });
    thumb.classList.add('active');
    
    prevBtn.disabled = index === 1;
    nextBtn.disabled = index === totalImages;
    
    currentIndex = index;
  }
  
  // Thumbnails
  thumbItems.forEach(thumb => {
    thumb.addEventListener('click', function() {
      const index = parseInt(this.dataset.index);
      updateMainImage(index);
    });
  });
  
  // Buttons Navigation
  prevBtn.addEventListener('click', function() {
    if (currentIndex > 1) updateMainImage(currentIndex - 1);
  });
  
  nextBtn.addEventListener('click', function() {
    if (currentIndex < totalImages) updateMainImage(currentIndex + 1);
  });
  
  // Keyboard Navigation
  document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft') prevBtn.click();
    if (e.key === 'ArrowRight') nextBtn.click();
  });
  
  // Initialization
  updateMainImage(1);
});