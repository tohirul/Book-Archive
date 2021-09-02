/* Toggle Display Options */
const toggleSpinner = (displayStyle) => {
  document.getElementById("spinner").style.display = displayStyle;
};
const toggleSearchResult = (searchResultDisplayStyle) => {
  document.getElementById("results").style.display = searchResultDisplayStyle;
};

const toggleTotalResult = (totalDisplayStyle) => {
  document.getElementById("total-books").style.display = totalDisplayStyle;
};

/* Retrieve Search Results from Database */
const getSearchText = () => {
  /* Receive Search Input */
  const searchInput = document.getElementById("searchText");
  const searchText = searchInput.value;
  searchInput.value = "";

  /* Display Options */
  toggleSpinner("block");
  toggleSearchResult("none");
  toggleTotalResult("none");

  /* Fetch Data from URL */
  const url = `https://openlibrary.org/search.json?q=${searchText}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => displayBooks(data.docs));
};

/* Display Search Results */
const displayBooks = (books) => {
  const searchResults = document.getElementById("search-results");
  const totalBooks = document.getElementById("total-books");

  /* Calculatin totalBooks found */
  totalBooks.innerHTML = `<p>Total Books found: ${books.length}</p>`;
  searchResults.textContent = "";

  /* Creating */
  books?.forEach((book) => {
    console.log(book);

    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
      <div class="card-item w-100 mx-auto my-auto">
          <img src="https://covers.openlibrary.org/b/id/${
            book.cover_i
          }-M.jpg" class="card-img" alt="" />

          <div class="card-img-overlay card-content">
            <h4 class="card-title">${book.title.slice(0, 30)}</h4>
            <p class="card-text">
             ${book.author_name}
            </p>
           
            <p class="card-text">First Published: ${
              book.publish_year
                ? Math.min(...book.publish_year)
                : "Not Mentioned"
            }
            </p>
            <p class="card-text">
            Publisher: ${book.publisher}</p>
          </div>
        </div>`;
    searchResults.appendChild(div);
  });
  toggleSpinner("none");
  toggleSearchResult("block");
  toggleTotalResult("block");
};
