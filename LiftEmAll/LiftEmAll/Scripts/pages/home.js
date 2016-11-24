(function (home, $, undefined) {
    "use strict";

    home.showRightPanel = function(isShow) {
        isShow ? $("#panelCaller").addClass("open") : $("#panelCaller").removeClass("open");
        isShow ? $("#panel").addClass("open") : $("#panel").removeClass("open");
    };
    home.acceptRequest = function() {
        var getUrl = $(this).data("url");
        $.get(getUrl, {}, function() {
            location.reload(true);
        });
    };

    function getView(url, target) {
        $.get(url, {}, function(data) {
            $(target).html(data);
        });
    }

    $("#panelCaller").on("click", function() {
        var opened = $(this).hasClass("open");
        home.showRightPanel(!opened);
    });
    $("#panel .nav li[role='presentation'] a").on("click", function () {
        var requestUrl = $(this).data("url");
        var targetId = $(this).data("target");

        if (typeof requestUrl != "undefined" && requestUrl.length > 0) {
            getView(requestUrl, targetId);
        }

        $("#panel .nav li[role='presentation']").removeClass("active");
        $(this).closest("li[role='presentation']").addClass("active");

        $("#panel .tab-content").removeClass("open");
        $($(this).data("target")).addClass("open");
    });
    $("#allRequest").on("click", ".request-item button.accept-request", function () {
        var requestUrl = $(this).data("url");

        if (typeof requestUrl == "undefined" || requestUrl.length == 0) {
            return;
        }

        $.get(requestUrl, {}, function() {});
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