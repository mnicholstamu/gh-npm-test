(function () {
  let toggleGlobalMobileNav;
  let toggleMobileMenu;

  const overlay = $(".nav-overlay");
  const menu = $("button.mobile-toggle__menu");
  const search = $("button.mobile-toggle__quicklinks-search");

  toggleGlobalMobileNav = function () {
    // CLOSE BUTTON INIT
    $("button.close").on("click", function () {
      menu.removeClass("active");
      overlay.slideUp();

      menu.attr({
        "aria-pressed": false,
        "aria-expanded": false,
      });
    });

    $(".mobile-toggle button").on("click", function () {
      $(this).toggleClass("active");
      $(this).siblings().removeClass("active");

      if (!$(this).hasClass("active")) {
        overlay.slideUp(500);
      } else {
        overlay.slideDown(500);
      }

      if (menu.hasClass("active")) {
        $(".mobile-nav").show();
        menu.attr({
          "aria-pressed": true,
          "aria-expanded": true,
        });

        $(".mobile-nav__panel").removeClass("active slide-in").hide();
      } else {
        $(".mobile-nav").hide();
        menu.attr({
          "aria-pressed": false,
          "aria-expanded": false,
        });
      }

      if (search.hasClass("active")) {
        $(".mobile-search").show();

        search.attr({
          "aria-pressed": true,
          "aria-expanded": true,
        });
        $(".mobile-nav__panel").removeClass("active slide-in").hide();
      } else {
        $(".mobile-search").hide();
        search.attr({
          "aria-pressed": false,
          "aria-expanded": false,
        });
      }
    });
  };

  toggleMobileMenu = function () {
    return $(".mobile-header").on(
      "click",
      "button[data-megamenu]",
      function () {
        const backButton = $("button.back");
        var $ctrl, $menuPane, $visiblePanes, targetMenu;
        $ctrl = $(this);
        targetMenu = $(this).data("megamenu");
        $menuPane = $("#" + targetMenu);
        $visiblePanes = $(".mobile-header .mobile-nav__panel");

        $("[aria-controls=" + $ctrl.attr("aria-controls") + "]").attr({
          "aria-pressed": true,
          "aria-expanded": true,
        });

        $menuPane.show().addClass("active slide-in");
        $(".mobile-nav").removeClass("active").hide();

        // CLOSE BUTTON
        $("button.close").on("click", function () {
          $("[aria-controls=" + $ctrl.attr("aria-controls") + "]").attr({
            "aria-pressed": false,
            "aria-expanded": false,
          });
          $menuPane.removeClass("active").hide();
          menu.removeClass("active");
          overlay.slideUp();

          menu.attr({
            "aria-pressed": false,
            "aria-expanded": false,
          });
        });

        // Back button
        backButton.on("click", function () {
          $("[aria-controls=" + $ctrl.attr("aria-controls") + "]").attr({
            "aria-pressed": false,
            "aria-expanded": false,
          });

          $(".mobile-nav").fadeIn(200);
          $(".mobile-nav__panel").removeClass("active slide-in").hide();
        });

        if ($visiblePanes.has(".active")) {
          $(".mobile-nav").removeClass("active").slideUp(500);

          menu
            .attr({
              "aria-pressed": false,
              "aria-expanded": false,
            })
            .removeClass("active");

          // clicking menu or search after a panel is open will close current pannel and close the menu/search.
          menu.on("click", function () {
            $("[aria-controls=" + $ctrl.attr("aria-controls") + "]").attr({
              "aria-pressed": false,
              "aria-expanded": false,
            });
            $menuPane.removeClass("active");
          });

          search.on("click", function () {
            $("[aria-controls=" + $ctrl.attr("aria-controls") + "]").attr({
              "aria-pressed": false,
              "aria-expanded": false,
            });
            $menuPane.removeClass("active");
          });
        }
      }
    );
  };

  $(document).ready(function () {
    toggleMobileMenu();
    toggleGlobalMobileNav();
  });
}).call(this);
