// Profile page specific functionality

document.addEventListener('DOMContentLoaded', function() {
    updatePageData();
});

// Mock userType for demonstration. In a real application, this would likely be fetched from a server or stored in a cookie/local storage.
let userType = 'freelancer'; // Default value, can be changed based on actual user data

// This function will be called when the page loads and when user type changes
window.updatePageData = function() {
    // Update payment forms visibility based on user type
    const freelancerPaymentForm = document.getElementById('freelancer-payment-form');
    const clientPaymentForm = document.getElementById('client-payment-form');
    const paymentSubtitle = document.getElementById('payment-subtitle');
    
    if (freelancerPaymentForm && clientPaymentForm && paymentSubtitle) {
        freelancerPaymentForm.style.display = userType === 'freelancer' ? 'block' : 'none';
        clientPaymentForm.style.display = userType === 'client' ? 'block' : 'none';
        
        paymentSubtitle.textContent = userType === 'freelancer' 
            ? 'Update your bank details to receive payments' 
            : 'Update your payment methods';
    }
};