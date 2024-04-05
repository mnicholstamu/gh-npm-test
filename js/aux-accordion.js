/**
 * Opens all panels IF the browser is IE11
 */

let isIE11 = !!window.MSInputMethodContext && !!document.documentMode;
if (isIE11 == true) {
  let allPanels = document.querySelectorAll(".aux-accordion-panel");
  for (let ie = 0; ie < allPanels.length; ie++) {
    allPanels[ie].style.display = "block";
  }
}

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

let auxAccordions = document.querySelectorAll(".aux-accordion");
let i = 0;
auxAccordions.forEach((auxAccordion) => {
  let getAUXH3Title = auxAccordion.querySelector("h3");
  let getAUXSuperTitle = auxAccordion.querySelector(
    ".aux-accordion__title .superhead"
  );
  let getAUXSubTitle = auxAccordion.querySelector(
    ".aux-accordion__title .subhead"
  );

  // h3, super, and sub are all visible
  if (
    getAUXH3Title != null &&
    getAUXSuperTitle != null &&
    getAUXSubTitle != null
  ) {
    let newID =
      getAUXSuperTitle.innerText +
      "-" +
      getAUXH3Title.innerText +
      "-" +
      getAUXSubTitle.innerText;
    auxAccordion.id = makeSlug(newID);
    auxAccordion.id += "-" + i++;

    // h3 and subtitle are not null
  } else if (
    getAUXH3Title != null &&
    getAUXSuperTitle == null &&
    getAUXSubTitle != null
  ) {
    let newID = getAUXH3Title.innerText + "-" + getAUXSubTitle.innerText;
    auxAccordion.id = makeSlug(newID);
    auxAccordion.id += "-" + i++;

    // all are null but title
  } else if (
    getAUXH3Title != null &&
    getAUXSuperTitle == null &&
    getAUXSubTitle == null
  ) {
    let newID = getAUXH3Title.innerText;
    auxAccordion.id = makeSlug(newID);
    auxAccordion.id += "-" + i++;

    // h3 and super are not null
  } else if (
    getAUXH3Title != null &&
    getAUXSuperTitle != null &&
    getAUXSubTitle == null
  ) {
    let newID = getAUXSuperTitle.innerText + "-" + getAUXH3Title.innerText;
    auxAccordion.id = makeSlug(newID);
    auxAccordion.id += "-" + i++;
  } else {
  }
});

Array.prototype.slice
  .call(document.querySelectorAll(".aux-accordion"))
  .forEach(function (accordionBody) {
    var triggersBody = Array.prototype.slice.call(
      accordionBody.querySelectorAll(".aux-accordion-trigger")
    );
    var panelBody = Array.prototype.slice.call(
      accordionBody.querySelectorAll(".aux-accordion-panel")
    );
    accordionBody.addEventListener("click", function (event) {
      var targetBody = event.target;
      if (targetBody.classList.contains("aux-accordion-trigger")) {
        // Check if the current toggle is expanded.
        var isExpandedBody = targetBody.getAttribute("aria-expanded") == "true";
        var activeBody = accordionBody.querySelector('[aria-expanded="true"]');
        if (!isExpandedBody) {
          var accordButtons = document.querySelectorAll(
            '[class="aux-accordion-trigger"]'
          );
          accordButtons.forEach(function (button) {
            if (
              button.getAttribute("aria-controls") !=
              targetBody.getAttribute("aria-controls")
            ) {
              if (button.getAttribute("aria-expanded") == "true") {
                button.setAttribute("aria-expanded", "false");
                document
                  .getElementById(button.getAttribute("aria-controls"))
                  .setAttribute("hidden", "");
              }
            }
          });
          // Set the expanded state on the triggering element
          targetBody.setAttribute("aria-expanded", "true");

          // Hide the accordion sections, using aria-controls to specify the desired section
          document
            .getElementById(targetBody.getAttribute("aria-controls"))
            .removeAttribute("hidden");
        } else if (isExpandedBody) {
          // Set the expanded state on the triggering element
          targetBody.setAttribute("aria-expanded", "false");

          // Hide the accordion sections, using aria-controls to specify the desired section
          document
            .getElementById(targetBody.getAttribute("aria-controls"))
            .setAttribute("hidden", "");
        }
        event.preventDefault();
      }
    });
    // These are used to style the accordion when one of the buttons has focus
    accordionBody
      .querySelectorAll(".aux-accordion-trigger")
      .forEach(function (triggersBody) {
        triggersBody.addEventListener("focus", function (event) {
          accordionBody.classList.add("focus");
        });

        triggersBody.addEventListener("blur", function (event) {
          accordionBody.classList.remove("focus");
        });
      });
  });

window.addEventListener("load", onDocLoaded, false);
function onDocLoaded() {
  if (window.location.hash) {
    const urlHash = window.location.hash;
    let accordionParent = document.querySelector(urlHash);
    let accordionButton = accordionParent.querySelector("button");

    if (!accordionButton) {
      let contentID = accordionParent;
      let contentParent = contentID.closest(".aux-accordion-panel");
      let contentAccordionParent = contentParent.closest(".aux-accordion");
      let parentAccordionButton =
        contentAccordionParent.querySelector("button");

      parentAccordionButton.click();
      contentParent.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "start",
      });
    }

    accordionButton.click();
  }
}
