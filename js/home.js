



// list products at home page

let newProducts= data.filter((item) => {
	if(item.inHome === 'y' && item.new === 'y')
		return item
	
});
listProductUI(newProducts, 0)
let specialProducts= data.filter((item) => {
	if(item.inHome === 'y' && item.special === 'y')
	return item
	
});
listProductUI(specialProducts, 1)


// owl carousel banner

$('.banner .owl-carousel').owlCarousel({
	loop: true,
	nav: false,
	items: 1,
	margin: 0,
	stagePadding: 0,
	smartSpeed: 1200,
	autoplay: true,
	autoplayTimeout:8000,
	dots: false,
	autoHeight: false,
	animateOut: 'fadeOutUp',
});
// owl carousel products
$('.products .owl-carousel').owlCarousel({
	loop: true,
	nav: true,
	responsive:{
		0:{
			items:1
		},
		600:{
			items:2
		},
		700:{
			items:3
		},
		1000:{
			items:5
		}
	},
	margin: 20,
	stagePadding: 0,
	navText: ['<span><i class="fas fa-chevron-right"></i></span>', '<span><i class="fas fa-chevron-left"></i></span>'],
	smartSpeed: 500,
	dotsEach: 3,

	
});

