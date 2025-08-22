  // Mobile menu functionality
        const mobileToggle = document.getElementById('mobileToggle');
        const sidebar = document.getElementById('sidebar');
        const mobileOverlay = document.getElementById('mobileOverlay');

        mobileToggle.addEventListener('click', () => {
            sidebar.classList.toggle('open');
            mobileOverlay.classList.toggle('show');
        });

        mobileOverlay.addEventListener('click', () => {
            sidebar.classList.remove('open');
            mobileOverlay.classList.remove('show');
        });

        // Search functionality
        const searchInput = document.getElementById('searchInput');
        const tableRows = document.querySelectorAll('#tripsTableBody tr');

        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            tableRows.forEach(row => {
                const text = row.textContent.toLowerCase();
                row.style.display = text.includes(searchTerm) ? '' : 'none';
            });
            updateStats();
        });

        // Filter functionality
        const filterBtns = document.querySelectorAll('.filter-btn');
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const filter = btn.dataset.filter;
                tableRows.forEach(row => {
                    if (filter === 'all') {
                        row.style.display = '';
                    } else {
                        const status = row.dataset.status;
                        row.style.display = status === filter ? '' : 'none';
                    }
                });
                updateStats();
            });
        });

        // Sort functionality
        const sortSelect = document.getElementById('sortSelect');
        const tableHeaders = document.querySelectorAll('th[data-sort]');
        
        sortSelect.addEventListener('change', (e) => {
            sortTable(e.target.value);
        });

        tableHeaders.forEach(header => {
            header.addEventListener('click', () => {
                const sortBy = header.dataset.sort;
                sortTable(sortBy);
            });
        });

        function sortTable(sortBy) {
            const tbody = document.getElementById('tripsTableBody');
            const rows = Array.from(tbody.querySelectorAll('tr'));
            
            rows.sort((a, b) => {
                let aVal, bVal;
                
                switch(sortBy) {
                    case 'id':
                        aVal = a.dataset.id;
                        bVal = b.dataset.id;
                        break;
                    case 'name':
                        aVal = a.querySelector('.trip-name').textContent.toLowerCase();
                        bVal = b.querySelector('.trip-name').textContent.toLowerCase();
                        break;
                    case 'name-desc':
                        aVal = a.querySelector('.trip-name').textContent.toLowerCase();
                        bVal = b.querySelector('.trip-name').textContent.toLowerCase();
                        return bVal.localeCompare(aVal);
                    case 'date':
                        aVal = new Date(a.querySelector('.trip-date').dataset.date);
                        bVal = new Date(b.querySelector('.trip-date').dataset.date);
                        break;
                    case 'location':
                        aVal = a.querySelector('.trip-location').textContent.toLowerCase();
                        bVal = b.querySelector('.trip-location').textContent.toLowerCase();
                        break;
                    case 'cost-low':
                        aVal = parseInt(a.querySelector('.trip-cost').dataset.cost);
                        bVal = parseInt(b.querySelector('.trip-cost').dataset.cost);
                        break;
                    case 'cost-high':
                        aVal = parseInt(a.querySelector('.trip-cost').dataset.cost);
                        bVal = parseInt(b.querySelector('.trip-cost').dataset.cost);
                        return bVal - aVal;
                    default:
                        return 0;
                }
                
                if (typeof aVal === 'string') {
                    return aVal.localeCompare(bVal);
                } else if (aVal instanceof Date) {
                    return aVal - bVal;
                } else {
                    return aVal - bVal;
                }
            });
            
            tbody.innerHTML = '';
            rows.forEach(row => tbody.appendChild(row));
        }

        // Update statistics
        function updateStats() {
            const visibleRows = Array.from(tableRows).filter(row => row.style.display !== 'none');
            const totalTrips = visibleRows.length;
            const upcomingTrips = visibleRows.filter(row => row.dataset.status === 'upcoming').length;
            const completedTrips = visibleRows.filter(row => row.dataset.status === 'completed').length;
            
            let totalSpent = 0;
            visibleRows.forEach(row => {
                if (row.dataset.status === 'completed') {
                    totalSpent += parseInt(row.querySelector('.trip-cost').dataset.cost);
                }
            });

            document.getElementById('totalTrips').textContent = totalTrips;
            document.getElementById('upcomingTrips').textContent = upcomingTrips;
            document.getElementById('completedTrips').textContent = completedTrips;
            document.getElementById('totalSpent').textContent = `$${totalSpent.toLocaleString()}`;
        }

        // Action button functionality
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('action-btn')) {
                const action = e.target.textContent.trim();
                const tripId = e.target.closest('tr').dataset.id;
                
                switch(action) {
                    case 'View Details':
                        console.log(`Viewing details for trip ${tripId}`);
                        break;
                    case 'Edit':
                        console.log(`Editing trip ${tripId}`);
                        break;
                    case 'Review':
                        console.log(`Reviewing trip ${tripId}`);
                        break;
                    case 'Refund':
                        console.log(`Processing refund for trip ${tripId}`);
                        break;
                }
            }
        });

        // Add trip functionality
        document.getElementById('addTripBtn').addEventListener('click', () => {
            console.log('Adding new trip...');
        });

        // Initialize stats
        updateStats();