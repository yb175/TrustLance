
  document.addEventListener('DOMContentLoaded', function() {
    const signUpForm = document.querySelector('form');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const fullNameInput = document.getElementById('fullname');
    const termsCheckbox = document.getElementById('terms');

    // Sample existing users (ideally from server/database)
    const sampleUsers = [
      { email: 'user@example.com', password: 'Password123' },
      { email: 'test@test.com', password: 'test123' }
    ];

    signUpForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const email = emailInput.value.trim();
      const password = passwordInput.value;
      const confirmPassword = confirmPasswordInput.value;
      const fullName = fullNameInput.value.trim();

      // Check if user already exists
      const userExists = sampleUsers.some(user => user.email === email);
      if (userExists) {
        alert('Email is already registered.');
        return;
      }

      // Validate password
      const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
      if (!passwordPattern.test(password)) {
        alert('Password must be at least 8 characters long and contain both letters and numbers.');
        return;
      }

      // Confirm passwords match
      if (password !== confirmPassword) {
        alert('Passwords do not match.');
        return;
      }

      // Check if terms are accepted
      if (!termsCheckbox.checked) {
        alert('You must agree to the terms and privacy policy.');
        return;
      }

      // Simulate successful registration
      alert(`Welcome, ${fullName}! Your account has been created.`);

      // Optionally reset the form
      signUpForm.reset();
    });
  });
