(function (home, $, undefined) {
    "use strict";
    $("#panelCaller").on("click", function() {
        var opened = $(this).hasClass("open");
        $(this).toggleClass("open");

        opened ? $("#panel").removeClass("open") : $("#panel").addClass("open");
    });
    $("#panel .nav li[role='presentation'] a").on("click", function () {
        $("#panel .nav li[role='presentation']").removeClass("active");
        $(this).closest("li[role='presentation']").addClass("active");

        $("#panel .tab-content").removeClass("open");
        $($(this).data("target")).addClass("open");
    });
    $(function () {
        $('.slider-arrow').click(function () {
            if ($(this).hasClass('show')) {
                $(".slider-arrow, .panel").animate({
                    left: "+=290"
                }, 700, function () {
                    // Animation complete.
                });
                $(this).html('&laquo;').removeClass('show').addClass('hide');
            }
            else {
                $(".slider-arrow, .panel").animate({
                    left: "-=290"
                }, 700, function () {
                    // Animation complete.
                });
                $(this).html('&raquo;').removeClass('hide').addClass('show');
            }
        });

    });
}(window.home = window.home || {}, jQuery));
