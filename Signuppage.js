document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirm-password");
    const emailInput = document.getElementById("email");
    const termsCheckbox = document.getElementById("terms");
  
    form.addEventListener("submit", function (e) {
      const password = passwordInput.value;
      const confirmPassword = confirmPasswordInput.value;
      const email = emailInput.value;
  
      const passwordValid = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);
      if (!passwordValid) {
        alert("Password must be at least 8 characters long and include both letters and numbers.");
        e.preventDefault();
        return;
      }
  
      if (password !== confirmPassword) {
        alert("Passwords do not match.");
        e.preventDefault();
        return;
      }
  
      if (!termsCheckbox.checked) {
        alert("You must agree to the Terms of Service and Privacy Policy.");
        e.preventDefault();
        return;
      }
  
      // ✅ Store email and password in localStorage
      localStorage.setItem("signupEmail", email);
      localStorage.setItem("signupPassword", password);
  
      window.location.href = "./signinpage.html"; 

    });
  });
  
  