document.addEventListener("DOMContentLoaded", function () {
    getJsonObject('data.json',
        function (data) {
            console.log(data); // Debugging: Check if data is loaded
            displayBooks(data);
            addSearchFunctionality(); 
            addCategoryFilterFunctionality(data);
        },
        function (xhr) { console.error(xhr); }
    );
});

function getJsonObject(path, success, error) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                if (success) success(JSON.parse(xhr.responseText));
            } else {
                if (error) error(xhr);
            }
        }
    };
    xhr.open("GET", path, true);
    xhr.send();
}

function displayBooks(books) {
    const tableBody = document.querySelector("#book-table tbody"); // ✅ Ensure tbody exists
    if (!tableBody) {
        console.error("Error: Table body not found!");
        return;
    }

    books.forEach(book => {
        const row = document.createElement("tr");

        row.insertAdjacentHTML("beforeend", `
            <td><img src="${book.img}" alt="${book.title}" width="50"></td>
            <td>${book.title}</td>
            <td>${book.authors}</td>
            <td>${book.year}</td>
            <td>$${book.price}</td>
            <td>⭐${book.rating}</td>
            <td>${book.publisher}</td>
            <td>${book.category}</td>
        `);

        tableBody.appendChild(row);
    });
}

document.addEventListener("DOMContentLoaded", function () {
    getJsonObject('data.json',
        function (data) {
            console.log("Data Loaded:", data); // Debugging: Ensure data is fetched
            displayBooks(data);
        },
        function (xhr) { console.error("Error loading data:", xhr); }
    );
});

function getJsonObject(path, success, error) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                try {
                    let jsonData = JSON.parse(xhr.responseText);
                    success && success(jsonData);
                } catch (e) {
                    console.error("JSON Parsing Error:", e);
                }
            } else {
                error && error(xhr);
            }
        }
    };
    xhr.open("GET", path, true);
    xhr.send();
}

function displayBooks(books) {
    const tableBody = document.querySelector("#book-table tbody");
    
    if (!tableBody) {
        console.error("Error: Table body not found!");
        return;
    }

    tableBody.innerHTML = ""; // Clear existing content to avoid duplication

    books.forEach(book => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td><img src="${book.img}" alt="${book.title}" width="50" class="book-image"></td>
            <td>${book.title} </td>
            <td>${book.authors}</td>
            <td>${book.year}</td>
            <td>$${parseFloat(book.price).toFixed(2)}</td>
                        <td class="book-rating">⭐${book.rating}</td>

            <td>${book.publisher}</td>
            <td>${book.category}</td>
        `;

        tableBody.appendChild(row);
    });
}


// Function to add search functionality
function addSearchFunctionality() {
    const searchButton = document.getElementById('searchButton');
    const searchBox = document.getElementById('searchBox');

    searchButton.addEventListener('click', function() {
        const searchTerm = searchBox.value.trim().toLowerCase(); // Normalize the search term (trim, lowercase)
        const rows = document.querySelectorAll("#book-table tbody tr");

        rows.forEach(row => {
            const titleCell = row.cells[1]; // Title is in the second column
            const title = titleCell.textContent.toLowerCase(); // Normalize title to lowercase

            // Check if the title contains the search term as a substring
            
            if (title.includes(searchTerm) && searchTerm !== "") {
                row.style.backgroundColor = "#a6ffe7"; // Highlight matching rows
                console.log(searchTerm, title)
            } else {
                row.style.backgroundColor = ""; // Remove highlight for non-matching rows
            }
        });
    });
}

// Function to add category filter functionality
function addCategoryFilterFunctionality(books) {
    const filterButton = document.querySelector('#filterButton');
    const resetFilterButton = document.querySelector('#resetFilterButton');
    const categorySelect = document.querySelector('#categorySelect');

    filterButton.addEventListener('click', function() {
        const selectedCategory = categorySelect.value;
        
        // Filter books based on selected category
        const filteredBooks = books.filter(book => {
            return selectedCategory === "" || book.category === selectedCategory;
        });

        // Display the filtered books
        displayBooks(filteredBooks);
    });

    // Reset filter button logic
    resetFilterButton.addEventListener('click', function() {
        categorySelect.value = ""; // Reset dropdown to default
        displayBooks(books); // Display all books
    });
}
