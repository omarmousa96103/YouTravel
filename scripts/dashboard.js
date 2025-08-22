 const mobileMenuToggle = document.getElementById('mobileMenuToggle');
        const sidebar = document.getElementById('sidebar');
        const mobileOverlay = document.getElementById('mobileOverlay');

        mobileMenuToggle.addEventListener('click', () => {
            sidebar.classList.toggle('open');
            mobileOverlay.classList.toggle('show');
        });

        mobileOverlay.addEventListener('click', () => {
            sidebar.classList.remove('open');
            mobileOverlay.classList.remove('show');
        });

        // Close sidebar on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && sidebar.classList.contains('open')) {
                sidebar.classList.remove('open');
                mobileOverlay.classList.remove('show');
            }
        });

        // Navigation functionality
        const navLinks = document.querySelectorAll('nav a');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                
                // Handle logout separately
                if (href === 'login.html') {
                    e.preventDefault();
                    
                    // Show confirmation dialog
                    if (confirm('Are you sure you want to logout?')) {
                        // Clear any stored user data (if you have any)
                        // localStorage.clear(); // Uncomment if you use localStorage
                        // sessionStorage.clear(); // Uncomment if you use sessionStorage
                        
                        // Redirect to login page
                        window.location.href = 'login.html';
                    }
                    return;
                }
                
                // For other navigation links, prevent default if they don't exist yet
                if (href.includes('.html') && !href.includes('dashboard.html')) {
                    // Check if the page exists, if not show a message
                    const pageName = href.split('.')[0];
                    console.log(`Navigate to ${pageName}`);
                    
                    // You can uncomment this alert for development
                    // alert(`${pageName.charAt(0).toUpperCase() + pageName.slice(1)} page is under development`);
                    
                    // For now, we'll allow the navigation to happen
                    // Remove the e.preventDefault() below when the pages are ready
                    // e.preventDefault();
                }
                
                // Remove active class from all links
                navLinks.forEach(l => {
                    l.classList.remove('active');
                    l.removeAttribute('aria-current');
                });
                
                // Add active class to clicked link (only if staying on same page)
                if (href === 'dashboard.html' || href.includes('#')) {
                    e.preventDefault();
                    link.classList.add('active');
                    link.setAttribute('aria-current', 'page');
                }
                
                // Close mobile menu if open
                sidebar.classList.remove('open');
                mobileOverlay.classList.remove('show');
            });
        });

        // Trip booking functionality
        function bookTrip(destination) {
            const button = event.target;
            const originalText = button.textContent;
            
            // Show loading state
            button.textContent = 'Booking...';
            button.disabled = true;
            button.classList.add('loading');
            
            // Simulate API call
            setTimeout(() => {
                button.textContent = 'Booked!';
                button.style.background = 'linear-gradient(135deg, #38a169 0%, #48bb78 100%)';
                
                // Reset after 2 seconds
                setTimeout(() => {
                    button.textContent = originalText;
                    button.disabled = false;
                    button.classList.remove('loading');
                    button.style.background = '';
                }, 2000);
            }, 1500);
            
            console.log(`Booking trip to ${destination}`);
        }

        // View trip details functionality
        function viewTripDetails(destination) {
            console.log(`Viewing details for ${destination} trip`);
            // Here you would typically show a modal or navigate to a details page
            alert(`Viewing details for ${destination} trip`);
        }

        // Scroll navigation functionality
        function initializeScrollNavigation() {
            const containers = [
                { id: 'upcomingTrips', leftBtn: 'upcomingScrollLeft', rightBtn: 'upcomingScrollRight', indicators: 'upcomingIndicators' },
                { id: 'previousTrips', leftBtn: 'previousScrollLeft', rightBtn: 'previousScrollRight', indicators: 'previousIndicators' }
            ];

            containers.forEach(container => {
                const scrollContainer = document.getElementById(container.id);
                const leftBtn = document.getElementById(container.leftBtn);
                const rightBtn = document.getElementById(container.rightBtn);
                const indicatorsContainer = document.getElementById(container.indicators);
                
                const cards = scrollContainer.querySelectorAll('.trip-card');
                const cardWidth = cards[0].offsetWidth + 24; // card width + gap
                
                // Create scroll indicators
                cards.forEach((_, index) => {
                    const dot = document.createElement('div');
                    dot.className = `scroll-dot ${index === 0 ? 'active' : ''}`;
                    dot.addEventListener('click', () => scrollToCard(scrollContainer, index, cardWidth));
                    indicatorsContainer.appendChild(dot);
                });
                
                // Left scroll button
                leftBtn.addEventListener('click', () => {
                    scrollContainer.scrollBy({ left: -cardWidth, behavior: 'smooth' });
                });
                
                // Right scroll button
                rightBtn.addEventListener('click', () => {
                    scrollContainer.scrollBy({ left: cardWidth, behavior: 'smooth' });
                });
                
                // Update arrow states and indicators on scroll
                scrollContainer.addEventListener('scroll', () => {
                    updateScrollState(scrollContainer, leftBtn, rightBtn, indicatorsContainer, cardWidth);
                });
                
                // Initial state
                updateScrollState(scrollContainer, leftBtn, rightBtn, indicatorsContainer, cardWidth);
                
                // Keyboard navigation
                scrollContainer.addEventListener('keydown', (e) => {
                    if (e.key === 'ArrowLeft') {
                        e.preventDefault();
                        leftBtn.click();
                    } else if (e.key === 'ArrowRight') {
                        e.preventDefault();
                        rightBtn.click();
                    }
                });
            });
        }

        function scrollToCard(container, index, cardWidth) {
            container.scrollTo({ left: index * cardWidth, behavior: 'smooth' });
        }

        function updateScrollState(container, leftBtn, rightBtn, indicatorsContainer, cardWidth) {
            const scrollLeft = container.scrollLeft;
            const maxScroll = container.scrollWidth - container.clientWidth;
            
            // Update arrow states
            leftBtn.classList.toggle('disabled', scrollLeft <= 0);
            rightBtn.classList.toggle('disabled', scrollLeft >= maxScroll - 5);
            
            // Update indicators
            const currentIndex = Math.round(scrollLeft / cardWidth);
            const dots = indicatorsContainer.querySelectorAll('.scroll-dot');
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
        }

        // Touch/swipe support for mobile
        function addTouchSupport() {
            const containers = document.querySelectorAll('.trip-cards');
            
            containers.forEach(container => {
                let startX, startScrollLeft;
                
                container.addEventListener('touchstart', (e) => {
                    startX = e.touches[0].pageX;
                    startScrollLeft = container.scrollLeft;
                }, { passive: true });
                
                container.addEventListener('touchmove', (e) => {
                    const x = e.touches[0].pageX;
                    const walk = (startX - x) * 2;
                    container.scrollLeft = startScrollLeft + walk;
                }, { passive: true });
            });
        }

        // Initialize everything when DOM is loaded
        document.addEventListener('DOMContentLoaded', () => {
            initializeScrollNavigation();
            addTouchSupport();
        });

        // Add keyboard navigation for trip cards
        const tripCards = document.querySelectorAll('.trip-card');
        tripCards.forEach(card => {
            card.setAttribute('tabindex', '0');
            
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    const button = card.querySelector('.get-ticket, .view-details');
                    if (button) {
                        button.click();
                    }
                }
            });
        });

        // Animate stats on page load
        window.addEventListener('load', () => {
            const statNumbers = document.querySelectorAll('.stat-number');
            statNumbers.forEach((stat, index) => {
                setTimeout(() => {
                    stat.style.opacity = '0';
                    stat.style.transform = 'translateY(20px)';
                    
                    setTimeout(() => {
                        stat.style.transition = 'all 0.6s ease';
                        stat.style.opacity = '1';
                        stat.style.transform = 'translateY(0)';
                    }, 100);
                }, index * 100);
            });
        });