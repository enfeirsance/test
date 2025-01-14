// Select elements
const decreaseBtn = document.querySelector('.decreasing-btn');
const increaseBtn = document.querySelector('.adding-btn');
const quantityValue = document.querySelector('.quantity-value');

// Initialize quantity
let quantity = 0;

// Function to update the displayed quantity
function updateQuantity() {
    quantityValue.textContent = quantity;
}

// Event listener for decreasing button
decreaseBtn.addEventListener('click', function() {
    if (quantity > 0) { // Prevent negative values
        quantity--;
        updateQuantity();
    }
});

// Event listener for increasing button
increaseBtn.addEventListener('click', function() {
    quantity++;
    updateQuantity();
});

// Initial display
updateQuantity();

// recommended items functionality
const recommendedItems = document.querySelectorAll('.recommended-items');

let scrollDrag = false;
let scrollStart;
let xScrollLeft;
let filteredItems = Array.from(recommendedItems);

function setupDraggableScrolling(brand) {
    brand.addEventListener('mousedown', (e) => {
        scrollDrag = true;
        scrollStart = e.pageX - brand.offsetLeft;
        xScrollLeft = brand.scrollLeft;
    });

    brand.addEventListener('mouseleave', () => { scrollDrag = false; });
    brand.addEventListener('mouseup', () => { scrollDrag = false; });

    brand.addEventListener('mousemove', (e) => {
        if (!scrollDrag) return;
        e.preventDefault();
        const x = e.pageX - brand.offsetLeft;
        const walk = (x - scrollStart) * 1; // Adjust scroll speed
        brand.scrollLeft = xScrollLeft - walk;
    });
}
// Setup draggable scrolling for all product brands
recommendedItems.forEach(brand => {
    setupDraggableScrolling(brand);
});

// Draggable Images functionality
const images = document.querySelectorAll('.recommended-product-image img');
images.forEach(image => {
    image.addEventListener('mousedown', (e) => {
        e.preventDefault(); // Prevent default behavior
        let isDragging = true;

        const mouseMoveHandler = (event) => {
            if (isDragging) {
                event.preventDefault(); // logic para hindi sya mag scroll
                console.log("image dragged"); // working!
            }
        };

        const mouseUpHandler = () => {
            isDragging = false; // Stop dragging
            document.removeEventListener('mousemove', mouseMoveHandler);
            document.removeEventListener('mouseup', mouseUpHandler);
        };

        document.addEventListener('mousemove', mouseMoveHandler);
        document.addEventListener('mouseup', mouseUpHandler);
    });
});

// Pagination functionality
const paginationPage = document.querySelectorAll('.recommended-items');
const paginationDots = document.querySelectorAll('.page-dot');

const itemsPerPage = 2.5;

paginationPage.forEach(brand => {
    brand.addEventListener('scroll', () => {
        const scrollPosition = brand.scrollLeft;
        const containerWidth = brand.clientWidth;

        // Get the width of the first item
        const firstItem = brand.querySelector('.recommended-item-1'); // Adjust the selector if necessary
        const itemWidth = firstItem ? firstItem.getBoundingClientRect().width : 0; // Use getBoundingClientRect for accurate width

        // Calculate the total number of items
        const totalItems = brand.children.length; // Assuming all children are items
        const totalPages = Math.ceil(totalItems / itemsPerPage); // Calculate total pages

        // Calculate the index of the active pagination dot
        const index = Math.floor(scrollPosition / (itemWidth * itemsPerPage));

        // Ensure the index is within bounds
        const activeIndex = Math.min(index, totalPages - 1);

        // Update active pagination dot
        paginationDots.forEach((dot, i) => {
            dot.classList.toggle('active', i === activeIndex);
        });
    });
});

paginationDots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
        const firstRecommendedItem = recommendedItemsContainer.querySelector('.recommended-item-1');
        const itemWidth = firstRecommendedItem ? firstRecommendedItem.getBoundingClientRect().width : 0;
        const scrollToPosition = i * (itemWidth * Math.floor(recommendedItemsContainer.clientWidth / itemWidth));
        
        recommendedItemsContainer.scrollTo({
            left: scrollToPosition,
        });
    });
}); 