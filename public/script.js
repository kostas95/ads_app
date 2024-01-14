// JavaScript for collapsible menu
document.addEventListener('DOMContentLoaded', function () {
    var coll = document.querySelector('.collapsible');
    var content = document.querySelector('#dropdown-template');

    coll.addEventListener('click', function (event) {
        event.stopPropagation(); // Prevent the click event from reaching the document
        content.style.display = content.style.display === 'block' ? 'none' : 'block';
    });

    // Add an event listener to the document
    document.addEventListener('click', function (event) {
        // Check if the click was outside the collapsible content
        if (!content.contains(event.target) && content.style.display === 'block') {
            content.style.display = 'none';
        }
    });
});


document.addEventListener('DOMContentLoaded', function () {
    // Fetch categories from the API
    fetch('https://wiki-ads.onrender.com/categories')
      .then(response => response.json())
      .then(categories => {
        // Compile Handlebars templates
        const dropdownTemplate = Handlebars.compile(document.getElementById('dropdown-template').innerHTML);

        // Render categories in the dropdown menu
        const productsDropdownContent = document.getElementById('dropdown-template');
        productsDropdownContent.innerHTML = dropdownTemplate({ categories });
      })
      .catch(error => console.error('Error fetching categories:', error));
  });
