// ===== EP.3: 앱 제목 (그리스 문자) =====
// 화면 맨 위 <h1> 과 브라우저 탭 이름(<title>)을 같은 제목으로 맞춥니다.
// ΣΧΟΛΙΑ = 그리스어로 "댓글"
// 제목을 누르면 글씨체가 차례대로 바뀝니다.
// (고전 Didot → 픽셀 게임 → 붓글씨 → 로봇 → 동글동글 → 홀쭉이 → 처음으로)
//
// 제목 글자를 바꿀 때는 index.html 두 군데(<title>, <h1>)만 고치면 됩니다.
// 글씨체를 늘릴 때는 FONTS 에 이름을 넣고, app-title.css 에 .app-title-font-이름 을 추가합니다.
//
// ----- 다음 기능을 위한 연결 고리 -----
// 1. 제목 바꾸기: 다른 기능에서 아래 신호를 보내면 <h1> 과 탭 이름이 같이 바뀝니다.
//      document.dispatchEvent(new CustomEvent("app-title:set", { detail: { text: "새 제목" } }));
// 2. 제목 눌림: 제목을 누르면 "app-title:press" 신호를 보냅니다. (detail.font = 바뀐 글씨체 이름)
//      document.addEventListener("app-title:press", (e) => { ... });

(() => {
  const root = document.getElementById("app-title");
  if (!root) return; // 이 기능이 index.html 에서 빠져도 다른 기능은 정상 작동

  const heading = root.querySelector(".app-title-text");
  const FONTS = ["didot", "pixel", "brush", "robot", "round", "tall"];
  let fontIndex = 0;

  function setTitle(text) {
    heading.textContent = text;
    document.title = text;
  }

  function setFont(i) {
    FONTS.forEach((name) => heading.classList.remove("app-title-font-" + name));
    heading.classList.add("app-title-font-" + FONTS[i]);
  }

  // 처음 상태: 탭 이름을 화면 제목과 맞추고, 첫 번째 글씨체
  setTitle(heading.textContent.trim());
  setFont(fontIndex);

  // 다른 기능이 제목을 바꾸고 싶을 때
  document.addEventListener("app-title:set", (e) => {
    const text = e.detail && typeof e.detail.text === "string" ? e.detail.text.trim() : "";
    if (text) setTitle(text);
  });

  // 제목 누르면 → 다음 글씨체 + 살짝 튕김 + 신호 보내기
  heading.addEventListener("click", () => {
    fontIndex = (fontIndex + 1) % FONTS.length;
    setFont(fontIndex);

    heading.classList.remove("app-title-pop");
    void heading.offsetWidth; // 연타해도 처음부터 다시 튕기게
    heading.classList.add("app-title-pop");

    root.dispatchEvent(new CustomEvent("app-title:press", {
      bubbles: true,
      detail: { font: FONTS[fontIndex] },
    }));
  });
})();
