
let productsDom = document.querySelectorAll('.products .owl-carousel');
// Drow Product UI At Products Sections Function

let listProductUI = function (data = [], i) {
	let productUI = data.map((item) => {
		return `
		<div class="item">
			<a href="product.html" onclick="setProductIdDetails(${item.id})"><img src="${item.image[0]}" alt="" class="product-img"></a>
			<h5><a href="product.html" class="product-name text-hover-black" onclick="setProductIdDetails(${item.id})">${item.title}</a></h5>
			<span class="product-price">$${item.price}</span>
			<button class="addToCart bg-hover-blue" onclick="addToCart( 1 , ${item.id})"><i class="fas fa-shopping-cart"></i> add to cart</button>
			<div class="product-rate">
				<i class="fas ${item.rate > 0 ? 'active' : ''} fa-star"></i>
				<i class="fas ${item.rate > 1 ? 'active' : ''}  fa-star"></i>
				<i class="fas ${item.rate > 2 ? 'active' : ''}  fa-star"></i>
				<i class="fas ${item.rate > 3 ? 'active' : ''} fa-star"></i>
				<i class="fas ${item.rate > 4 ? 'active' : ''} fa-star"></i>
			</div><!-- ./product-rate -->
		</div><!-- ./item -->`;
	});
	productsDom[i].innerHTML = productUI.join('');
};