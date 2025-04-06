// Payments page specific functionality

// Mock userType for demonstration purposes.  In a real application, this would be retrieved from a server or a global state.
let userType = 'client'; // Or 'freelancer'

document.addEventListener('DOMContentLoaded', function() {
    updatePageData();
    setupPaymentsEventListeners();
});

function setupPaymentsEventListeners() {
    // Search filter
    const searchInput = document.getElementById('payment-search');
    if (searchInput) {
        searchInput.addEventListener('input', filterPayments);
    }
    
    // Status filter
    const statusFilter = document.getElementById('status-filter');
    if (statusFilter) {
        statusFilter.addEventListener('change', filterPayments);
    }
}

// This function will be called when the page loads and when user type changes
window.updatePageData = function() {
    renderPaymentsTable();
    
    // Update create payment button visibility
    const createPaymentButton = document.getElementById('create-payment-button');
    if (createPaymentButton) {
        createPaymentButton.style.display = userType === 'client' ? 'flex' : 'none';
    }
};

function renderPaymentsTable() {
    const tableBody = document.getElementById('payments-table-body');
    if (!tableBody) return;
    
    // Clear existing rows
    tableBody.innerHTML = '';
    
    // Get payments based on user type
    const payments = getPayments().filter(payment => {
        return userType === 'freelancer' ? payment.type === 'incoming' : payment.type === 'outgoing';
    });
    
    if (payments.length === 0) {
        const emptyRow = document.createElement('tr');
        emptyRow.innerHTML = `
            <td colspan="6" class="empty-state">No payments found</td>
        `;
        tableBody.appendChild(emptyRow);
        return;
    }
    
    // Add payments to the table
    payments.forEach(payment => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td class="payment-id">${payment.id}</td>
            <td>${payment.description}</td>
            <td>$${payment.amount.toFixed(2)}</td>
            <td>${payment.date}</td>
            <td>
                <span class="payment-status ${payment.status}">
                    ${capitalizeFirstLetter(payment.status)}
                </span>
            </td>
            <td class="actions-column">
                <div class="payment-actions">
                    ${getActionButton(payment.status)}
                </div>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
    
    // Add event listeners to action buttons
    const actionButtons = document.querySelectorAll('.payment-action-button');
    actionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const action = this.getAttribute('data-action');
            const paymentId = this.getAttribute('data-payment-id');
            
            // In a real app, this would call an API
            alert(`${action} payment ${paymentId}`);
        });
    });
}

function filterPayments() {
    const searchTerm = document.getElementById('payment-search').value.toLowerCase();
    const statusFilter = document.getElementById('status-filter').value;
    
    const tableBody = document.getElementById('payments-table-body');
    if (!tableBody) return;
    
    // Get all rows
    const rows = tableBody.querySelectorAll('tr');
    
    // Filter rows based on search term and status
    rows.forEach(row => {
        const description = row.cells[1].textContent.toLowerCase();
        const id = row.cells[0].textContent.toLowerCase();
        const status = row.cells[4].textContent.toLowerCase();
        
        const matchesSearch = description.includes(searchTerm) || id.includes(searchTerm);
        const matchesStatus = statusFilter === 'all' || status.toLowerCase().includes(statusFilter);
        
        row.style.display = matchesSearch && matchesStatus ? '' : 'none';
    });
    
    // Show empty state if no visible rows
    let visibleRows = 0;
    rows.forEach(row => {
        if (row.style.display !== 'none') {
            visibleRows++;
        }
    });
    
    if (visibleRows === 0) {
        // If there's already an empty state row, don't add another one
        if (!tableBody.querySelector('.empty-state')) {
            const emptyRow = document.createElement('tr');
            emptyRow.innerHTML = `
                <td colspan="6" class="empty-state">No payments found</td>
            `;
            tableBody.appendChild(emptyRow);
        }
    } else {
        // Remove empty state row if it exists
        const emptyRow = tableBody.querySelector('.empty-state');
        if (emptyRow) {
            emptyRow.parentNode.removeChild(emptyRow);
        }
    }
}

// Helper functions
function getPayments() {
    return [
        {
            id: 'PAY-123456',
            description: 'Website redesign project',
            amount: 1200.00,
            date: 'Apr 2, 2025',
            status: 'completed',
            type: 'incoming'
        },
        {
            id: 'PAY-123455',
            description: 'Mobile app UI design',
            amount: 800.00,
            date: 'Apr 1, 2025',
            status: 'in-escrow',
            type: 'incoming'
        },
        {
            id: 'PAY-123454',
            description: 'Logo design package',
            amount: 500.00,
            date: 'Mar 28, 2025',
            status: 'pending',
            type: 'incoming'
        },
        {
            id: 'PAY-123453',
            description: 'E-commerce development',
            amount: 1500.00,
            date: 'Mar 25, 2025',
            status: 'completed',
            type: 'incoming'
        },
        {
            id: 'PAY-123452',
            description: 'Content writing services',
            amount: 350.00,
            date: 'Mar 20, 2025',
            status: 'completed',
            type: 'incoming'
        },
        {
            id: 'PAY-123451',
            description: 'SEO optimization',
            amount: 600.00,
            date: 'Mar 15, 2025',
            status: 'completed',
            type: 'incoming'
        },
        {
            id: 'PAY-123450',
            description: 'Social media graphics',
            amount: 250.00,
            date: 'Mar 10, 2025',
            status: 'completed',
            type: 'incoming'
        },
        {
            id: 'PAY-123449',
            description: 'Website maintenance',
            amount: 300.00,
            date: 'Mar 5, 2025',
            status: 'completed',
            type: 'incoming'
        },
        {
            id: 'PAY-223456',
            description: 'Website redesign project',
            amount: 1200.00,
            date: 'Apr 2, 2025',
            status: 'completed',
            type: 'outgoing'
        },
        {
            id: 'PAY-223455',
            description: 'Mobile app UI design',
            amount: 800.00,
            date: 'Apr 1, 2025',
            status: 'in-escrow',
            type: 'outgoing'
        },
        {
            id: 'PAY-223454',
            description: 'Logo design package',
            amount: 500.00,
            date: 'Mar 28, 2025',
            status: 'pending',
            type: 'outgoing'
        },
        {
            id: 'PAY-223453',
            description: 'E-commerce development',
            amount: 1500.00,
            date: 'Mar 25, 2025',
            status: 'completed',
            type: 'outgoing'
        },
        {
            id: 'PAY-223452',
            description: 'Content writing services',
            amount: 350.00,
            date: 'Mar 20, 2025',
            status: 'completed',
            type: 'outgoing'
        },
        {
            id: 'PAY-223451',
            description: 'SEO optimization',
            amount: 600.00,
            date: 'Mar 15, 2025',
            status: 'completed',
            type: 'outgoing'
        }
    ];
}

function getActionButton(status) {
    if (status === 'in-escrow' && userType === 'client') {
        return `<button class="secondary-button payment-action-button" data-action="release" data-payment-id="${status}">Release Funds</button>`;
    } else if (status === 'in-escrow' && userType === 'freelancer') {
        return `<button class="secondary-button payment-action-button" data-action="request" data-payment-id="${status}">Request Release</button>`;
    } else if (status === 'pending' && userType === 'freelancer') {
        return `<button class="secondary-button payment-action-button" data-action="accept" data-payment-id="${status}">Accept</button>`;
    } else {
        return '';
    }
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}