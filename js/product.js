// nice select function at choose product rate
$('select').niceSelect();


// get the product's id form localstorage to list its data

let selectedPro = data.find( i =>{
    return i.id === JSON.parse(localStorage.getItem("productDetails"));
});


// to show the product type at the director

let directorItems = document.querySelector('.directorItems');
directorItems.innerHTML = `
    <li><a href="index.html" class="text-hover-black">Home</a></li>
    <li><a href="shop.html" class="text-hover-black datatypeFilter text-capitalize" data-type-filter="${selectedPro.type[1]}" >${selectedPro.type[1]}</a></li>
    <li>${selectedPro.title}</li>
`;

// set the title of the page with product's title
document.querySelector('head title').innerHTML = `${selectedPro.title}`;


// list the product data at the page

let productDom = document.querySelector('.product-content .product-info .product-item');
let productUI = () => {
	productDom.innerHTML = `
    <div class="row">
        <div class="col-md-5 col-12">
        <div class="product-imgs">
            <div class="img-viewer">
                <img src="${selectedPro.image[0]}" onmouseover  alt="">
            </div><!-- ./img-viewer -->
            <div class="imgs-container">
            ${selectedPro.image.map(element => {
                return `<img src="${element}" alt=""onclick="change(event)">`
            }).join('')}
            </div><!-- ./imgs-container -->
        </div><!-- ./product-imgs -->
        <div class="product-video"><i class="fas fa-video"></i></div>
    </div>
    <div class="col-md-7 col-12">
        <div class="product-details">
            <h3 class="product-title">${selectedPro.title}</h3>
            <h3 class="product-price">$${selectedPro.price}</h3>
            <div class="product-rate">
                <i class="fas ${selectedPro.rate > 0 ? 'active' : ''} fa-star"></i>
                <i class="fas ${selectedPro.rate > 1 ? 'active' : ''}  fa-star"></i>
                <i class="fas ${selectedPro.rate > 2 ? 'active' : ''}  fa-star"></i>
                <i class="fas ${selectedPro.rate > 3 ? 'active' : ''} fa-star"></i>
                <i class="fas ${selectedPro.rate > 4 ? 'active' : ''} fa-star"></i>
                <span class="review"> <i class="reviewNum">${selectedPro.comments.length}</i> Review</span>
            </div><!-- ./product-rate -->
            <p class="product-about">${selectedPro.desc}</p>
            <form class="order" onsubmit="addToCart( event , ${selectedPro.id})">
                <input type="number" name="proQty" placeholder="1" min="1"  value=1  id="">
                <button class="addToCart bg-hover-blue" type="submit"><i class="fas fa-shopping-cart"></i> add to cart</button>
            </form><!-- ./order -->
            <div class="addToPages">
                <div class="addToWish text-hover-black" onclick="addToFav(${selectedPro.id})"><i class="far fa-heart"></i> add to wishlist</div>
                <div class="addToWish text-hover-black" onclick="addToCompare(${selectedPro.id})"><i class="fas fa-balance-scale"></i> add to compare</div>
            </div><!-- ./addToPages --> 
            <div class="product-cate">
                <p class="product-category">Categories: 
                ${selectedPro.type.map(element => {
                    return `<a href="shop.html"><span class="datatypeFilter" data-type-filter="${element}"> ${element}</span></a>`
                })}</p>
                <p class="product-tags">Tags: ${selectedPro.tag.map(element => {
                    return `<a href="shop.html"><span class="datatagFilter" data-tag-filter="${element}"> ${element}</span></a>`
                })}</p>
            </div><!-- ./product-cate -->
        </div><!-- ./product-details -->
    </div>
    </div>
`;
};
productUI();




// get the products's data type from any page to filter it

$('.datatypeFilter').click(function (){
	localStorage.setItem('dataTypeFilter', JSON.stringify($(this).attr('data-type-filter')));
});



// get the products's data tage from any page to filter it
$('.datatagFilter').click(function (){
	localStorage.setItem('datatagFilter', JSON.stringify($(this).attr('data-tag-filter')));
});



// list comments in the page

let commentstDom = document.querySelector('.product-information-content .product-comments');
let listCommentsUI = ()=>{
    let commentUI = selectedPro.comments.map(c =>{
        return `
        <div class="comment">
            <div class="comment-img"><img src="images/02da37bdaf521b2a55a935a68fee2719.png" alt=""></div>
            <div class="comment-details">
                <div class="product-rate">
                    <i class="fas ${c.userRate > 0 ? 'active' : ''} fa-star"></i>
                    <i class="fas ${c.userRate > 1 ? 'active' : ''}  fa-star"></i>
                    <i class="fas ${c.userRate > 2 ? 'active' : ''}  fa-star"></i>
                    <i class="fas ${c.userRate > 3 ? 'active' : ''} fa-star"></i>
                    <i class="fas ${c.userRate > 4 ? 'active' : ''} fa-star"></i>
                </div><!-- ./product-rate -->
                <h4 class="comment-name">${c.userName}</h4>
                <p class="comment-content">${c.userMassage}</p>
            </div><!-- ./comment-details -->
        </div><!-- ./comment -->
        `;
    });
    commentstDom.innerHTML = commentUI.join('');
}


// set the review number at the page

let reviewNum =  document.querySelectorAll('.reviewNum');
reviewNum.forEach(element => {
    element.innerHTML =  selectedPro.comments.length;
});


listCommentsUI();   
    
  

// add comment function

let addComment = document.querySelector('.addComment');
addComment.addEventListener('submit', addCommentFunc);
function addCommentFunc(e){
    e.preventDefault();
    let commentMass = e.target.commentMassage.value; 
    let commentName = e.target.commentName.value; 
    let commentEmail = e.target.commentEmail.value; 
    let commentRate = e.target.commentRate.value; 
    if(commentMass == '' || commentName == '' || commentEmail == '' || commentRate == '0'){
        $('.alert:first').fadeIn();
        setTimeout(() => {
            $('.alert:first').fadeOut();
        }, 3000);
    } else{
        let newComment = {
            "userName":commentName,
            "userEmail":commentEmail,
            "userRate":commentRate,
            "userMassage":commentMass
        };
        selectedPro.comments = [...selectedPro.comments,newComment];
        reviewNum.forEach(element => {
            element.innerHTML =  selectedPro.comments.length;
        });
        listCommentsUI(); 
        data = data.filter( i =>{
            if(i.id === selectedPro.id){
                i = selectedPro;
            }
            return i;
        });
        localStorage.setItem('data', JSON.stringify(data));
        $('.loading-overlay').fadeIn();
        setTimeout(() => {
            $('.loading-overlay').fadeOut();
            $('.alert:last').fadeIn();
            e.target.commentMassage.value='';
            e.target.commentName.value='';
            e.target.commentEmail.value='';
            e.target.commentRate.value='0';
            setTimeout(() => {
                $('.alert:last').fadeOut();
            }, 3000);
        }, 2000);
    }
}


// list the related products
let relatedProducts= data.filter((item) => {
	return (item.type.find(i => i ==selectedPro.type[1]) && item.id != selectedPro.id)
	
});
listProductUI(relatedProducts, 0)





  
  
  
  
  
  
let imgViewer = document.querySelector('.img-viewer');
let imgZoomed = document.querySelector('.img-viewer img');

imgViewer.addEventListener('mousemove', function(e){
    clientX = e.clientX - imgViewer.offsetLeft;
    clientY = e.clientY - imgViewer.offsetTop;
    ViewerW = imgViewer.offsetWidth;
    ViewerH = imgViewer.offsetHeight;
    
    clientX = clientX / ViewerW * 100;
    clientY = clientY / ViewerH * 100;
    imgZoomed.style.transform = `translate(-${clientX - 20}%, -${clientY - 40}%) scale(1.6)`;
});


imgViewer.addEventListener('mouseleave', function(e){
    imgZoomed.style.transform = `translate(-50%, -50%) scale(1)`;
});
function change(event){
    imgZoomed.src = event.target.src;
}

$('.products .owl-carousel').owlCarousel({
    loop: true,
    nav: false,
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