$(document).ready(function () {
    var oldPos = 0;
    $(window).scroll(function () {
        var pos = $(window).scrollTop();
        if (pos >= 100) {
            $(".header").addClass("scroll");
        }
        else {
            if ($(".header").hasClass("scroll")) {
                $(".header").removeClass("scroll");
            }
        }
        if ($(window).innerWidth() <= 991) {
            if (pos > oldPos) {
                oldPos = pos;
                if (!$(".header-cta").hasClass("hiden")) {
                    $(".header-cta").addClass("hiden");
                }
            }
            else {
                oldPos = pos-1;
                if ($(".header-cta").hasClass("hiden")) {
                    $(".header-cta").removeClass("hiden");
                }
            }
        }
    });
})