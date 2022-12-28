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

export let showThongTin = (object) => {
  // document.getElementById("spMa").innerText = object.ma;
  document.getElementById("spTenSP").innerText = object.name;
  document.getElementById("spGia").innerText = object.price;
  document.getElementById("infoPro").innerText = object.infoPro;
  document.getElementById("imgSP").src = object.img;
  document.getElementById("pMoTa").innerText = object.desc;
  document.getElementById("spSoLuong").innerText = object.quantity;
};
