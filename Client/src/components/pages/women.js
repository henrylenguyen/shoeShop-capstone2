import {
  renderCart,
  addCart,
  mapProductList,
  getLocalStorage
} from "../cart/cart.js"
import {
  loader
} from "../home/loader.js"

export const enpoint = "https://639c3dee16d1763ab1438a00.mockapi.io/Products";
const productList = document.querySelector(".product__list");
// const objProduct = {
//   name,
//   price,
//   disc,
//   img,
//   amount,
//   category
// }

function renderProduct(item) {
  const template = `<div class="col">
          <div class="product__card">
              <div class="product__card-item">
                <div class="product__card-img">
                <img class="zoom" id="image" src="${item.img}" alt="image">
                </div>
                <div class="product__card-body">
                <div div class = "d-flex flex-column justify-content-between " >
                <h3>${item.name}</h3>
                  <div class="text-group">
                    <h4 class="product__card-text">${item.category}</h4>
                    <p class="product__card-price">${new Intl.NumberFormat('it-IT', {
        style: 'currency',
        currency: 'VND'
      }).format(item.price)}</p>
                    </div>
                </div>
                  <div class="btn-group d-flex justify-content-between align-items-center">
                    <button class="btn_primary add-cart" data-id="${item.id}" type="button">Add to cart</button>
                    <i class="fa-regular fa-heart add-like"></i>
                </div>
                            </div>
              </div>
          </div>
        </div>`;
  productList.insertAdjacentHTML("beforeend", template);
}
// Dùng set để xóa hết các phần tử trùng
let options = new Set();
export let products = [];

export async function getFullProduct() {
  loader(true);
  const respone = await fetch(enpoint);
  const data = await respone.json();
  // Kiểm tra xem có chắc chắn là có dữ liệu hay không, và dữ liệu đó có phải là mảng hay không rồi mới render ra giao diện
  if (data.length > 0 && Array.isArray(data)) {
    data.forEach(item => {
      if (item.category.includes("Women")) {
        // console.log(item)
        renderProduct(item);
        products.push(item);
        let convert = item.category.split(" ")[0].replace("'s", "");
        options.add(convert);

      }
      // console.log(typeof convert);
      // Thêm vào Set
    })
  }
  loader(false);
  addCart();
  sortPrice();
}
// Sắp xếp theo giá
function sortPrice() {
  let tempt = [];
  let e = document.getElementById("price__select");
  e.addEventListener("change", () => {
    let giaTri = e.options[e.selectedIndex].text;
    let down = giaTri.toLowerCase().includes("cao đến thấp");
    productList.innerHTML = "";
    if (down) {
      for (let i = 0; i < products.length; i++) {
        for (let j = i + 1; j < products.length; j++) {
          if (products[j].price > products[i].price) {
            tempt = products[j];
            products[j] = products[i];
            products[i] = tempt;
          }

        }
        renderProduct(products[i]);
        // console.log(products[i]);
      }
    } else {
      for (let i = 0; i < products.length; i++) {
        for (let j = i + 1; j < products.length; j++) {
          if (products[j].price < products[i].price) {
            tempt = products[j];
            products[j] = products[i];
            products[i] = tempt;
          }

        }
        renderProduct(products[i]);
        // console.log(products[i]);
      }
    }
  })
}

// Tìm kiếm sản phẩm
function seachProduct() {
  let search = document.querySelector(".search__input");
  search.addEventListener("input", () => {
    productList.innerHTML = "";
    // console.log(search.value)
    let userSearch = products.filter((value) => {
      return value.name.toLowerCase().includes(search.value.toLowerCase());
    })
    //  console.log(userSearch)
    userSearch.forEach(item => {
      renderProduct(item)
      // console.log(item)
    })

  })
}
window.onload = () => {
  getFullProduct();
  seachProduct();
  let productListFromLocal = getLocalStorage();
  if (productListFromLocal.length > 0 && Array.isArray(productListFromLocal)) {
    productListFromLocal.forEach(item => {
      renderCart(item);
    })
  } else {
    let template = `<h3 class="sad" >Chưa có sản phẩm nào trong giỏ hàng</h3>
    <img src="../assets/icons/sad.png" style="width:300px" class="mt-5 mx-auto sad"/>`
    document.querySelector(".cartPage__body").style.display = "none";
    document.querySelector(".cartPage__footer").style.display = "none";
    document.querySelector(".cartPage__content").insertAdjacentHTML("beforeend", template);
  }
  document.querySelector(".quantityOfProducts").innerHTML = productListFromLocal.length;
  // let mapProductList();
  // console.log(productListFromLocal.length);
}