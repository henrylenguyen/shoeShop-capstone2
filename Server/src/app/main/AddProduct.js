import { layThongTinTuForm } from "../controllers/AddProductControllers.js";
import { showThongTin } from "../controllers/AddProductControllers.js";
import { Product } from "../model/Product.js";

const Base_URL =
  "https://639c3dee16d1763ab1438a00.mockapi.io/Products?fbclid=IwAR0n2UTPWUPFHkOieda42GhadfC0-w-wj87fzo-WJvRvekMtLoRa4O_SDAc";

document.getElementById("btnThemSP").addEventListener("click", function () {
  let thongTinSP = layThongTinTuForm();
  let { tenSP, giaSP, infoPro, soLuong, hinhSP, moTa } = thongTinSP;

  let sanPham = new Product(tenSP, giaSP, infoPro, soLuong, hinhSP, moTa);
  console.log(sanPham);
  showThongTin(sanPham);

  axios({
    url: Base_URL,
    method: "POST",
    data: sanPham,
  })
    .then(function (res) {
      console.log("Thêm sản phẩm mới", res);
      alert("Thêm sản phẩm thành công!");
    })
    .catch(function (err) {
      console.log("not create", err);
    });
});
