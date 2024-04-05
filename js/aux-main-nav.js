// <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>

(function () {
  var lastSize,
    megamenuSearchFocus,
    prepNiceVideo,
    resizeHandler,
    thisSize,
    toggleGlobalMobileNav,
    toggleMediaContact,
    toggleMegamenu,
    infoState,
    deptState;
  toggleGlobalMobileNav = function () {
    return $(".main-nav__mobile-toggle button").on("click", function (e) {
      $(".megamenu-top-nav-univ").slideUp();
      $(this).toggleClass("active");
      return $(".mobile-nav").slideToggle();
    });
  };
  prepNiceVideo = function () {
    $(".nice-video button").on("click", function () {
      var $iframe, $wrapper, closure;
      $wrapper = $(this).parents(".nice-video");
      $wrapper.toggleClass("nice-video--playing");
      $iframe = $wrapper.find("iframe");
      closure = function () {
        return $iframe.attr({
          src: $iframe.attr("src").replace("autoplay=0", "autoplay=1"),
        });
      };
      setTimeout(closure, 300);
    });
    return $(".nice-video").addClass("nice-video--ready");
  };
  toggleMediaContact = function () {
    return $(".media-contact button").on("click", function (e) {
      var mediaContact;
      mediaContact = $(this).parents(".media-contact");
      mediaContact.toggleClass("active");
      return mediaContact.find(".media-contact__drawer").slideToggle();
    });
  };

  toggleMegamenu = function () {
    var $megamenu, $megamenuItems;
    infoState = false;
    deptState = false;
    $megamenu = $(".megamenu");
    $megamenuItems = $(".main-header button[data-megamenu]");
    if ($megamenuItems.length < 1) {
      return;
    }
    $megamenuItems.attr({
      "aria-pressed": false,
      "aria-expanded": false,
    });
    $megamenuItems.map(function (i, el) {
      var $el;
      $el = $(el);
      return $el.attr({
        "aria-controls": $el.data("megamenu"),
      });
    });
    return $(".main-header").on("click", "button[data-megamenu]", function (e) {
      var $ctrl, $menuPane, $visiblePanes, targetMenu;
      $ctrl = $(this);
      targetMenu = $(this).data("megamenu");
      $menuPane = $("#" + targetMenu);
      $visiblePanes = $(".main-header .megamenu:visible");
      if ($ctrl.attr("aria-expanded") === "false") {
        $("button[data-megamenu]")
          .not($ctrl)
          .attr({
            "aria-pressed": false,
            "aria-expanded": false,
          })
          .removeClass("active");
        $("[aria-controls=" + $ctrl.attr("aria-controls") + "]")
          .attr({
            "aria-pressed": true,
            "aria-expanded": true,
          })
          .addClass("active");
        if ($visiblePanes.length > 0) {
          $visiblePanes.slideUp(function () {
            if ($ctrl.parents(".mobile-nav").length > 0) {
              $(".main-header__megamenus").detach().insertAfter($ctrl);
            }
            return $menuPane.slideDown();
          });
        } else {
          if ($ctrl.parents(".mobile-nav").length > 0) {
            $(".main-header__megamenus").detach().insertAfter($ctrl);
          }
          $menuPane.slideDown();
        }

        $("button.toggleSearch").blur(function (e) {
          e.stopImmediatePropagation();
          e.preventDefault();
          if (e.currentTarget.getAttribute("aria-controls") === true) {
            deptState = false;
            infoState = false;
            return $("input").find("#searchField").focus();
          }
        });
        $ctrl.blur(function (e) {
          var nextmega;
          var nextmegasd;
          const elem = document.querySelector(".toggleSearch");
          e.stopImmediatePropagation();
          e.preventDefault();
          $("#" + targetMenu)
            .find("input[type='search'], a")
            .first()
            .focus();
          nextmega = $("#" + targetMenu)
            .next(".megamenu")
            .attr("id");

          if (nextmega) {
            nextmegasd = $("#" + nextmega)
              .prev(".megamenu")
              .attr("id");

            return $("#" + targetMenu)
              .find("a")
              .last()
              .blur(function (f) {
                if (nextmega === "search") {
                  if (targetMenu === "info-for") {
                    deptState = false;
                    infoState = true;
                  }
                  return $("nav.global-utility-nav a").first().focus();
                } else {
                  f.stopImmediatePropagation();
                  f.preventDefault();
                  if (targetMenu === "departments") {
                    infoState = false;
                    deptState = true;
                  }
                  return $("button[data-megamenu='" + nextmega + "']").focus();
                }
              });
          }
        });
        return megamenuSearchFocus(targetMenu, e);
      } else {
        $megamenuItems
          .attr({
            "aria-pressed": false,
            "aria-expanded": false,
          })
          .removeClass("active");
        return $menuPane.slideUp();
      }
    });
  };

  megamenuSearchFocus = function (megamenu, h) {
    if (megamenu.indexOf("search") > -1) {
      $('button[data-megamenu="search"]').on("keydown", function (j) {
        $("input").find("#searchField").focus();
      });
      deptState = false;
      infoState = false;
      return false;
    }

    $(".megamenu#search").find(".search-bar__form input").focus();
    return true;
  };

  lastSize = 0;
  thisSize = 0;
  resizeHandler = function () {
    var $selectedMenus;
    lastSize = thisSize;
    thisSize = $(window).width();
    if (thisSize > 1024 && lastSize < 1024) {
      $(".mobile-nav").hide();
      $(".main-nav__mobile-toggle button").removeClass("active");
      return $(".main-header__megamenus").detach().insertAfter(".mobile-nav");
    } else if (thisSize < 1024 && lastSize > 1024) {
      $selectedMenus = $(".mobile-nav [aria-pressed=true]");
      if ($selectedMenus.length > 0) {
        $(".mobile-nav").show();
        return $(".main-header__megamenus")
          .detach()
          .insertAfter($selectedMenus);
      }
    }
  };
  $(document).ready(function () {
    var resizeDebounce;
    prepNiceVideo();
    toggleMegamenu();
    toggleMediaContact();
    toggleGlobalMobileNav();
    resizeDebounce = 0;
    lastSize = thisSize = $(window).width();
    return $(window).on("resize", function (e) {
      clearTimeout(resizeDebounce);
      return (resizeDebounce = setTimeout(resizeHandler, 300));
    });
  });
}).call(this);

$(".dropdown-toggle").on("click", function (e) {
  let menuParent = $(this).parent();
  let menuParentSibling = $(this).parent().siblings();

  $(this).parent().toggleClass("active");
  if (menuParent.hasClass("active")) {
    $(this).attr({
      "aria-pressed": true,
      "aria-expanded": true,
    });
    $(this).siblings().toggle();

    if (menuParentSibling.hasClass("active")) {
      menuParentSibling.removeClass("active");
      menuParentSibling.children().attr({
        "aria-pressed": false,
        "aria-expanded": false,
      });
      menuParentSibling.children().siblings(".dropdown").toggle();
    }
  } else {
    $(this).attr({
      "aria-pressed": false,
      "aria-expanded": false,
    });
    $(this).siblings().toggle();
  }
});

$("html").on("click", function (event) {
  if (!$(event.target).is(".dropdown-toggle")) {
    $(".menu-item--dropdown").removeClass("active");
    $(".dropdown-toggle").attr({
      "aria-pressed": false,
      "aria-expanded": false,
    });
    $(".dropdown").hide();
  }
});
