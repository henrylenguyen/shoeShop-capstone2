import {
  layThongTinTuForm,
  renderDanhSachSanPham,
  setLoadingOff,
  setLoadingOn,
  showThongTin,
} from "../controllers/ProductControllers.js";
import { Product } from "../model/ProductModel.js";

setLoadingOff();

let renderDanhSachSanPhamServices = async () => {
  setLoadingOn();
  try {
    let response = await axios({
      url: "https://639c3dee16d1763ab1438a00.mockapi.io/Products?fbclid=IwAR0n2UTPWUPFHkOieda42GhadfC0-w-wj87fzo-WJvRvekMtLoRa4O_SDAc",
      method: "GET",
    });
    setLoadingOff();
    // console.log(response);
    console.log("Danh sách sản phẩm API:", response.data);
    let dsSanPham = response.data.map((sanPham) => {
      return new Product(
        sanPham.id,
        sanPham.name,
        sanPham.price,
        sanPham.quantity,
        sanPham.img,
        sanPham.desc
      );
    });
    console.log("Danh sách sản phẩm:", dsSanPham);
    renderDanhSachSanPham(dsSanPham);
  } catch (err) {
    console.log(err);
    setLoadingOff();
  }
};

renderDanhSachSanPhamServices();

// Thêm Sản Phẩm
document.getElementById("btnThemSP").addEventListener("click", function () {
  let data = layThongTinTuForm();
  let sanPham = new Product(
    null,
    data.tenSP,
    data.giaSP,
    data.infoPro,
    data.soLuong,
    data.hinhSP,
    data.moTa
  );
  console.log(sanPham);
  setLoadingOn();

  axios({
    url: "https://639c3dee16d1763ab1438a00.mockapi.io/Products?fbclid=IwAR0n2UTPWUPFHkOieda42GhadfC0-w-wj87fzo-WJvRvekMtLoRa4O_SDAc",
    method: "POST",
    data: sanPham,
  })
    .then((res) => {
      console.log("res", res);
      setLoadingOff();
      renderDanhSachSanPhamServices();
      $("#exampleModal").modal("hide");

      alert("Thêm sản phẩm thành công!");
    })
    .catch((err) => {
      setLoadingOff();
      console.log("err", err);
    });
});

// Xóa món ăn
let xoaSanPham = (id) => {
  setLoadingOn();
  axios({
    url: `https://639c3dee16d1763ab1438a00.mockapi.io/Products?fbclid=IwAR0n2UTPWUPFHkOieda42GhadfC0-w-wj87fzo-WJvRvekMtLoRa4O_SDAc${id}`,
    method: "DELETE",
  })
    .then((res) => {
      setLoadingOff();
      renderDanhSachSanPhamServices();
    })
    .catch((err) => {
      setLoadingOff();
      console.log("err", err);
    });
};
window.xoaSanPham = xoaSanPham;

// Sửa sản phẩm
let suaSanPham = (id) => {
  showThongTinSPModal(id);
  document.getElementById("btnCapNhat").addEventListener("click", function () {
    let data = layThongTinTuForm();
    let sanPham = new Product(
      null,
      data.tenSP,
      data.giaSP,
      data.infoPro,
      data.soLuong,
      data.hinhSP,
      data.moTa
    );
    console.log(sanPham);
    setLoadingOn();

    axios({
      url: `https://639c3dee16d1763ab1438a00.mockapi.io/Products?fbclid=IwAR0n2UTPWUPFHkOieda42GhadfC0-w-wj87fzo-WJvRvekMtLoRa4O_SDAc${id}`,
      method: "PUT",
      data: sanPham,
    })
      .then((res) => {
        console.log("res", res);
        setLoadingOff();
        renderDanhSachSanPhamServices();
        $("#exampleModal").modal("hide");

        alert("Cập nhật sản phẩm thành công!");
      })
      .catch((err) => {
        setLoadingOff();
        console.log("err", err);
      });
  });
};

let showThongTinSPModal = (id) => {
  $("#exampleModal").modal("show");

  // Lấy thông tin sản phẩm theo id
  axios({
    url: `https://639c3dee16d1763ab1438a00.mockapi.io/Products?fbclid=IwAR0n2UTPWUPFHkOieda42GhadfC0-w-wj87fzo-WJvRvekMtLoRa4O_SDAc${id}`,
    method: "GET",
  })
    .then((res) => {
      console.log("res", res);
      showThongTin(res.data);
      // ẩn nút Thêm, hiện nút update
      document.getElementById("btnThemSP").style.display = "none";
      document.getElementById("btnCapNhat").style.display = "inline-block";
    })
    .catch((err) => {
      console.log("err", err);
    });
};

window.suaSanPham = suaSanPham;

// Reset form
document.getElementById("btnClose").addEventListener("click", function () {
  $("#exampleModal").on("hidden.bs.modal", function (e) {
    $("#productForm").find("input[type=text], textarea").val("");
  });
});

// ẩn nút Update, hiện nút thêm khi Thêm Sản Phẩm
// document.getElementById("exampleModalLabel").addEventListener("click", function () {
//     document.getElementById("btnThemSP").style.display = "inline-block";
//     document.getElementById("btnCapNhat").style.display = "none";
//     console.log("vào đây k ta");
// })
