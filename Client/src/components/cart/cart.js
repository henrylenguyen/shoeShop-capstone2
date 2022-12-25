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
// let success = new renderSweetAlertSuccess()
let cart = document.querySelector(".cart");
let btnClose = document.querySelector(".cartPage__close");
let like = document.querySelectorAll(".add-like");
let overlay = document.querySelector(".cartPage__overlay");


cart.addEventListener("click", toggleCartPage);
export function toggleCartPage() {
  document.querySelector(".cartPage").classList.add("active");
  document.querySelector(".cartPage__overlay").style.display = "block";
}
btnClose.addEventListener("click", () => {
  btnClose.parentElement.parentElement.parentElement.classList.remove("active");
  document.querySelector(".cartPage__overlay").style.display = "none";

});
// Click vào overlay sẽ đóng giỏ hàng
overlay.addEventListener("click", (e) => {
  e.target.style.display = "none";
  e.target.previousElementSibling.classList.remove("active");
});
// Sử lí thêm sản phẩm vào giỏ hàng
// khởi tạo danh sách sản phẩm cart
let productListCart = [];
let quality = 1;
let obj = {
  productListCart,
  quality
}
export function renderCart(item) {
  let cardBody = document.querySelector(".cart-body");
  let totalProduct = item.price;
  let convert = new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: 'VND'
  });

  // for(let i = 0;i<productListCart.length;i++){
    
  // }
  let templateCart = `<tr class="main-cart">
                  <td>
                    <span class="custom-checkbox">
                      <input type="checkbox" id="select">
                      <label for="select"></label>
                    </span>
                  </td>
                  <td>
                    <div class="product__name">
                      <img class="imgCart" src="${item.img}" alt="image">
                      <span class="name">${item.name}</span>
                    </div>
                  </td>
                  <td><span class="price">${convert.format(item.price)}</span></td>
                  <td>
                    <div class="amount">
                    <button id="minus" onclick="minusProduct(${item.id})"><i class="fa-solid fa-minus"></i></button>
                    <input type="text" id="mount" value="${quality}">
                    <button id="plus" data-item="${item.id}"><i class="fa-solid fa-plus"></i></button>
                    </div>
                  </td>
                  <td>
                 <span class="totalProduct"> ${convert.format(totalProduct)}</span>
                  
                  </td>
                  <td><i class="fa-solid fa-trash"></i></td>
                </tr>`;
                cardBody.insertAdjacentHTML("beforeend", templateCart);
                document.querySelector(".cartPage__body").style.display = "flex";
                document.querySelector(".cartPage__footer").style.display = "block";
                let sad = document.querySelectorAll(".sad");
                sad.forEach(item => {
                  item.style.display = "none";
                });
    // let imgCart = document.querySelector(".imgCart").getAttribute("src");
    // let nameCart = document.querySelector(".name").innerHTML;
    // let priceCart = document.querySelector(".price").innerHTML;
    let amoutCart = document.querySelector("#mount").value;
    // let totalProductCart = document.querySelector(".totalProduct").innerHTML;
    // const productCart = new listProduct(nameCart, priceCart, imgCart, amoutCart, totalProductCart);
    // productListCart.push(productCart);
    obj.productListCart = item;
    obj.quality = amoutCart;
    // console.log(obj)
    document.querySelector(".quantityOfProducts").innerHTML = productListCart.length;
    // setLocalStorage({...obj});
  
}

export function addCart() {

  let button = document.querySelectorAll(".add-cart");
  [...button].forEach(item => {
    item.addEventListener("click", () => {
      const id = +item.dataset.id;
      for (let j = 0; j < productListCart.length; j++) {
        if (+productListCart[j].id == id) {
          // thông báo và ngừng lun chương trình để cho người dùng biết là đang có sản phẩm đó trong giỏ hàng. Người dùng có thể vào giỏ hàng để thêm số lượng
          renderSweetAlertError("Đã có sản phẩm trong giỏ hàng");
          return;
        }
      }
      for (let i = 0; i < products.length; i++) {
        if (id == products[i].id) {
          renderCart(products[i]);
          renderSweetAlertSuccess();
        }
      }

    })
  })

}

// addCart();
function plusProduct(id) {
  // let plus = document.querySelector("#plus");
  // let number = document.querySelector("#mount");
  // let numberValue = +number.value;
  for (let i = 0; i < products.length; i++) {
    if (products[i].id === id) {
      obj.quality++;
    }
    // if (productList[i].quality >= 10) {
    //   renderSweetAlertError("Bạn chỉ được mua tối đa 10 sản phẩm cho đơn hàng này")
    //   plus.disabled = true;
    //   return 0;
    // }
  }
  // plus.addEventListener("click", () => {
  //   if (numberValue >= 10) {
  //     renderSweetAlertError("Bạn chỉ được mua tối đa 10 sản phẩm cho đơn hàng này")
  //     plus.disabled = true;
  //     return 0;
  //   }
  //   numberValue++;
  //   number.value = numberValue;
  // })
}

function minusProduct() {
  minus.addEventListener("click", () => {
    if (numberValue <= 10) {
      plus.disabled = false;
    }
    if (numberValue <= 1) {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })

      swalWithBootstrapButtons.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelled',
            'Your imaginary file is safe :)',
            'error'
          )
        }
      })
      return 0;
    }
    numberValue--;
    number.value = numberValue;

  })
}

// Lưu vào localStorage
export function setLocalStorage(key,value) {
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
  //   name,
  //   price,
  //   disc,
  //   img,
  //   amount,
  //   category
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