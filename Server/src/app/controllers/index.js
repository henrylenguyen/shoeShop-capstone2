let updateId = null;
let tbodyProduct = document.querySelector("#tbodyProduct");
 const endpoint = "https://639c3dee16d1763ab1438a00.mockapi.io/Products";
 let products = [];
/**
 * 
 *  <th>Tên</th>
    <th>Giá</th>
     <th>Mô tả</th>
     <th>Thể loại</th>
      <th>Số lượng</th>
     <th>Hình ảnh</th>
      <th>Thao tác</th>
 * 
 */


// ---------------------------------LẤY SẢN PHẨM----------------------
  async function getFullProduct() {
  try {
    const respone = await fetch(endpoint);
    const data = await respone.json();
    // Kiểm tra xem có chắc chắn là có dữ liệu hay không, và dữ liệu đó có phải là mảng hay không rồi mới render ra giao diện
    if (data.length > 0 && Array.isArray(data)) {
      data.forEach(item => {
        products.push(item);
        // console.log(products);
      })
    }
    renderProduct();
  } catch (error) {
    //  document.body.innerHTML = "";
    console.log(error);
  }

}
function renderProduct(item) {
  let convert = new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: 'VND'
  });
  let template = '';
  for(let i=0;i<products.length;i++){
    template+= `
        <tr>
                  <td class="product-name">${products[i].name}</td>
                  <td class="product-price">${convert.format(products[i].price)}</td>
                  <td class="product-disc">${products[i].disc}</td>
                  <td class="product-category">${products[i].category}</td>
                  <td class="product-amount">${products[i].amount}</td>
                  <td class="product-image">
                    <img src="${products[i].img}" alt="image">
                  </td>
                  <td class="d-flex justify-content-center flex-column product-setting">
                    <button  class="btn-success product-update" data-update="${products[i].id}" type="button"
                    data-toggle="modal"
                    data-target="#exampleModal">Sửa</button>
                    <button class="btn-danger product-delete mt-2" data-delete="${products[i].id}">Xóa</button>
                  </td>
                </tr>
    `;
    tbodyProduct.innerHTML = template;
  }
  updateClick();
}
// ----------------------------------- SỬA SẢN PHẨM -----------------------------------
async function updateProduct({
  id,
  name,
  price,
  disc,
  category,
  amount,
  img
}) {
  await fetch(`${endpoint}/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      name,
      price,
      disc,
      category,
      amount,
      img
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
}

// ----------------------------------- XÓA SẢN PHẨM -------------------------------
async function deleteCourse(id) {
  await fetch(`${endpoint}/${id}`, {
    method: "DELETE",
  });
}
async function getSingleProduct(id) {
  const response = await fetch(`${endpoint}/${id}`);
  const data = await response.json();
  return data;
}


function updateClick() {
 
  let update = document.querySelectorAll(".product-update");
  [...update].forEach(item => {
    item.addEventListener("click", async function (e) {
        const id = +item.dataset.update;
        const data = await getSingleProduct(id);
         document.getElementById("tenSP").value = data.name;
         document.getElementById("giaSP").value = data.price;
         document.getElementById("theloaiSp").value = data.category;
         document.getElementById("soLuong").value = data.amount;
         document.getElementById("hinhSP").value = data.img;
         document.getElementById("moTa").value = data.disc;
        updateId = id;
    });
    updateSubmit();
  })
}
function deleteClick(){
  let deleteleProduct = document.querySelectorAll(".product-delete");
  [...deleteleProduct].forEach(item=>{
    item.addEventListener("click", function (e) {
      const id = +item.dataset.delete;
      const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })

  swalWithBootstrapButtons.fire({
    showClass: {
      popup: 'animate__animated animate__fadeInDown'
    },
    hideClass: {
      popup: 'animate__animated animate__fadeOutUp'
    },
    title: 'Bạn có chắc muốn xóa',
    text: "Bạn sẽ không thể hoàn tác khi đã xóa",
    icon: 'question',
    width: '50rem',
    showCancelButton: true,
    confirmButtonText: 'Tiếp tục',
    cancelButtonText: 'Hủy',
    reverseButtons: true

  }).then( async (result) => {
    if (result.isConfirmed) {
      await deleteCourse(id);
      renderCart();
      swalWithBootstrapButtons.fire(
        'Đã xóa!',
        'Sản phẩm của bạn đã bị xóa',
        'success'
      )
    } else if (
      /* Read more about handling dismissals below */
      result.dismiss === Swal.DismissReason.cancel
    ) {
      swalWithBootstrapButtons.fire(
        'Đã hủy',
        'Sản phẩm của bạn vẫn còn nhé!',
        'error'
      )
    }
  })
    })
  })
}
 function layThongTinTuForm() {
   let name = document.getElementById("tenSP").value;
   let price = +document.getElementById("giaSP").value;
   let category = document.getElementById("theloaiSp").value;
   let amount = +document.getElementById("soLuong").value;
   let img = document.getElementById("hinhSP").value;
   let disc = document.getElementById("moTa").value;

   return {
     name,
     price,
     disc,
     category,
     amount,
     img
   };
 };

 function updateSubmit(){
  let submit = document.querySelector("#btnCapNhat");
  submit.addEventListener("click", async () => {
    const product = layThongTinTuForm();
    await updateProduct({
      id: updateId,
      ...product
    })
  })
  getFullProduct();
}
window.addEventListener("load",()=>{
  getFullProduct();
})