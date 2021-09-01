// set up data and varibles 

productsInCart = JSON.parse(localStorage.getItem('productsInCart')) ? JSON.parse(localStorage.getItem('productsInCart')) : [];
let cartDom = document.querySelector('.cart .cart-content .cart-content-body');
let contentDom = document.querySelector('.cart .container');


// list products at cart page
let drowCartUi;

(drowCartUi= (data)=>{
    if(data.length){
        let productUi = data.map( item =>{
            return `
            <tr class="product-item">
                <td class="delIcon"><i class="fas fa-times text-hover-blue" onclick="deleteFromCartPage(${item.id}, ${item.qty})" title="Delete form cart"></i></td>
                <td class="productImg"><a href="product.html" onclick="setProductIdDetails(${item.id})"><img src="${item.image[0]}" alt=""></a></td>
                <td class="productName"><a href="product.html" class="text-hover-blue" onclick="setProductIdDetails(${item.id})">${item.title}</a></td>
                <td class="productPrice">$${item.price.toFixed(1)}</td>
                <td class="productQty"><input type="text" value="${item.qty}" disabled title="Qty"></td>
                <td class="productTotal">$${item.productTotalPriceCart.toFixed(1)}</td>
            </tr><!-- ./product-item -->
            `;
        });
        cartDom.innerHTML = productUi.join('');
    }else{
        contentDom.innerHTML = "No products in cart Shopping First";
    }
})(productsInCart);


// delete products form cart

let deleteFromCartPage = (id, qty)=>{
    deleteFromCartMenu(id, qty);
    drowCartUi(productsInCart);
}