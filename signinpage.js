document.addEventListener('DOMContentLoaded', function () {
    const signInForm = document.querySelector('form');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
  
    // Sample user data (fake database)
    const sampleUsers = [
      {
        email: 'user@example.com',
        password: 'Password123'
      },
      {
        email: 'test@test.com',
        password: 'test123'
      },
      {
        email: 'vansh125khurana@gmail.com',
        password: 'vansh123'
      },
      {
        email: 'bhatiayug175@gmail.com',
        password: 'sambhavKaBff'
      }
    ];
  
    // Email validation regex
    function validateEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
    }
  
    // Form submission handler
    signInForm.addEventListener('submit', function (e) {
      e.preventDefault();
  
      const email = emailInput.value.trim();
      const password = passwordInput.value;
  
      // Validate email format
      if (!validateEmail(email)) {
        alert('❗ Please enter a valid email address.');
        emailInput.focus();
        return;
      }
  
      // Validate password length
      if (password.length < 6) {
        alert('❗ Password must be at least 6 characters long.');
        passwordInput.focus();
        return;
      }
  
      // Check user credentials
      const matchedUser = sampleUsers.find(user =>
        user.email === email && user.password === password
      );
  
      if (matchedUser) {
        alert('✅ Login successful! Redirecting...');
        window.location.href = './login.html'; // Change this if your dashboard file name differs
      } else {
        alert('❌ Invalid email or password. Please try again.');
        passwordInput.value = '';
        passwordInput.focus();
      }
  
      // Optionally reset the form
      // signInForm.reset();
    });
  });
  
