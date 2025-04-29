// 获取元素
const contactBtn = document.getElementById("contactBtn");
const popup = document.getElementById("qqPopup");
const closeBtn = document.getElementById("closePopup");

// 显示弹窗
contactBtn.addEventListener("click", function () {
    popup.style.display = "block";
});

// 关闭弹窗
closeBtn.addEventListener("click", function () {
    popup.style.display = "none";
});

// 点击弹窗外关闭
window.addEventListener("click", function (event) {
    if (event.target === popup) {
        popup.style.display = "none";
    }
});
