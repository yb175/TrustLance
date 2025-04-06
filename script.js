// Simple JavaScript for interactivity
document.addEventListener('DOMContentLoaded', function() {
  // Add click event listeners to buttons
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(button => {
    button.addEventListener('click', function() {
      if (this.classList.contains('tertiary')) {
        // If reconsider button is clicked
        const card = this.closest('.application-card');
        card.classList.remove('filtered');
        
        // Update the score
        const scoreElement = card.querySelector('.score');
        scoreElement.classList.remove('low-match');
        scoreElement.classList.add('good-match');
        scoreElement.querySelector('.score-value').textContent = '70%';
        
        // Change the insights section
        const insights = card.querySelector('.ai-insights');
        insights.innerHTML = `
          <h5><i class="fas fa-lightbulb"></i> AI Reconsideration:</h5>
          <ul>
            <li>Manually reconsidered by hiring manager</li>
            <li>Potential for growth and learning</li>
            <li>Added to consideration pool</li>
          </ul>
        `;
        
        // Change the button
        this.textContent = 'Reconsidered';
        this.disabled = true;
        this.style.opacity = '0.5';
      }
    });
  });
});