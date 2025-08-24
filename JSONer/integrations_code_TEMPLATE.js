<div>
    <div class="ip-navbar">
        <div class="ip-nav-items" id="ip-nav-items">
            <div class="ip-search-container">
                <img src="https://capacity.com/wp-content/uploads/2025/03/search.webp" class="ip-search-icon" id="ip-search-icon" alt="Search">
                <input type="text" placeholder="Search integrations..." class="ip-search-bar" id="ip-search-bar" />
            </div>
            <!-- Navigation items will be dynamically managed here -->
        </div>
        <!-- Move More dropdown outside the nav-items container -->
        <div class="ip-dropdown ip-more-dropdown" id="ip-more-dropdown">
            <div class="ip-nav-item">More ▼</div>
            <div class="ip-dropdown-content" id="ip-dropdown-content">
                <!-- Dropdown items will be dynamically populated -->
            </div>
        </div>
    </div>

    <div class="ip-container">
        <div class="ip-filter-section">
            <p class="ip-filter-title">Filter:</p>
            <div class="ip-filter-option">
                <input type="checkbox" id="api">
                <label for="api">API</label>
                <span class="ip-info-icon">i
                    <div class="ip-tooltip">APIs apps connect to REST, XML or SOAP endpoints.</div>
                </span>
            </div>
            <div class="ip-filter-option">
                <input type="checkbox" id="calendar">
                <label for="calendar">Calendar</label>
                <span class="ip-info-icon">i
                    <div class="ip-tooltip">Calendar integrations synchronize with scheduling services.</div>
                </span>
            </div>
            <div class="ip-filter-option">
                <input type="checkbox" id="indexed">
                <label for="indexed">Indexed</label>
                <span class="ip-info-icon">i
                    <div class="ip-tooltip">Indexed services have their content searchable in the platform.</div>
                </span>
            </div>
            <div class="ip-filter-option">
                <input type="checkbox" id="interface">
                <label for="interface">Interface</label>
                <span class="ip-info-icon">i
                    <div class="ip-tooltip">Interface integrations provide a direct UI connection.</div>
                </span>
            </div>
        </div>

        <div class="ip-integrations-grid" id="integrations-grid">
            <!-- Integration cards will be populated here via JavaScript -->
        </div>
    </div>
</div>

<script>

    // All category names in order they should appear
    const allCategories = [
        "all",
        "Agent Productivity",
        "Analytics",
        "Assets & Incident Management",
        "Bots & Workflows",
        "CRM",
        "Data Sync & Migration",
        "Escalation Platforms",
        "File Sharing & Collaboration",
        "Issue Tracking & Alerts",
        "Knowledge & Content Management",
        "Messaging",
        "Payments",
        "Private Apps",
        "Security",
        "Social Media & Channels",
        "Surveys & Feedback"
    ];

    // Variables to track current filters
    let currentCategory = "all";
    let checkboxFilters = {
        api: false,
        calendar: false,
        indexed: false,
        interface: false
    };
    let searchQuery = ""; // Add variable to track search query

    // Sample integrations data as fallback
    let integrations = [
        {
            name: "Slack",
            website: "https://slack.com",
            image_url: "https://logo.clearbit.com/slack.com",
            category: "Messaging",
            api: "TRUE",
            calendar: "FALSE",
            indexed: "TRUE",
            interface: "FALSE"
        },
        {
            name: "Google Calendar",
            website: "https://calendar.google.com",
            image_url: "https://logo.clearbit.com/google.com",
            category: "Agent Productivity",
            api: "TRUE",
            calendar: "TRUE",
            indexed: "FALSE",
            interface: "TRUE"
        },
        {
            name: "Zendesk",
            website: "https://zendesk.com",
            image_url: "https://logo.clearbit.com/zendesk.com",
            category: "CRM",
            api: "TRUE",
            calendar: "FALSE",
            indexed: "TRUE",
            interface: "TRUE"
        },
        {
            name: "Salesforce",
            website: "https://salesforce.com",
            image_url: "https://logo.clearbit.com/salesforce.com",
            category: "CRM",
            api: "TRUE",
            calendar: "FALSE",
            indexed: "TRUE",
            interface: "FALSE"
        }
    ];

    // Pagination variables
    let itemsPerPage = 12;
    let initialItemsToShow = 52;  // Show 54 items initially
    let currentPage = 1;
    let filteredIntegrations = [];

    // Function to count integrations by category
    function countIntegrationsByCategory() {
        const counts = {
            "all": integrations.length
        };

        integrations.forEach(integration => {
            if (!counts[integration.category]) {
                counts[integration.category] = 0;
            }
            counts[integration.category]++;
        });

        return counts;
    }

    // Add category counts to nav items
    function addCategoryCounts() {
        const counts = countIntegrationsByCategory();

        // Add counts to main nav
        document.querySelectorAll('.ip-nav-item[data-category]').forEach(item => {
            const category = item.getAttribute('data-category');
            if (counts[category] !== undefined) {
                const countSpan = document.createElement('span');
                countSpan.className = 'ip-category-counter';
                countSpan.textContent = `(${counts[category]})`;
                item.appendChild(countSpan);
            }
        });

        // Add counts to dropdown items
        document.querySelectorAll('.ip-dropdown-content a[data-category]').forEach(item => {
            const category = item.getAttribute('data-category');
            if (counts[category] !== undefined) {
                const countSpan = document.createElement('span');
                countSpan.className = 'ip-category-counter';
                countSpan.textContent = `(${counts[category]})`;
                item.appendChild(countSpan);
            }
        });
    }

    // Function to render integration cards
    function renderIntegrations() {
        const grid = document.getElementById('integrations-grid');
        grid.innerHTML = '';

        // Filter integrations based on current category and checkbox filters
        filteredIntegrations = integrations;

        // Apply search filter first if there's a search query
        if (searchQuery.trim() !== "") {
            const query = searchQuery.toLowerCase().trim();
            filteredIntegrations = filteredIntegrations.filter(integration => 
                integration.name.toLowerCase().includes(query) || 
                integration.category.toLowerCase().includes(query)
            );
        }

        // Filter by category next
        if (currentCategory !== "all") {
            filteredIntegrations = filteredIntegrations.filter(integration =>
                integration.category === currentCategory
            );
        }

        // Apply checkbox filters if any are checked
        const anyCheckboxChecked = Object.values(checkboxFilters).some(value => value === true);

        if (anyCheckboxChecked) {
            filteredIntegrations = filteredIntegrations.filter(integration => {
                return (!checkboxFilters.api || integration.api === "TRUE") &&
                    (!checkboxFilters.calendar || integration.calendar === "TRUE") &&
                    (!checkboxFilters.indexed || integration.indexed === "TRUE") &&
                    (!checkboxFilters.interface || integration.interface === "TRUE");
            });
        }

        // Add search results indicator if searching
        if (searchQuery.trim() !== "") {
            const resultsCount = document.createElement('div');
            resultsCount.className = 'ip-search-results-count';
            
            if (filteredIntegrations.length === 0) {
                resultsCount.textContent = 'No matching integrations found';
            } else if (filteredIntegrations.length === 1) {
                resultsCount.textContent = '1 integration found';
            } else {
                resultsCount.textContent = `${filteredIntegrations.length} integrations found`;
            }
            
            grid.appendChild(resultsCount);
        }

        // Display no results message if needed
        if (filteredIntegrations.length === 0) {
            // Only show this message if we're not already showing a search-specific message
            if (searchQuery.trim() === "") {
                const noResults = document.createElement('div');
                noResults.className = 'ip-no-results';
                noResults.textContent = 'No integrations match your filters. Try adjusting your criteria.';
                grid.appendChild(noResults);
            }
            return;
        }

        // Reset pagination when filters change
        currentPage = 1;

        // Render only the first page of cards
        renderPage();
    }

    // Function to render a specific page of cards
    function renderPage() {
        const grid = document.getElementById('integrations-grid');

        // Clear any existing "View More" button
        const existingButton = document.querySelector('.ip-view-more-container');
        if (existingButton) {
            existingButton.remove();
        }

        // Calculate start and end indices for the current page
        const startIndex = 0;
        const endIndex = currentPage === 1 ? initialItemsToShow : initialItemsToShow + ((currentPage - 1) * itemsPerPage);
        const currentItems = filteredIntegrations.slice(startIndex, endIndex);

        // Remove all existing cards
        const existingCards = document.querySelectorAll('.ip-integration-card');
        existingCards.forEach(card => card.remove());

        // Render cards for the current page
        currentItems.forEach(integration => {
            const card = document.createElement('div');
            card.className = 'ip-integration-card';

            // Use data-src for lazy loading. If no logo exists, fallback to a blank gray square.
            const fallbackImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='150'%3E%3Crect width='150' height='150' fill='%23ffffff'/%3E%3C/svg%3E";
            const imageUrl = integration.image_url || fallbackImage;

            // Create tags HTML
            let tagsHtml = '';
            if (integration.api === "TRUE") {
                tagsHtml += '<div class="ip-tag ip-tag-api">API</div>';
            }
            if (integration.indexed === "TRUE") {
                tagsHtml += '<div class="ip-tag ip-tag-indexed">Indexed</div>';
            }
            if (integration.interface === "TRUE") {
                tagsHtml += '<div class="ip-tag ip-tag-interface">Interface</div>';
            }
            if (integration.calendar === "TRUE") {
                tagsHtml += '<div class="ip-tag ip-tag-calendar">Calendar</div>';
            }

            card.innerHTML = `
                <div class="ip-integration-logo">
                    <img class="ip-lazy-image" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3C/svg%3E" data-src="${imageUrl}" alt="${integration.name} logo">
                </div>
                <div class="ip-integration-name">${integration.name}</div>
                <div class="ip-integration-tags">
                    ${tagsHtml}
                </div>
            `;
            grid.appendChild(card);
        });
        // Add "View More" button if there are more items to show
        if (endIndex < filteredIntegrations.length) {
            const viewMoreContainer = document.createElement('div');
            viewMoreContainer.className = 'ip-view-more-container';

            const viewMoreBtn = document.createElement('button');
            viewMoreBtn.className = 'ip-view-more-btn';
            const remainingCount = filteredIntegrations.length - endIndex;
            viewMoreBtn.textContent = `View More (${remainingCount} remaining)`;

            viewMoreBtn.addEventListener('click', () => {
                currentPage++;
                renderPage();
            });

            viewMoreContainer.appendChild(viewMoreBtn);
            grid.appendChild(viewMoreContainer);
        }

        // Initialize lazy loading for newly added images
        initLazyLoading();
    }

    // Function to initialize lazy loading for images
    function initLazyLoading() {
        const lazyImages = document.querySelectorAll('.ip-lazy-image');

        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const image = entry.target;
                        image.src = image.dataset.src;
                        image.classList.remove('ip-lazy-image');
                        imageObserver.unobserve(image);
                    }
                });
            });

            lazyImages.forEach(image => {
                imageObserver.observe(image);
            });
        } else {
            // Fallback for browsers that don't support IntersectionObserver
            lazyImages.forEach(image => {
                image.src = image.dataset.src;
                image.classList.remove('ip-lazy-image');
            });
        }
    }

    // Function to handle responsive navigation
    function handleResponsiveNav() {
        const navContainer = document.getElementById('ip-nav-items');
        const dropdown = document.getElementById('ip-more-dropdown');
        const dropdownContent = document.getElementById('ip-dropdown-content');
        const searchContainer = document.querySelector('.ip-search-container');

        // Clear existing navigation items except search container
        const navItems = Array.from(document.querySelectorAll('.ip-nav-item[data-category]'));
        navItems.forEach(item => item.remove());

        // Clear dropdown content
        dropdownContent.innerHTML = '';

        // Get available width for nav items
        const containerWidth = navContainer.offsetWidth;
        const searchContainerWidth = searchContainer.offsetWidth;
        
        // Measure the width of the "More" dropdown
        const moreDropdownWidth = dropdown.offsetWidth + 30; // Add buffer
        
        // Calculate available width, accounting for search container and "More" dropdown
        // Add extra buffer to prevent overlap
        const availableWidth = containerWidth - searchContainerWidth - moreDropdownWidth; 
        
        // Check if we're on a mobile device
        const isMobile = window.innerWidth <= 780;

        let usedWidth = 0;
        let visibleCategories = [];
        let allCategoriesWithWidths = [];

        // First, measure all categories
        allCategories.forEach(category => {
            const temp = document.createElement('div');
            temp.className = 'ip-nav-item';
            temp.setAttribute('data-category', category);
            temp.textContent = category === 'all' ? 'All' : category;

            // Add to DOM temporarily to measure
            temp.style.position = 'absolute';
            temp.style.visibility = 'hidden';
            navContainer.appendChild(temp);

            const width = temp.offsetWidth + 25; // add gap
            navContainer.removeChild(temp);
            
            allCategoriesWithWidths.push({
                category: category,
                width: width
            });
        });

        // For non-mobile, always include "all" category first
        // For mobile, only include it if there's enough space
        const allCategoryData = allCategoriesWithWidths.find(item => item.category === 'all');
        
        if (allCategoryData) {
            if (!isMobile || (isMobile && allCategoryData.width < availableWidth)) {
                visibleCategories.push(allCategoryData.category);
                usedWidth += allCategoryData.width;
            }
        }

        // Then add other categories only if they fit completely
        for (let i = 1; i < allCategoriesWithWidths.length; i++) {
            const categoryData = allCategoriesWithWidths[i];
            if (usedWidth + categoryData.width <= availableWidth) {
                visibleCategories.push(categoryData.category);
                usedWidth += categoryData.width;
            } else {
                // Stop as soon as one category doesn't fit
                break;
            }
        }

        // Insert the visible categories after the search container
        visibleCategories.forEach(category => {
            const item = document.createElement('div');
            item.className = 'ip-nav-item';
            item.setAttribute('data-category', category);
            item.textContent = category === 'all' ? 'All' : category;

            if (category === currentCategory) {
                item.classList.add('ip-active');
            }

            // Append to the nav container
            navContainer.appendChild(item);
        });

        // Add ALL categories to dropdown - even the visible ones
        allCategories.forEach(category => {
            const dropdownItem = document.createElement('a');
            dropdownItem.href = '#';
            dropdownItem.setAttribute('data-category', category);
            dropdownItem.textContent = category === 'all' ? 'All' : category;

            // Highlight active category in dropdown
            if (category === currentCategory) {
                dropdownItem.style.backgroundColor = '#f8f9fa';
                dropdownItem.style.fontWeight = 'bold';
            }

            dropdownContent.appendChild(dropdownItem);
        });

        // Add counts to the navigation items
        addCategoryCounts();

        // Re-attach event listeners
        setupNavigation();
    }

    // Add window resize event listener with debouncing
    function setupResponsiveNav() {
        handleResponsiveNav();
        
        // Debounce the resize event for better performance
        let resizeTimer;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(handleResponsiveNav, 250);
        });
    }

    // Set up navigation item click events
    function setupNavigation() {
        // Main nav items
        document.querySelectorAll('.ip-nav-item[data-category]').forEach(item => {
            // Remove any existing listeners first to prevent duplicates
            const newItem = item.cloneNode(true);
            item.parentNode.replaceChild(newItem, item);

            newItem.addEventListener('click', () => {
                // Remove active class from all items
                document.querySelectorAll('.ip-nav-item').forEach(navItem => {
                    navItem.classList.remove('ip-active');
                });

                // Add active class to clicked item
                newItem.classList.add('ip-active');

                // Update current category and render
                currentCategory = newItem.getAttribute('data-category');
                renderIntegrations();
            });
        });

        // Dropdown items
        document.querySelectorAll('.ip-dropdown-content a[data-category]').forEach(item => {
            // Remove any existing listeners first to prevent duplicates
            const newItem = item.cloneNode(true);
            item.parentNode.replaceChild(newItem, item);

            newItem.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation(); // Stop propagation to prevent document click

                // Remove active class from all items
                document.querySelectorAll('.ip-nav-item').forEach(navItem => {
                    navItem.classList.remove('ip-active');
                });

                // Update current category and render
                currentCategory = newItem.getAttribute('data-category');
                renderIntegrations();

                // Hide dropdown after selection
                document.getElementById('ip-dropdown-content').style.display = 'none';

                // Redraw navigation to update active states
                handleResponsiveNav();
            });
        });

        // Setup the More dropdown button - completely remove and re-apply event
        const moreButton = document.querySelector('.ip-more-dropdown .ip-nav-item');
        const newMoreButton = moreButton.cloneNode(true);
        moreButton.parentNode.replaceChild(newMoreButton, moreButton);

        newMoreButton.addEventListener('click', function (e) {
            e.stopPropagation(); // Important: Prevent document click from immediately closing
            const dropdownContent = document.getElementById('ip-dropdown-content');
            if (dropdownContent.style.display === 'block') {
                dropdownContent.style.display = 'none';
            } else {
                dropdownContent.style.display = 'block';
            }
        });
    }

    // Set up checkbox filter events
    function setupCheckboxFilters() {
        document.querySelectorAll('.ip-filter-option input').forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                // Update filter state
                checkboxFilters.api = document.getElementById('api').checked;
                checkboxFilters.calendar = document.getElementById('calendar').checked;
                checkboxFilters.indexed = document.getElementById('indexed').checked;
                checkboxFilters.interface = document.getElementById('interface').checked;

                // Re-render with new filters
                renderIntegrations();
            });
        });
    }

    // Setup search functionality
    function setupSearch() {
        const searchBar = document.getElementById('ip-search-bar');
        const searchIcon = document.getElementById('ip-search-icon');
        
        if (searchBar && searchIcon) {
            // Ensure the icon is visible
            searchIcon.style.display = 'block';
            
            // Add input event listener to capture changes in real-time
            searchBar.addEventListener('input', function(e) {
                searchQuery = e.target.value;
                
                // Update search icon based on content
                if (searchQuery.trim() !== "") {
                    searchIcon.classList.add('ip-search-active');
                } else {
                    searchIcon.classList.remove('ip-search-active');
                }
                
                // Reset to first page and render
                currentPage = 1;
                renderIntegrations();
            });
            
            // Add keydown event to handle Enter key
            searchBar.addEventListener('keydown', function(e) {
                if (e.key === 'Enter') {
                    e.preventDefault(); // Prevent form submission if within a form
                    searchQuery = e.target.value;
                    renderIntegrations();
                    // Remove focus from search bar
                    searchBar.blur();
                }
            });
            
            // Add clear search functionality when clicking the search icon
            searchIcon.addEventListener('click', function() {
                if (searchQuery.trim() !== "") {
                    // Clear the search if there's text
                    searchBar.value = "";
                    searchQuery = "";
                    searchIcon.classList.remove('ip-search-active');
                    renderIntegrations();
                    // Move focus back to search bar
                    setTimeout(() => searchBar.focus(), 10);
                } else {
                    // If empty, just focus the search bar
                    searchBar.focus();
                }
            });
        }
    }

    // Initialize the page - move document click listener outside the setup function
    function init() {
        setupResponsiveNav();
        setupCheckboxFilters();
        setupSearch(); // Add search setup
        renderIntegrations();

        // Attach document click listener only once
        document.addEventListener('click', function () {
            document.getElementById('ip-dropdown-content').style.display = 'none';
        });
        
        // Debug search elements after initialization
        setTimeout(debugSearchElements, 500);
    }

    document.addEventListener("DOMContentLoaded", function () {
        setTimeout(function () {
            let container = document.getElementById("json-container");
            
            // Debug function to verify search elements
            function debugSearchElements() {
                console.log("Debugging search elements...");
                const searchIcon = document.getElementById('ip-search-icon');
                const searchBar = document.getElementById('ip-search-bar');
                const searchContainer = document.querySelector('.ip-search-container');
                
                console.log("Search Icon exists:", !!searchIcon);
                console.log("Search Bar exists:", !!searchBar);
                console.log("Search Container exists:", !!searchContainer);
                
                if (searchIcon) {
                    console.log("Search Icon computed style:", window.getComputedStyle(searchIcon));
                    // Force icon visibility
                    searchIcon.style.display = 'block';
                    searchIcon.style.zIndex = '10';
                }
                
                if (searchBar) {
                    console.log("Search Bar computed style:", window.getComputedStyle(searchBar));
                    // Force transparent background and white text
                    searchBar.style.backgroundColor = 'transparent';
                    searchBar.style.color = 'white';
                }
            }
            
            // Only try to parse JSON if container exists
            if (container) {
                let rawJson = container.getAttribute("data-json");
                console.log("Raw JSON from ACF:", rawJson);

                try {
                    let jsonData = JSON.parse(rawJson || "[]");
                    console.log("Parsed JSON:", jsonData);

                    // Validate JSON and assign to integrations
                    if (Array.isArray(jsonData) && jsonData.length > 0) {
                        integrations = jsonData.map(integration => ({
                            name: integration.name || "Unknown",
                            website: integration.website || "",
                            image_url: integration.image_url || "",
                            category: integration.category || "Uncategorized",
                            api: integration.api || "FALSE",           // Keep as string
                            calendar: integration.calendar || "FALSE", // Keep as string
                            indexed: integration.indexed || "FALSE",   // Keep as string
                            interface: integration.interface || "FALSE" // Keep as string
                        }));
                    }
                } catch (error) {
                    console.error("Error parsing JSON:", error);
                    // Will use fallback data defined above
                }
            } else {
                console.log("Using fallback integration data");
            }

            console.log("Final integrations data:", integrations);

            // Make sure filters are set to default state
            checkboxFilters = {
                api: false,
                calendar: false,
                indexed: false,
                interface: false
            };
            
            // Update checkbox UI to match
            document.getElementById('api').checked = false;
            document.getElementById('calendar').checked = false;
            document.getElementById('indexed').checked = false;
            document.getElementById('interface').checked = false;

            // Set current category to "all"
            currentCategory = "all";
            
            // Initialize marketplace script
            console.log("Integrations marketplace script initializing...");
            init();
        }, 200); // Delay to allow other scripts to load
    });
</script>