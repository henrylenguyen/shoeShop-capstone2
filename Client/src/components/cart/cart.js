import {
  renderSweetAlertSuccess,
  renderSweetAlertWarning,
  renderSweetAlertError
} from "../home/sweetAlert.js"
import {
  products,
  enpoint
} from "../Products/index.js"
import {
  listProduct
} from "../Products/list.js"
import{
  createModal
}from "../modal.js"

// let success = new renderSweetAlertSuccess()
let cart = document.querySelector(".cart");
let btnClose = document.querySelector(".cartPage__close");
let like = document.querySelectorAll(".add-like");
let overlay = document.querySelector(".cartPage__overlay");

//----------------------- CÁC CHỨC NĂNG ĐÓNG MỞ GIỎ HÀNG-----------------------------

// nút bấm mở giỏ hàng
cart.addEventListener("click", toggleCartPage);
export function toggleCartPage() {
  document.querySelector(".cartPage").classList.add("active");
  document.querySelector(".cartPage__overlay").style.display = "block";
}
// nút đóng giỏ hàng
btnClose.addEventListener("click", () => {
  btnClose.parentElement.parentElement.parentElement.classList.remove("active");
  document.querySelector(".cartPage__overlay").style.display = "none";

});
// Click vào overlay sẽ đóng giỏ hàng
overlay.addEventListener("click", (e) => {
  e.target.style.display = "none";
  e.target.previousElementSibling.classList.remove("active");
});



// -------------------------------SỬ LÝ GIỎ HÀNG---------------------------

// chuyển sang định dạng tiền tệ việt nam
let convert = new Intl.NumberFormat('it-IT', {
  style: 'currency',
  currency: 'VND'
});

// Sử lí thêm sản phẩm vào giỏ hàng
export function renderCart() {
  let templateCart = '';
  let cardBody = document.querySelector(".cart-body");
  // let totalProduct = item.price;
  // Lặp qua mảng giỏ hàng
  for (let i = 0; i < productListCart.length; i++) {
    let priceProduct = +productListCart[i].productCard[i].price * +productListCart[i].quanlity;
    templateCart += `<tr class="main-cart">
                    <td>
                      <span class="custom-checkbox">
                        <input type="checkbox" id="select">
                        <label for="select"></label>
                      </span>
                    </td>
                    <td>
                      <div class="product__name">
                        <img class="imgCart" src="${productListCart[i].productCard[i].img}" alt="image">
                        <span class="name">${productListCart[i].productCard[i].name}</span>
                      </div>
                    </td>
                    <td><span class="price">${convert.format(productListCart[i].productCard[i].price)}</span></td>
                    <td>
                      <div class="amount">
                      <button class="minus"  id="minus"  data-mcart="${productListCart[i].productCard[i].id}"> <i class="fa-solid fa-minus"></i></button>
                      <input type="text" id="mount" value="${productListCart[i].quanlity}">
                      <button class="plus" id="plus" data-pcart="${productListCart[i].productCard[i].id}"><i class="fa-solid fa-plus"></i></button>
                      </div>
                    </td>
                    <td>
                   <span class="totalProduct"> ${convert.format(priceProduct)}</span>
                    
                    </td>
                    <td><i class="fa-solid fa-trash "></i></td>
                  </tr>`;

    cardBody.innerHTML = templateCart;  
  }
  document.querySelector(".cartPage__body").style.display = "flex";
  document.querySelector(".cartPage__footer").style.display = "block";
  let sad = document.querySelectorAll(".sad");
  sad.forEach(item => {
    item.style.display = "none";
  });
  // let amoutCart = document.querySelector("#mount").value;
  document.querySelector(".quantityOfProducts").innerHTML = productListCart.length;
  totalProduct();
  // setLocalStorage({...obj});
  plusAmount();
  minusAmount();
}
// tạo biến productListCart để lưu trữ dữ liệu của giỏ hàng
let productListCart = [];
export function addCart() {
  // tạo 1 object chứa đựng cả mảng sản phẩm và số lượng
  let objCart = {
    productCard: [],
    quanlity: 1
  }
  // DOM các nút bấm trong html
  let button = document.querySelectorAll(".add-cart");
  [...button].forEach(item => {
    item.addEventListener("click", () => {
      //so sánh dataset của nút bấm thêm vào giỏ hàng
      const id = +item.dataset.id;
      for (let j = 0; j < productListCart.length; j++) {
        if (+productListCart[j].productCard[j].id == id) {
          // thông báo và ngừng lun chương trình để cho người dùng biết là đang có sản phẩm đó trong giỏ hàng. Người dùng có thể vào giỏ hàng để thêm số lượng
          renderSweetAlertWarning("Đã có sản phẩm trong giỏ hàng");
          return;
        }
      }
      for (let i = 0; i < products.length; i++) {
        // nếu id của nút bấm trùng với id sản phẩm thì thêm vào giỏ
        if (id == products[i].id) {
          // thêm sản phẩm vào trong đối tượng 
          objCart.productCard.push(products[i]);
          console.log(objCart)
          //Sau đó đẩy cả đối tượng card vào mảng global
          productListCart.push(objCart);
          renderSweetAlertSuccess();
          renderCart();
         

          console.log(productListCart);

        }
      }

    })
  })

}

// ----------------------------- TỔNG TIỀN -------------------------------------------
function totalProduct() {
  // console.log(intoMoney)
  let total = 0;
  for (let i = 0; i < productListCart.length; i++) {
    total += productListCart[i].productCard[i].price *productListCart[i].quanlity;
  }


  document.querySelector("#totalProduct").innerHTML = convert.format(total);
}

// ----------------------------------- TĂNG SẢN PHẨM--------------------------------------
function plusAmount() {
  let plus = document.querySelectorAll(".plus");
  let sum = 0;
  [...plus].forEach(item => {
    item.addEventListener("click", (e) => {
      console.log(item)
      const id = +item.dataset.pcart;
      for (let i = 0; i < productListCart.length; i++) {
        let amount = productListCart[i].productCard[i].amount;
        
        if (id == +productListCart[i].productCard[i].id) {
              console.log(id)
              console.log(id, productListCart)
              // if (productListCart[i].quanlity >= amount) {
              //   renderSweetAlertError(`Bạn chỉ được mua tối đa ${amount} trong 1 đơn hàng`);
              //   productListCart[i].quanlity = amount;
              //   item.disabled = true;
              //   item.style.pointerEvents ="none";
              //   // renderCart();
              //   return;
              // } else {
              //   productListCart[i].quanlity++;
              //   console.log(productListCart[i]);
              //   renderCart();
              //   // break;
              // }
            }
            // else{
            //   return;
            // }
        //     // console.log(item)
          }
    })
  })
}
  

//------------------------------------GIẢM SẢN PHẨM------------------------------
function minusAmount() {
  let minus = document.querySelectorAll(".minus");
  for (let i = 0; i < productListCart.length; i++) {
    minus.forEach(item => {
      item.addEventListener("click", () => {
        if (+item.dataset.mcart == +productListCart[i].productCard[i].id) {
          if (productListCart[i].quanlity <= 1) {
            productListCart[i].quanlity = 1;

            // item.disabled = true;
            // item.style.pointerEvents = "none";
            // renderCart();
            createModal("infor","Bạn có chắc muốn xóa?","Bạn sẽ không thể hoàn tác khi xóa","Xóa thành công!","Dữ liệu của bạn đã bị xóa")
            return;
          } else {
            productListCart[i].quanlity--;
            // console.log(productListCart[i].quanlity);
            renderCart();


          }
        }
      })
    })
  }

}

// ------------------------------------SỬ LÝ LOCALSTORAGE---------------------------

// Lưu vào localStorage
export function setLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}
export function getLocalStorage(value) {
  let local = localStorage.getItem(value);
  if (!local) return [];
  return JSON.parse(local);
}
// Map dữ liệu
export function mapProductList(local) {
  let result = [];
  for (let i = 0; i < local.length; i++) {
    let oldProduct = local[i];
    let newProduct = new staffList(
      oldProduct.id,
      oldProduct.name,
      oldProduct.price,
      oldProduct.disc,
      oldProduct.img,
      oldProduct.amount,
      oldProduct.category,
    );
    result.push(newProduct);
  }

  return result;
}