(function ($, Drupal) {
  Drupal.behaviors.myCustomMainBehavior = {
    attach: function (context, settings) {
      $(context)
        .find("body")
        .once("myCustomMainBehavior")
        .each(function () {
          const menuMobile = new MobileMenu(".main-menu");
          let imageWrapper = document.querySelectorAll(
            ".responsive-img-background"
          );
          if (
            typeof imageWrapper != "undefined" &&
            imageWrapper != null &&
            imageWrapper.length != 0
          ) {
            for (let i = 0; i < imageWrapper.length; i++) {
              new ResponsiveBackgroundImage(imageWrapper[i]);
            }
          }

          // initialize Masonry
          var masonryContainer = $(".grid-container");
          if (masonryContainer) {
            masonryContainer.multipleFilterMasonry({
              itemSelector: ".node--type-portfolio",
              filtersGroupSelector: ".filters",
            });
          }

          //smooth scroll
          document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
            anchor.addEventListener("click", function (e) {
              e.preventDefault();
              document.querySelector(this.getAttribute("href")).scrollIntoView({
                behavior: "smooth",
              });
            });
          });

          //close menu after click on link with #
          document
            .querySelectorAll('.main-menu a[href^="#"]')
            .forEach((anchor) => {
              anchor.addEventListener("click", function (e) {
                e.preventDefault();
                const menu = document.querySelector(".mobile-nav");
                document
                  .querySelector(this.getAttribute("href"))
                  .scrollIntoView({
                    behavior: "smooth",
                  });
                menu.classList.remove("active");
                menu.classList.remove("active-with-social");
              });
            });

          //listener to checboxes
          const checkboxes = document.querySelectorAll(
            ".button-filter > input"
          );
          if (checkboxes) {
            checkboxes.forEach((button) => {
              button.addEventListener("click", function () {
                if (this.parentElement.classList.contains("b-active")) {
                  this.parentElement.classList.remove("b-active");
                } else {
                  const activeElement = document.querySelector(".b-active");
                  const activeCheckbox = document.querySelector(
                    ".b-active > input"
                  );
                  if (activeElement) {
                    activeCheckbox.checked = false;
                    activeElement.classList.remove("b-active");
                  }
                  this.parentElement.classList.add("b-active");
                }
              });
            });
          }
        });
    },
  };
})(jQuery, Drupal);
