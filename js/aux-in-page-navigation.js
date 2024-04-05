/**
 * Dynamically builds in-page navigation based on H2 headings in the main content area.
 * Adds an <aside> with the navigation before <main>
 */
const headingTwos = document.querySelectorAll("main#main-content h2");
const inPageNavContainer = document.querySelector("aside#in-page-nav");
let inPageLinks = "", // Store <li> with links to each heading
  headingSlug = "", // Url slug version of the H2 text
  currentHeadingText = "", // Store the text content with each H2
  allHeadingSlugs = [], // Array of all the slugs created for H2s on the page
  duplicateHeadingIndex = 1; // Number to append at the end of duplicate slugs

/**
 * Add a nav tag with the links to each section containing an H2 heading
 *
 * @param string inPageLinks - contains list items with links
 */
function addInPageNav(inPageLinks) {
  inPageNavContainer.insertAdjacentHTML(
    "afterbegin",
    `
      <nav class="sidebar sidebar--internal show-for-medium aux-sticky d-flex-align-self-start" aria-label="In-Page navigation">
      <span class="nav-heading">On This Page</span>
      <ul class="internal-nav">
                 ${inPageLinks}

      </ul>
</nav>

<nav class="sidebar sidebar--internal hide-for-medium" aria-label="Navigate to each section">
  <div class="aux-accordion" id="accordionItem-side">
    <span id="accordionID-side">
      <button aria-controls="aside" aria-expanded="false" aria-label="On This Page navigation" class="aux-accordion-trigger">
        <span class="aux-accordion__title">
          <span>On This Page</span>
        </span>
      </button>
    </span>
    <div aria-labelledby="accordionID-side aside" class="aux-accordion-panel" hidden="" id="aside" role="region">
      <ul class="internal-nav">
                  ${inPageLinks}

      </ul>
    </div>
  </div>
</nav>
  `
  );
}

/**
 * Change in-page navigation links to mark the current section while scrolling.
 * Dynamically adds and removes a css class as the user scrolls.
 */
function changeLinkState() {
  const links = document.querySelectorAll(".internal-nav__item");
  let index = headingTwos.length;

  while (--index && window.scrollY + 250 < headingTwos[index].offsetTop) {}

  links.forEach((link) => link.classList.remove("internal-nav__item--current"));
  links[index].classList.add("internal-nav__item--current");
}

/**
 * Make a url friendly slug from heading text
 *
 * @param string headingText - Text from with each H2 in main
 * @return string headingSlug - first three words from the heading separated with a dash, no special characters, lowercase
 */
function makeSlug(headingText) {
  let headingSlug = "";

  headingSlug = headingText
    .toLowerCase() // Convert to lower case
    // Replace 'A&M', articles (a, an, the), conjunctions and other words we don't want in the slug
    .replace(/\b(a&m)\b|\b(a&amp;m)\b/g, "am ")
    .replace(/\b(a)\b/g, " ")
    .replace(/\b(an)\b/g, " ")
    .replace(/\b(the)\b/g, " ")
    .replace(/\b(and)\b/g, " ")
    .replace(/\b(but)\b/g, " ")
    .replace(/\b(or)\b/g, " ")
    .replace(/(\s{2,})/g, " ") // Replace two or more spaces with a single one
    .trim() // Remove white space before and after
    .split(" ") // Split into an array of separate words
    .slice(0, 3) // Get only the first three words
    .join("-") // Join them with a hyphen
    .replace(/[^\w\-]+/g, ""); // Remove any non-word characters
  return headingSlug;
}

/**
 * Get all h2 headings in the <main> region
 *  - build links for each of one
 *
 * @param string headingTwo - Each H2 in main
 * @param int index - counter for the forEach
 */
headingTwos.forEach((headingTwo, index) => {
  let indexOutput = index + 1;
  let currentHeadingText = headingTwo.textContent.trim();
  let headingSlug = makeSlug(currentHeadingText);

  // Prevent duplicate IDs if two headings have the same text
  if (allHeadingSlugs.includes(headingSlug)) {
    duplicateHeadingIndex++;
    headingSlug = `${headingSlug}-${duplicateHeadingIndex}`;
  }

  // Set the id attribute on the H2
  headingTwo.setAttribute("id", headingSlug);

  // If there are headings and they have text:
  //  - build the navigation
  //  - add attributes to parent spans
  if (index >= 0 && currentHeadingText !== null && currentHeadingText !== "") {
    inPageLinks += `<li class="internal-nav__item">
        <a href="#${headingSlug}">${currentHeadingText}</a>
      </li>\n`;
  }

  // add headingSlug to the array of all heading slugs
  allHeadingSlugs.push(headingSlug);
});

// If there are headings and links have been created:
//  - Add the in page navigation
//  - Change the link state as the user scrolls to highlight the current section
if (inPageLinks !== "") {
  // Add the in page navigation
  addInPageNav(inPageLinks);

  // Change the link state as the user scrolls
  changeLinkState();
  window.addEventListener("scroll", changeLinkState);
}
