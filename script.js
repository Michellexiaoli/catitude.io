document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('search-form');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the form from submitting in the traditional way

        const foodInput = document.getElementById('food-input');
        const foodItem = foodInput.value;
        const resultDiv = document.getElementById('result');

        // Clear the input field and result div
        foodInput.value = '';
        resultDiv.innerHTML = '';

        // Check if the input is not empty
        if (foodItem.trim() === '') {
            resultDiv.innerHTML = 'Please enter a food item.';
            return;
        }

        // Make the API request to your server
        fetch('/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ food: foodItem }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Display the result
            resultDiv.innerHTML = `Result: ${data.safe}`;
        })
        .catch(error => {
            console.error('Error:', error);
            resultDiv.innerHTML = 'Error fetching the result.';
        });
    });
});
