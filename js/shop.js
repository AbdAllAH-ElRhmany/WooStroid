
// set up data and varibles 

data = JSON.parse(localStorage.getItem('data')) ? JSON.parse(localStorage.getItem('data')) : data;
let dataTypeFilter = JSON.parse(localStorage.getItem('dataTypeFilter')) ? JSON.parse(localStorage.getItem('dataTypeFilter')) : '';
let datatagFilter = JSON.parse(localStorage.getItem('datatagFilter')) ? JSON.parse(localStorage.getItem('datatagFilter')) : '';
let dataSearchValue = JSON.parse(localStorage.getItem('dataSearchValue')) ? JSON.parse(localStorage.getItem('dataSearchValue')) : '';
let ShopDom = document.querySelector('.shop .products-container');

// list products at shop page

let drowShopUi;
drowShopUi = (data)=>{
    if(data.length){

        let productUi = data.map(item =>{
            return `
            <div class="product-item">
                <div class="row">
                    <div class="col-md-3 col-12">
                        <div class="product-img"><a href="product.html"><img src="${item.image[0]}" onclick="setProductIdDetails(${item.id})" alt=""></a></div>
                    </div>
                    <div class="col-lg-6 col-md-9 col-12">
                        <div class="product-info">
                            <a href="product.html" onclick="setProductIdDetails(${item.id})"><h4 class="text-hover-black product-info-title">${item.title}</h4></a>
                            <p class="product-info-desc">${item.desc}</p>
                            <div class="product-rate">
                                <i class="fas fa-star ${item.rate > 0 ? "active" :""}"></i>
                                <i class="fas fa-star ${item.rate > 1 ? "active" :""}"></i>
                                <i class="fas fa-star ${item.rate > 2 ? "active" :""}"></i>
                                <i class="fas fa-star ${item.rate > 3 ? "active" :""}"></i>
                                <i class="fas fa-star ${item.rate > 4 ? "active" :""}"></i>
                            </div><!-- ./product-rate -->
                        </div><!-- ./product-info -->
                    </div>
                    <div class="col-lg-3 col-12">
                        <div class="product-options">
                            <h3 class="product-info-price">$${item.price.toFixed(2)}</h3>
                            <button class="addToCart bg-hover-blue" onclick="addToCart( 1, ${item.id})"><i class="fas fa-shopping-cart"></i> add to cart</button>
                            <button class="addToWish" onclick="addToFav(${item.id})"><i class="far fa-heart"></i> add to wishlist</button>
                        </div><!-- ./product-options -->
                    </div>
                </div><!-- ./row -->
                <div class="addToCompare" onclick="addToCompare(${item.id})"><i class="fas fa-balance-scale"></i></div>
            </div><!-- ./product-item -->
            `
        });
        localStorage.setItem('dataSearchValue', JSON.stringify(''));
        ShopDom.innerHTML = productUi.join('');
    } else {
        ShopDom.innerHTML = "There is no product with this name";
    }
};


let directorItems = document.querySelector('.directorItems');

//  check if the user search or filter the products by tag or type
if(dataSearchValue != ""){
    let searchProducts = data.filter((item) => {
        return item.title.toLowerCase().indexOf(dataSearchValue.toLowerCase()) !== -1;
    });
    drowShopUi(searchProducts);
} else if(dataTypeFilter) {
    let filteredPro = products.filter((item) => {
        return (
            item.type.find((e) => e == dataTypeFilter) 
            );
        });
        localStorage.setItem('dataTypeFilter', JSON.stringify(''));
        document.querySelector('head title').innerHTML = `WooStroid | ${dataTypeFilter}`;
        drowShopUi(filteredPro);
        directorItems.innerHTML = `
        <li><a href="index.html" class="text-hover-black">Home</a></li>
        <li><a href="shop.html" class="text-hover-black datatypeFilter text-capitalize" data-type-filter="">Shop</a></li>
        <li class="text-capitalize">${dataTypeFilter}</li>
        `;
        $('.datatypeFilter').click(function (){
            localStorage.setItem('dataTypeFilter', JSON.stringify($(this).attr('data-type-filter')));
        });
    } else if(datatagFilter) {
        let filteredPro = products.filter((item) => {
            return (
                item.tag.find((e) => e == datatagFilter) 
                );
            });
            localStorage.setItem('datatagFilter', JSON.stringify(''));
            document.querySelector('head title').innerHTML = `WooStroid | ${datatagFilter}`;
        drowShopUi(filteredPro);
        directorItems.innerHTML = `
        <li><a href="index.html" class="text-hover-black">Home</a></li>
        <li><a href="shop.html" class="text-hover-black datatypeFilter text-capitalize" data-tag-filter="">Shop</a></li>
        <li class="text-capitalize">${datatagFilter}</li>
        `;
}else{
    drowShopUi(data);
}


// quick search function 

let searchInp = document.querySelector('#searchInput');
searchInp.addEventListener("keyup", quickSearch);
function quickSearch(){
    let searchProducts = data.filter((item) => {
        return item.title.toLowerCase().indexOf(searchInp.value.toLowerCase()) !== -1;
    });
    drowShopUi(searchProducts);
};

// add and remove class active to filters

$('.filter-item .product-filter-text').on('click', function () {
    $(this).toggleClass('active').parent().siblings().find('.product-filter-text').removeClass('active');
});


// filter products function

let colorFilter = 'all';
let sizeFilter = 'all';
let waterFilter = 'all';
let priceStart =255;
let priceEnd = 1200;


productsFilter = () => {
    $('.loading-overlay').fadeIn();
    setTimeout(() => {
        $('.loading-overlay').fadeOut();
        let filteredPro = data.filter((item) => {
            return (
                item.color.find((e) => e === colorFilter) &&
                item.waterproof.find((e) => e === waterFilter) &&
                item.size.find((e) => e === sizeFilter) &&
                item.price >= priceStart &&
                item.price <= priceEnd
            );
        });
        drowShopUi(filteredPro);
    }, 2000);
};

// get the user's filters

$('.filter-item .dataColorFilter').click(function () {
	colorFilter = $(this).attr('data-color-filter');
	productsFilter();
});
$('.filter-item .dataSizeFilter').click(function () {
    sizeFilter = $(this).attr('data-size-filter');
	productsFilter();
});
$('.filter-item .dataWaterFilter').click(function () {
    waterFilter = $(this).attr('data-water-filter');
	productsFilter();
});

// range filter

$( function() {
    $( "#slider-range" ).slider({
      range: true,
      min: 255,
      max: 1200,
      values: [ 255, 1200 ],
      slide: function( event, ui ) {
        $( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
    },
    });
    $( "#amount" ).val( "$" + $( "#slider-range" ).slider( "values", 0 ) +
      " - $" + $( "#slider-range" ).slider( "values", 1 ) );
  });

// get the range filters

$('#slider-range').on( "mouseup",function (e) { 
    let val =($('#amount').val());
    priceStart =  val.slice(1, 5);
    priceEnd =  val.slice(8, 12);
    productsFilter();
});
