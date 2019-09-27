$(document).ready(function () {
    $(window).scroll(function () {
        if ($(window).scrollTop() >= 100) {
            $(".header").addClass("scroll");
        }
        else {
            if ($(".header").hasClass("scroll")) {
                $(".header").removeClass("scroll");
            }
        }
        if ($(window).innerWidth() <= 991) {
            var footerOffset = $(".footer").offset().top - ($(window).innerHeight() - $(".footer").innerHeight());
            if ($(window).scrollTop() >= footerOffset) {
                $(".header-cta").addClass("hiden");
            }
            else {
                if ($(".header-cta").hasClass("hiden")) {
                    $(".header-cta").removeClass("hiden");
                }
            }
        }
    });
})