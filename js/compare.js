// set up data and varibles 

let compareList = JSON.parse(localStorage.getItem('compareList')) ? JSON.parse(localStorage.getItem('compareList')) : [];
let compareDom = document.querySelector('.compare-content')

let tableHead = document.querySelector('#table-head');
let proImg = document.querySelector('#proImg');
let proName = document.querySelector('#proName');
let proPrice = document.querySelector('#proPrice');
let proRate = document.querySelector('#proRate');
let proDesc = document.querySelector('#proDesc');
let proBrand = document.querySelector('#proBrand');
let proManuf = document.querySelector('#proManuf');
let proColor = document.querySelector('#proColor');
let proOs = document.querySelector('#proOs');
let proSize = document.querySelector('#proSize');
let proWarr = document.querySelector('#proWarr');
let proWater = document.querySelector('#proWater');
let proConn = document.querySelector('#proConn');
let proAdd = document.querySelector('#proAdd');

let pro1 = compareList[0];
let pro2 = compareList[1];



// list products at compare page

let drowCompareUi;

(drowCompareUi =  function (compareList){
    switch (compareList.length) {
        case 1:
            tableHead.innerHTML = `<td>Product:</td>
            <td onclick="delFromCompare(${pro1.id})" title="Delete form compare"><i class="far fa-trash-alt text-hover-black"></i></td>`;
            proImg.innerHTML = `<td></td>
            <td class="productImg"><img src="${pro1.image[0]}"></td>`;
            proName.innerHTML = `<td></td>
            <td class="productName font18"><a href="product.html"  onclick="setProductDetails(${pro1.id})" class="text-hover-black">Apple iPad Pro</a></td>`;
            proPrice.innerHTML = `<td></td>
            <td class="productPrice font18">$${pro1.price}</td>`;
            proRate.innerHTML = `<td></td>
             <td ><div class="product-rate">
            <i class="fas ${pro1.rate > 0 ? 'active' : ''} fa-star"></i>
            <i class="fas ${pro1.rate > 1 ? 'active' : ''}  fa-star"></i>
            <i class="fas ${pro1.rate > 2 ? 'active' : ''}  fa-star"></i>
            <i class="fas ${pro1.rate > 3 ? 'active' : ''} fa-star"></i>
            <i class="fas ${pro1.rate > 4 ? 'active' : ''} fa-star"></i>
                </div><!-- ./product-rate --></td>`;
            proDesc.innerHTML = `<td>description:</td>
            <td><p class="productDesc">${pro1.desc}</p></td>`;
            proBrand.innerHTML = `<td>brand:</td>
            <td><p class="productBrand font18">${pro1.brand}</p></td>`;
            proManuf.innerHTML = `<td>Manufacturer:</td>
            <td><p class="productManufacturer font18">${pro1.Manufacturer}</p></td>`;
            proColor.innerHTML = `<td>Color:</td>
            <td><p class="productColor font18">${pro1.color.map(i => ' '+i )}</p></td>`;
            proOs.innerHTML = `<td>OS:</td>
            <td><p class="productOS font18">${pro1.os}</p></td>`;
            proSize.innerHTML = `<td>Memory:</td>
            <td><p class="productMemory font18">${pro1.size.map(i => ' '+i )}</p></td>`;
            proWarr.innerHTML = `<td>Warranty:</td>
            <td><p class="productWarranty font18">${pro1.Warranty}</p></td>`;
            proWater.innerHTML = `<td>Waterproof:</td>
            <td><p class="productWaterproof font18">${pro1.waterproof}</p></td>`;
            proConn.innerHTML = `<td>Connectivity:</td>
            <td><p class="productConnectivity font18">${pro1.Connectivity}</p></td>`;
            proAdd.innerHTML = ` <td></td>
            <td><button class="addToCart bg-hover-blue" onclick="addToCart( 1, ${pro1.id})">add to cart</button></td>`;
            break;
        case 2:
            tableHead.innerHTML = `<td>Product:</td>
            <td onclick="delFromCompare(${pro1.id})"><i class="far fa-trash-alt text-hover-black"></i></td>
            <td onclick="delFromCompare(${pro2.id})"><i class="far fa-trash-alt text-hover-black"></i></td>`;
            proImg.innerHTML = `<td></td>
            <td class="productImg"><img src="${pro1.image[0]}"></td>
            <td class="productImg"><img src="${pro2.image[0]}"></td>`;
            proName.innerHTML = `<td></td>
            <td class="productName font18"><a href="product.html"  onclick="setProductDetails(${pro1.id})" class="text-hover-black">Apple iPad Pro</a></td>
            <td class="productName font18"><a href="product.html"  onclick="setProductDetails(${pro2.id})" class="text-hover-black">Apple iPad Pro</a></td>`;
            proPrice.innerHTML = `<td></td>
            <td class="productPrice font18">$${pro1.price}</td>
            <td class="productPrice font18">$${pro2.price}</td>`;
            proRate.innerHTML = `<td></td>
             <td ><div class="product-rate">
            <i class="fas ${pro1.rate > 0 ? 'active' : ''} fa-star"></i>
            <i class="fas ${pro1.rate > 1 ? 'active' : ''}  fa-star"></i>
            <i class="fas ${pro1.rate > 2 ? 'active' : ''}  fa-star"></i>
            <i class="fas ${pro1.rate > 3 ? 'active' : ''} fa-star"></i>
            <i class="fas ${pro1.rate > 4 ? 'active' : ''} fa-star"></i>
                </div><!-- ./product-rate --></td>
                <td ><div class="product-rate">
                <i class="fas ${pro2.rate > 0 ? 'active' : ''} fa-star"></i>
                <i class="fas ${pro2.rate > 1 ? 'active' : ''}  fa-star"></i>
                <i class="fas ${pro2.rate > 2 ? 'active' : ''}  fa-star"></i>
                <i class="fas ${pro2.rate > 3 ? 'active' : ''} fa-star"></i>
                <i class="fas ${pro2.rate > 4 ? 'active' : ''} fa-star"></i>
                    </div><!-- ./product-rate --></td>`;
            proDesc.innerHTML = `<td>description:</td>
            <td><p class="productDesc">${pro1.desc}</p></td>
            <td><p class="productDesc">${pro2.desc}</p></td>`;
            proBrand.innerHTML = `<td>brand:</td>
            <td><p class="productBrand font18">${pro1.brand}</p></td>
            <td><p class="productBrand font18">${pro2.brand}</p></td>`;
            proManuf.innerHTML = `<td>Manufacturer:</td>
            <td><p class="productManufacturer font18">${pro1.Manufacturer}</p></td>
            <td><p class="productManufacturer font18">${pro2.Manufacturer}</p></td>`;
            proColor.innerHTML = `<td>Color:</td>
            <td><p class="productColor font18">${pro1.color.map(i => ' '+i )}</p></td>
            <td><p class="productColor font18">${pro2.color.map(i => ' '+i )}</p></td>`;
            proOs.innerHTML = `<td>OS:</td><td><p class="productOS font18">${pro1.os}</p></td>
            <td><p class="productOS font18">${pro2.os}</p></td>`;
            proSize.innerHTML = `<td>Memory:</td>
            <td><p class="productMemory font18">${pro1.size.map(i => ' '+i )}</p></td>
            <td><p class="productMemory font18">${pro2.size.map(i => ' '+i )}</p></td>`;
            proWarr.innerHTML = `<td>Warranty:</td>
            <td><p class="productWarranty font18">${pro1.Warranty}</p></td>
            <td><p class="productWarranty font18">${pro2.Warranty}</p></td>`;
            proWater.innerHTML = `<td>Waterproof:</td>
            <td><p class="productWaterproof font18">${pro1.waterproof}</p></td>
            <td><p class="productWaterproof font18">${pro2.waterproof}</p></td>`;
            proConn.innerHTML = `<td>Connectivity:</td>
            <td><p class="productConnectivity font18">${pro1.Connectivity}</p></td>
            <td><p class="productConnectivity font18">${pro2.Connectivity}</p></td>`;
            proAdd.innerHTML = ` <td></td>
            <td><button class="addToCart bg-hover-blue" onclick="addToCart( 1, ${pro1.id})">add to cart</button></td>
            <td><button class="addToCart bg-hover-blue" onclick="addToCart( 1, ${pro2.id})">add to cart</button></td>`;
            break;
    
    
        default: 
        compareDom.innerHTML = '<p class="font18">No products to compare</p>';
            break;
    }
})(compareList);


// delete products form the compare list

let delFromCompare = (id) => {
	compareList = compareList.filter ((i) => i.id !=id);
	localStorage.setItem('compareList', JSON.stringify(compareList));
	drowCompareUi(compareList);
};