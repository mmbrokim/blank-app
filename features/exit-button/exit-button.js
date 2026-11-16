// ===== EP.1: 앱 종료 버튼 =====
// 누르면 버튼이 흔들리기만 하고, 종료는 되지 않습니다.

(() => {
  const root = document.getElementById("exit-button");
  if (!root) return; // 이 기능이 index.html 에서 빠져도 다른 기능은 정상 작동

  const btn = root.querySelector(".exit-btn");

  btn.addEventListener("click", () => {
    btn.classList.remove("exit-shake");
    void btn.offsetWidth; // 연타해도 처음부터 다시 흔들리게
    btn.classList.add("exit-shake");
  });
})();
