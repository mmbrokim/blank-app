// ===== EP.4: 오소리 분신술 =====
// 댓글: "오소리 100마리로 늘려 주세요" → 두 배씩 늘려서 128마리까지
//
// 춤추는 오소리(EP.2)를 누를 때마다 오소리 수가 두 배가 됩니다.
// (원래 오소리 포함 1 → 2 → 4 → … → 128마리. 늘어난 만큼 작은 분신이 화면 곳곳에 튀어나옴)
// 제목 밑 배지에 지금 마리 수가 숫자로만 뜹니다. (2, 4, … 128)
// 128마리가 되면 더 눌러도 안 늘고, 분신 전체가 덜덜 떨기만 합니다.
// 종료 버튼이 눌리면 분신도 전부 그 포즈로 멈추고,
// 멈춘 오소리를 누르면 (원래 오소리와 함께) 다 같이 이어서 춥니다. (이때는 안 늘어남)
//
// 오소리 클릭은 직접 감지하지 않고 "badger-dance:press" 신호만 받고,
// 종료 버튼도 "exit-button:press" 신호만 받습니다.
//
// ----- 다음 기능을 위한 연결 고리 -----
// 1. 오소리 수가 바뀌면 "badger-clone:change" 신호 (detail.count = 지금 마리 수)
// 2. 128마리를 처음 채우면 "badger-clone:full" 신호

(() => {
  const root = document.getElementById("badger-clone");
  if (!root) return; // 이 기능이 index.html 에서 빠져도 다른 기능은 정상 작동

  const MAX = 128;
  const SRC = "features/badger-clone/badger-clone.webp";
  const layer = root.querySelector(".badger-clone-layer");
  const countText = root.querySelector(".badger-clone-count");

  let count = 1; // 원래 오소리 1마리부터
  let stopped = false;

  function emit(name, detail) {
    root.dispatchEvent(new CustomEvent(name, { bubbles: true, detail }));
  }

  function makeClone() {
    const win = document.createElement("div");
    win.className = "badger-clone-window";
    win.style.setProperty("--x", Math.random().toFixed(3));
    win.style.setProperty("--y", Math.random().toFixed(3));

    const sheet = document.createElement("img");
    sheet.className = "badger-clone-sheet";
    sheet.src = SRC;
    sheet.alt = "";
    sheet.draggable = false;
    // 분신마다 춤 박자를 다르게 해서 제각각 춤추게
    sheet.style.animationDelay = -(Math.random() * 1.6).toFixed(2) + "s";

    win.appendChild(sheet);
    return win;
  }

  function double() {
    const frag = document.createDocumentFragment();
    for (let i = 0; i < count; i++) frag.appendChild(makeClone());
    layer.appendChild(frag);
    count *= 2;

    countText.textContent = String(count);
    countText.classList.add("badger-clone-show");
    emit("badger-clone:change", { count });
    if (count >= MAX) emit("badger-clone:full", { count });
  }

  function shake() {
    layer.classList.remove("badger-clone-shake");
    void layer.offsetWidth; // 연타해도 처음부터 다시 흔들리게
    layer.classList.add("badger-clone-shake");
  }

  // 분신 층을 배지 바로 밑에서 시작 (화면 크기가 바뀌면 다시 잼)
  function placeLayer() {
    const bottom = countText.getBoundingClientRect().bottom;
    layer.style.setProperty("--top", Math.max(0, Math.round(bottom + 6)) + "px");
  }
  placeLayer();
  window.addEventListener("resize", placeLayer);
  window.addEventListener("load", placeLayer); // 글씨체가 늦게 와서 제목 높이가 바뀌는 경우

  // 춤추는 오소리가 눌리면
  document.addEventListener("badger-dance:press", () => {
    if (stopped) {
      // 원래 오소리가 이어서 춤출 때 분신도 같이 (이번 터치는 늘리지 않음)
      stopped = false;
      root.classList.remove("badger-clone-stopped");
      return;
    }
    if (count >= MAX) {
      shake();
      return;
    }
    double();
  });

  // 종료 버튼 → 분신 전부 멈춤
  document.addEventListener("exit-button:press", () => {
    stopped = true;
    root.classList.add("badger-clone-stopped");
  });
})();
