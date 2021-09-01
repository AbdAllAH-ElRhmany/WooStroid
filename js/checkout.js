// set up data and varibles 


productsInCart = JSON.parse(localStorage.getItem('productsInCart')) ? JSON.parse(localStorage.getItem('productsInCart')) : [];
let checkDom = document.querySelector('.checkout .order-content .content');
let contentDom = document.querySelector('.checkout .order-content');

let drowCheckUi;

// list products at checkout page

(drowCheckUi= (data)=>{
    if(data.length){
        let productUi = data.map( item =>{
            return `
            <tr class="item">
                <td class="item-info"><span>${item.title}</span>  × <strong>${item.qty}</strong></td>
                <td class="item-price">$${item.productTotalPriceCart.toFixed(1)}</td>
            </tr><!-- ./item -->
            `;
        });
        checkDom.innerHTML = productUi.join('');
    }else{
        contentDom.innerHTML = "No products in cart Shopping First";
    }
})(productsInCart);
