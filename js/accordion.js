$(document).ready(function(){
    $('.accordion-content:first-of-type .accordion-content-desc').show();
    $('.accordion-content:first-of-type .accordion-content-title').addClass('active');
    $('.accordion-content-title').click(function () {
        if ($(this)[0].className =="accordion-content-title active") {
            return 0;
        }else{
            $('.accordion-content-title').removeClass('active');
            $(this).addClass('active');
            $('.accordion-content-desc').slideUp();
            $(this).next().slideDown();
        }
    });
});