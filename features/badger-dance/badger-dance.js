// ===== EP.2: 춤추는 벌꿀오소리 =====
// 계속 춤추다가, 종료 버튼이 눌리면 그 포즈 그대로 멈춥니다.
// 멈춘 오소리를 누르면 그 포즈에서 이어서 다시 춥니다.
// (춤추는 중에 오소리를 눌러도 아무 일 없음. 멈추는 건 종료 버튼으로만)
//
// 종료 버튼 클릭을 직접 감지하지 않고, 종료 버튼이 보내는
// "exit-button:press" 신호만 받습니다. (클릭 이벤트는 각자 section 안에만)

(() => {
  const root = document.getElementById("badger-dance");
  if (!root) return; // 이 기능이 index.html 에서 빠져도 다른 기능은 정상 작동

  const sheet = root.querySelector(".badger-dance-sheet");
  const win = root.querySelector(".badger-dance-window");

  // 종료 버튼 → 멈춤
  document.addEventListener("exit-button:press", () => {
    sheet.classList.add("badger-dance-stopped");
    win.classList.add("badger-dance-paused");
  });

  // 오소리 그림 → 멈춘 포즈에서 이어서 춤 (자기 section 안에서만 클릭 감지)
  win.addEventListener("click", () => {
    sheet.classList.remove("badger-dance-stopped");
    win.classList.remove("badger-dance-paused");
  });
})();
