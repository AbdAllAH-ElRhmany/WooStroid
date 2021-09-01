// Drow Product UI At favouritePro Section At Favourite Page

// setUp Variables

let favouriteProDom = document.querySelector('.favourite .favourite-content .row');

// list products at favourite page

favProductUI = () => {
    let favouritePros = data.filter(i=> i.liked ==='y')
	if (favouritePros.length){
		let productUI = favouritePros.map((item) => {
			return `
            <div class="col-lg-3 col-md-4 col-12">
                <div class="favourite-item">
                <a href="product.html" onclick="setProductIdDetails(${item.id})"><img src="${item.image[0]}" alt="" class="item-img"></a>
                    <a href="product.html" class="item-title text-hover-black" onclick="setProductIdDetails(${item.id})">${item.title}</a>
                    <p class="item-price">$${item.price}</p>
                    <div class="product-rate">
                        <i class="fas ${item.rate > 0 ? 'active' : ''} fa-star"></i>
                        <i class="fas ${item.rate > 1 ? 'active' : ''}  fa-star"></i>
                        <i class="fas ${item.rate > 2 ? 'active' : ''}  fa-star"></i>
                        <i class="fas ${item.rate > 3 ? 'active' : ''} fa-star"></i>
                        <i class="fas ${item.rate > 4 ? 'active' : ''} fa-star"></i>
                    </div><!-- ./product-rate -->
                    <span class="item-del" title="Delete form wishlist" onclick="delFromFav(${item.id})"><i class="fas fa-times text-hover-black"></i></span>
                    <button class="addToCart bg-hover-blue" onclick="addToCart( 1 , ${item.id})">add to cart</button>
                </div><!-- ./favourite-item -->
            </div>`;
		});
		favouriteProDom.innerHTML = productUI.join('');
	} else {
		favouriteProDom.innerHTML = '<p class="mt-4" style="font-size: 30px">No Products At Favourites</p>';
	}
};
favProductUI();

// Delete Product From Favourite List

let delFromFav = (id) => {
	data = data.map((i) => {
		if (i.id === id) {
			i.liked = '';
		}
		return i;
	});
	localStorage.setItem('data', JSON.stringify(data));
	favProductUI(data);
};
