import { deleteAlert } from "./home/sweetAlert.js";

export function createModal( icon, title, text, title2, text2 ) {
  if (icon == "infor") {
    let template = `<div class="modal">
  <div class="modal-content modal-question active">
    <i class="fa-solid fa-information modal-icon"></i>
    <h2 class="modal-title">${title}</h2>
    <p class="modal-text">${text}</p>
    <div class="btn-group">
      <button class="btn btn-cancel">Hủy</button>
      <button class="btn btn-submit">Đồng ý</button>
    </div>

  </div>
  <div class="modal-content modal-answer">
    <i class="fa-solid fa-check modal-icon"></i>
    <h2 class="modal-title">${title2}</h2>
    <p class="modal-text">${text2}</p>
    <div class="btn-group">
      <button class="btn btn-submit">OK</button>
    </div>
  </div>
</div>
    
      </div>
    </div>`;
    document.body.insertAdjacentHTML("afterbegin", template);
    document.querySelectorAll(".modal-icon").forEach(item=>{
      item.style.background = "var(--color2)";
    })
    document.querySelectorAll(".modal-title").forEach(item=>item.style.color="var(--color2)");
    deleteAlert(".modal");
  } else if (icon == "error") {
    let template = `<div class="modal">
  <div class="modal-content modal-question active">
    <i class="fa-solid fa-information modal-icon"></i>
    <h2 class="modal-title">${title}</h2>
    <p class="modal-text">${text}</p>
    <div class="btn-group">
      <button class="btn btn-cancel">Hủy</button>
      <button class="btn btn-submit">Đồng ý</button>
    </div>

  </div>
  <div class="modal-content modal-answer">
    <i class="fa-solid fa-check modal-icon"></i>
    <h2 class="modal-title">${title2}</h2>
    <p class="modal-text">${text2}</p>
    <div class="btn-group">
      <button class="btn btn-submit">OK</button>
    </div>
  </div>
</div>
    
      </div>
    </div>`;
    document.body.insertAdjacentHTML("afterbegin", template);
    document.querySelectorAll(".modal-icon").forEach(item => {
      item.style.background = "var(--color4)";
    })
    document.querySelectorAll(".modal-title").forEach(item => item.style.color = "var(--color4)");
    deleteAlert(".modal");
  } else if (icon == "warning") {
    let template = `<div class="modal">
  <div class="modal-content modal-question active">
    <i class="fa-solid fa-information modal-icon"></i>
    <h2 class="modal-title">${title}</h2>
    <p class="modal-text">${text}</p>
    <div class="btn-group">
      <button class="btn btn-cancel">Hủy</button>
      <button class="btn btn-submit">Đồng ý</button>
    </div>

  </div>
  <div class="modal-content modal-answer">
    <i class="fa-solid fa-check modal-icon"></i>
    <h2 class="modal-title">${title2}</h2>
    <p class="modal-text">${text2}</p>
    <div class="btn-group">
      <button class="btn btn-submit">OK</button>
    </div>
  </div>
</div>
    
      </div>
    </div>`;
    document.body.insertAdjacentHTML("afterbegin", template);
    document.querySelectorAll(".modal-icon").forEach(item => {
      item.style.background = "var(--color3)";
    })
    document.querySelectorAll(".modal-title").forEach(item => item.style.color = "var(--color3)");
    deleteAlert(".modal");
  }
}
