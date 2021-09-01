// Preloader when open the page 

$('.preloader').fadeIn();
setTimeout(() => {$('.preloader').fadeOut();}, 2000);

// back to top button

$(window).scroll(function(){
	let height = $(this).scrollTop();
	// to make back to top icon appear at 400px scroll
	if (height >= 400) {
		$(".backToTop").fadeIn();
	} else{
		$(".backToTop").fadeOut();
	}
	
});
$(".backToTop").on('click' , function (){
	$("html, body").animate({
		scrollTop:0
	}, 1000);
});

// side navbar open and close

$(function(){
    $('.side-nav-icon').click(function(){
        $('.overlay').toggleClass('open');
        $('.side-nav').toggleClass('open');
    });
    $('.overlay').click(function(){
        $('.overlay').toggleClass('open');
        $('.side-nav').toggleClass('open');
    });
});

// set product id in localstorage

let setProductIdDetails = function(id){
    localStorage.setItem("productDetails",id);
}

// ajax request to get the data
// let products =[];
// fetch('./js/data.json').then(response => products = response.json());
let products;
// Get The Data From The json file 
var getData;
(getData = function(){
	let xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function(){
		if (this.readyState == 4 && this.status == 200) {
			products = JSON.parse(this.responseText);
		} else if (this.readyState ==4 && this.status== 404) {
			console.log("Error");

		}
	};
	xhttp.open("GET", "/js/data.json", false);
	xhttp.send();
})();
let data = JSON.parse(localStorage.getItem('data')) ? JSON.parse(localStorage.getItem('data')) : products ;



// set up variables at the header cart

let productsInCart = JSON.parse(localStorage.getItem('productsInCart')) ? JSON.parse(localStorage.getItem('productsInCart')) : [];
let cartNum = JSON.parse(localStorage.getItem('cartNum')) ? JSON.parse(localStorage.getItem('cartNum')) : 0.0;
let cartNumDom = document.querySelector('#cartNum');
let cartMenu = document.querySelector('.control-list .dropdown .menu .cart-items');
cartNumDom.innerHTML = cartNum;


// Return Cart Total Price
let cartTotalDom = document.querySelectorAll('.cartTotal span');
let cartTotal = function cartTotal() {
	if (productsInCart.length) {
		let total = 0;
		productsInCart.forEach(element => {
			total = total+(element.qty*element.price);
		});
		cartTotalDom.forEach(e=> e.innerHTML=`$${total.toFixed(2)}`)
		document.querySelector('.control-list .dropdown .menu .cart-options').style.display='block';
	}else{
		document.querySelector('.control-list .dropdown .menu .cart-options').style.display='none';
	}
};
cartTotal();

// add products to the cart

let addToCart= (e , id) =>{
	if(e!=1){
		e.preventDefault();
	}
	let selectedPro = data.find( i => i.id === id);
	let inCart = productsInCart.some( i => i.id === id);
	if(inCart){
		productsInCart = productsInCart.map((i) => {
			if (i.id === selectedPro.id) {
				if(e===1){
					i.qty += 1;
					cartNum += 1;
					i.productTotalPriceCart = i.qty * i.price;
				} else{
					i.qty += parseInt(e.target.proQty.value);
					cartNum += parseInt(e.target.proQty.value);
					i.productTotalPriceCart = i.qty * i.price;
				}
			}
			return i;
		});
	} else{
		if(e===1){
			selectedPro.qty += 1;
			cartNum += 1;
			selectedPro.productTotalPriceCart = selectedPro.qty * selectedPro.price;
			productsInCart = [...productsInCart, selectedPro];
			selectedPro.productTotalPriceCart = selectedPro.price;
		} else{
			productsInCart = [...productsInCart, selectedPro];
			selectedPro.qty = parseInt(e.target.proQty.value);
			cartNum += parseInt(e.target.proQty.value);
			selectedPro.productTotalPriceCart = selectedPro.price;
		}
	}
	$('.warning').text('Product added');
		$('.warning').fadeIn();
		setTimeout(() => {
			$('.warning').fadeOut();
		}, 1000);
	localStorage.setItem('productsInCart', JSON.stringify(productsInCart));
	localStorage.setItem('cartNum', cartNum);
	cartNumDom.innerHTML = cartNum;
	drowCartMenuUi();
	cartTotal();
}


// list products in the header menu

let drowCartMenuUi = ()=>{
	let Products = JSON.parse(localStorage.getItem('productsInCart')) ? JSON.parse(localStorage.getItem('productsInCart')) : [];
	if(Products.length){
		let UI = Products.map((i) => {
			return `
			<li>
				<div class="cart-item">
					<a href="product.html" onclick="setProductIdDetails(${i.id})">
						<div class="itemImg"><img src="${i.image[0]}" alt=""></div>
						<div class="item-info">
							<p class="text-hover-black item-title">${i.title}</p>
							<p class="item-price"><span class="item-qty">${i.qty} x </span>$${i.price}</p>
						</div><!-- ./item-info -->
					</a>
					<span class="item-delbtn" title="Delete form cart" onclick="deleteFromCartMenu(${i.id}, ${i.qty})"><i class="fas fa-times"></i></span>
				</div><!-- ./cart-item -->
			</li>
			`;
		});
		cartMenu.innerHTML = UI.join('');
		document.querySelector('.control-list .dropdown .menu .cart-options').style.display='block';
	} else{
		cartMenu.innerHTML ='No products in the cart';
		document.querySelector('.control-list .dropdown .menu .cart-options').style.display='none';
	}
}
drowCartMenuUi();

// delete products form the header menu

let deleteFromCartMenu = (id, qty) =>{
	productsInCart = productsInCart.filter( p => p.id !=id);
	cartNum -= qty; 
	cartNumDom.innerHTML = cartNum;
	localStorage.setItem('cartNum', cartNum);
	localStorage.setItem('productsInCart', JSON.stringify(productsInCart));
	drowCartMenuUi(productsInCart);
	cartTotal();
}


// Add Products To Fav Function

function addToFav (id) {
	data = data.map((item) => {
		if (item.id === id) {
			item.liked = 'y';
		};
		return item;
	});
	$('.warning').text('Product added');
		$('.warning').fadeIn();
		setTimeout(() => {
			$('.warning').fadeOut();
		}, 1000);
	localStorage.setItem('data', JSON.stringify(data));
			
};

// Add Products To Compare Function

function addToCompare (id) {
	let compareList = JSON.parse(localStorage.getItem('compareList')) ? JSON.parse(localStorage.getItem('compareList')) : [];
	let inList = compareList.some( i => i.id === id);
	if (inList) {
		$('.warning').fadeIn();
		$('.warning').text('The product is already exist');
		setTimeout(() => {
			$('.warning').fadeOut();
		}, 1000);
	}else if(compareList.length >=2){
		$('.warning').text('You can\'t choose more than 2 Products');
		$('.warning').fadeIn();
		setTimeout(() => {
			$('.warning').fadeOut();
		}, 1000);
	}else{
		$('.warning').text('Product added');
		$('.warning').fadeIn();
		setTimeout(() => {
			$('.warning').fadeOut();
		}, 1000);
		let selected = data.find((item) => item.id === id);
		compareList = [...compareList, selected];
		localStorage.setItem('compareList', JSON.stringify(compareList));
	}	
};


// get the products's data type from any page to filter it

$('.datatypeFilter').click(function (){
	localStorage.setItem('dataTypeFilter', JSON.stringify($(this).attr('data-type-filter')));
})

// to store the search key in localstorage and send it to shop page

let setSearchValue = (e)=>{
	e.preventDefault();
	localStorage.setItem('dataSearchValue', JSON.stringify(e.target.searchInput.value));
	window.location.assign('shop.html')
}