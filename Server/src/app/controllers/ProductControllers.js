// Hàm render danh sách món ăn
export let renderDanhSachSanPham = (array) => {
  let contentHTML = "";
  array.forEach((sanPham) => {
    let contentTrTag = `<tr>
                                <td>${sanPham.id}</td>
                                <td>${sanPham.name}</td>                              
                                <td>${sanPham.price}</td>                               
                                <td>${sanPham.infoPro}</td>
                                <td>${sanPham.quantity}</td>
                                <td>
                                    <button class="btn btn-success" onclick="suaSanPham(${sanPham.id})" >sửa</button>
                                    <button class="btn btn-danger" onclick="xoaSanPham(${sanPham.id})">xóa</button>
                                </td>
                            </tr>`;
    contentHTML += contentTrTag;
  });
  // console.log("content",contentHTML);
  document.getElementById("tbodyProduct").innerHTML = contentHTML;
};

// Loại món: false - Chay, true - Mặn
// Tình trạng: false - Hết , true - Còn

export let layThongTinTuForm = () => {
  // let id = document.getElementById("foodID").value;
  let tenSP = document.getElementById("tenSP").value;
  let giaSP = document.getElementById("giaSP").value;
  let infoPro = document.getElementById("infoPro").value;
  let soLuong = document.getElementById("soLuong").value;
  let hinhSP = document.getElementById("hinhSP").value;
  let moTa = document.getElementById("moTa").value;

  return {
    tenSP,
    giaSP,
    infoPro,
    soLuong,
    hinhSP,
    moTa,
  };
};

export let setLoadingOn = () => {
  document.getElementById("loading").style.display = "flex";
};

export let setLoadingOff = () => {
  document.getElementById("loading").style.display = "none";
};

export let showThongTin = (object) => {
  // document.getElementById("spMa").innerText = object.ma;
  document.getElementById("tenSP").value = object.name;
  document.getElementById("giaSP").value = object.price;
  document.getElementById("infoPro").value = object.infoPro;
  document.getElementById("soLuong").value = object.quantity;
  document.getElementById("hinhSP").src = object.img;
  document.getElementById("moTa").value = object.desc;
};
