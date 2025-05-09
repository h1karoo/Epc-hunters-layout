document.addEventListener('DOMContentLoaded', function () {
    let originalSteps = null;
    let sliderActive = false;
    let currentSlide = 1;

    function createSlider() {
        const steps = document.querySelector('.steps');
        if (!steps) return;

        originalSteps = steps.cloneNode(true);
        const items = Array.from(steps.querySelectorAll('.steps__item'));

        const sliderWrapper = document.createElement('div');
        sliderWrapper.className = 'steps-mobile-slider';
        Object.assign(sliderWrapper.style, {
            position: 'relative',
            width: '100%',
            display: 'flex',
        });

        const sliderInner = document.createElement('div');
        sliderInner.className = 'slider-inner';
        Object.assign(sliderInner.style, {
            display: 'flex',
            transition: 'transform 0.3s ease',
            width: 'max-content',
            alignItems: 'center',
            gap: '40px',
        });

        const firstClone = items[0].cloneNode(true);
        const lastClone = items[items.length - 1].cloneNode(true);

        const allItems = [lastClone, ...items, firstClone];

        allItems.forEach(item => {
            item.style.flex = '0 0 auto';
            item.style.marginRight = '1px'; 
            item.style.position = 'unset';
            item.style.transition = 'opacity 0.3s ease, visibility 0.3s ease';
            item.style.visibility = 'hidden';

            const mark = item.querySelector('.steps__mark');
            if (mark) {
                Object.assign(mark.style, {
                    position: 'relative',
                    top: '-221px',
                    right: '-148px',
                    zIndex: '2',
                });
            }

            sliderInner.appendChild(item);
        });

        sliderWrapper.appendChild(sliderInner);

        const leftArrow = document.createElement('button');
        const leftImg = document.createElement('img');
        leftImg.src = './src/img/arrow.svg';
        leftImg.alt = 'Arrow';
        leftImg.style.width = '24px';
        leftImg.style.height = '24px';
        leftImg.className = "leftImg";
        Object.assign(leftArrow.style, {
            position: 'absolute',
            bottom: '-56px',
            left: '0',
            transform: 'translateY(-50%)',
            zIndex: '10',
            background: 'none',
            border: 'none',
            cursor: 'pointer'
        });
        leftArrow.appendChild(leftImg);
        leftArrow.className = "leftImg";

        const rightArrow = document.createElement('button');
        const rightImg = document.createElement('img');
        rightImg.src = './src/img/arrow.svg';
        rightImg.alt = 'Arrow';
        rightImg.style.width = '24px';
        rightImg.style.height = '24px';
        rightImg.style.transform = 'rotate(180deg)';
        Object.assign(rightArrow.style, {
            position: 'absolute',
            bottom: '-56px',
            right: '0',
            transform: 'translateY(-50%)',
            zIndex: '10',
            background: 'none',
            border: 'none',
            cursor: 'pointer'
        });
        rightArrow.appendChild(rightImg);
        rightArrow.className = "rightImg";

        const totalSlides = items.length;

        function moveToSlide(index) {
            sliderInner.style.transition = 'transform 0.3s ease';

            const slide = sliderInner.querySelector('.steps__item');
            const slideStyle = window.getComputedStyle(slide);
            const slideMargin = parseFloat(slideStyle.marginRight);
            const slideWidth = slide.offsetWidth + slideMargin;

            const containerWidth = sliderWrapper.offsetWidth;
            const offset = ((slideWidth + 40) * index) - (containerWidth - slideWidth) / 2;

            sliderInner.style.transform = `translateX(-${offset}px)`;

            currentSlide = index;

            updateSlideVisibility();
        }

        function updateSlideVisibility() {
            const allSlides = Array.from(sliderInner.querySelectorAll('.steps__item'));

            allSlides.forEach((slide, index) => {
                if (index === currentSlide) {
                    slide.style.visibility = 'visible';
                    slide.style.opacity = '1';
                } else {
                    slide.style.visibility = 'hidden';
                    slide.style.opacity = '0';
                }
            });
        }

        rightArrow.addEventListener('click', () => {
            if (currentSlide < totalSlides) {
                moveToSlide(currentSlide + 1);
            } else if (currentSlide === totalSlides) {
                moveToSlide(1);
            }
        });

        leftArrow.addEventListener('click', () => {
            if (currentSlide > 1) {
                moveToSlide(currentSlide - 1);
            } else if (currentSlide === 1) {
                moveToSlide(totalSlides);
            }
        });

        sliderInner.addEventListener('transitionend', () => {
            if (currentSlide === totalSlides) {
                sliderInner.style.transition = 'none';
                moveToSlide(totalSlides);
            }
            if (currentSlide === 0) {
                sliderInner.style.transition = 'none';
                moveToSlide(totalSlides);
            }
        });

        sliderWrapper.appendChild(leftArrow);
        sliderWrapper.appendChild(rightArrow);
        // Свайпы
let touchStartX = 0;
let touchEndX = 0;

sliderInner.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
}, false);

sliderInner.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipeGesture();
}, false);

function handleSwipeGesture() {
    const swipeDistance = touchEndX - touchStartX;

    if (Math.abs(swipeDistance) < 30) return;

    if (swipeDistance > 0) {
        if (currentSlide > 1) {
            moveToSlide(currentSlide - 1);
        } else {
            moveToSlide(totalSlides);
        }
    } else {
        if (currentSlide < totalSlides) {
            moveToSlide(currentSlide + 1);
        } else {
            moveToSlide(1);
        }
    }
}
        steps.replaceWith(sliderWrapper);
        sliderActive = true;

        setTimeout(() => moveToSlide(1), 50);
    }
    function destroySlider() {
        const currentSlider = document.querySelector('.steps-mobile-slider');
        if (currentSlider && originalSteps) {
            currentSlider.replaceWith(originalSteps);
            sliderActive = false;
            currentSlide = 1;
        }
    }
    function checkSliderMode() {
        if (window.innerWidth < 380 && !sliderActive) {
            createSlider();
        } else if (window.innerWidth >= 380 && sliderActive) {
            destroySlider();
        }
    }
    checkSliderMode();
    window.addEventListener('resize', checkSliderMode);
});
