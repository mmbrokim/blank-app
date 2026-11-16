// ===== EP.2: 춤추는 벌꿀오소리 =====
// 계속 춤추다가, 종료 버튼이 눌리면 그 포즈 그대로 멈춥니다.
// 버튼 클릭을 직접 감지하지 않고, 종료 버튼이 보내는
// "exit-button:press" 신호만 받습니다. (클릭 이벤트는 각자 section 안에만)

(() => {
  const root = document.getElementById("badger-dance");
  if (!root) return; // 이 기능이 index.html 에서 빠져도 다른 기능은 정상 작동

  const sheet = root.querySelector(".badger-dance-sheet");

  document.addEventListener("exit-button:press", () => {
    sheet.classList.add("badger-dance-stopped");
  });
})();
