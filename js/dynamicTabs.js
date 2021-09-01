$(document).ready(function(){
    $('.tab-button:first-of-type').addClass("active");
    $('.tab-content:first-of-type').css("display", "block");
    $('.tab-button').click(function () {
        let i = $(this).index();
        $('.tab-button').removeClass("active");
        $('.tab-content').fadeOut();
        $(this).addClass("active");
        $('.tab-content').eq(i).fadeIn();
    });
});