# 빈 앱

아무것도 없는 앱에서 시작해서, 유튜브 댓글로 고른 기능을 하나씩 추가하는 프로젝트입니다.

## 파일 구조

```
index.html              화면 뼈대 (기능마다 <section> 하나)
style.css               앱 전체 공통 스타일
script.js               앱 전체 공통 코드 + 기능 추가 규칙
CHANGELOG.md            에피소드별 기능 기록
features/
  app-title/            EP.3 앱 제목 ΣΧΟΛΙΑ (탭 이름 + 화면 맨 위 <h1>)
    app-title.css
    app-title.js        제목 누르면 글씨체 바뀜, "app-title:set" 으로 제목 바꾸기, 누르면 "app-title:press"
    *.woff2             제목 글씨체 6개 (GFS Didot, Press Start 2P, Mansalva,
                        Tektur, Comfortaa, Sofia Sans Extra Condensed / 그리스 문자만)
    OFL-*.txt           글씨체 라이선스 (SIL OFL 1.1, 지우지 말 것)
  badger/               EP.1 벌꿀오소리 그림 (EP.2부터 안 씀, 기록용)
    badger.css
    badger.webp
  badger-dance/         EP.2 춤추는 벌꿀오소리 (종료 버튼 → 멈춤, 오소리 누르면 → 이어서 춤)
    badger-dance.css
    badger-dance.js
    badger-dance.webp   16프레임 가로 한 줄 스프라이트
  exit-button/          EP.1 종료 버튼 (누르면 흔들림)
    exit-button.css
    exit-button.js
```

## 새 기능 추가하는 법

1. `features/기능이름/` 폴더를 만들고 `.css`, `.js`, 필요한 이미지를 넣습니다.
2. `index.html`에 추가합니다.
   - `<head>` 안: `<link rel="stylesheet" href="features/기능이름/기능이름.css">`
   - `<main>` 안: `<section id="기능이름" class="feature"> ... </section>`
   - 맨 아래 (JS가 있으면): `<script src="features/기능이름/기능이름.js"></script>`
3. `CHANGELOG.md`에 기록합니다.

### 서로 안 부딪히게 하는 규칙

- JS는 `(() => { ... })();`로 감쌉니다.
- CSS 선택자는 `#기능이름`으로 시작하고, 클래스·애니메이션 이름에 `기능이름-`을 붙입니다.
- 클릭 이벤트는 `document`나 `body`가 아니라 자기 `section` 안에만 겁니다.
- 이미지는 `.webp`로, 가로 600px 안팎으로 줄여서 넣습니다. (여러 프레임을 이은 스프라이트는 한 칸 기준)
- 다른 기능에 신호를 줄 때는 `CustomEvent`를 씁니다. 예: 종료 버튼은 눌릴 때 `exit-button:press`를, 제목은 눌릴 때 `app-title:press`를 보냅니다. 제목을 바꾸려면 `app-title:set`을 보냅니다.

## 배포

VS Code에서 Commit → Sync 하면 Vercel에 자동 반영됩니다.
