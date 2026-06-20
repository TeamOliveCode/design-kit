# OliveKit — Design System Scope & Roadmap

> 이 문서가 "전체 지도"다. 지금 만든 건 일부일 뿐이라 헷갈리기 쉬우므로, **무엇이 시스템 전체이고 / 무엇이 끝났고 / 무엇이 남았는지**를 한 곳에서 관리한다.
> 상태 범례: ✅ 완료 · 🟡 부분 · ⬜ 미착수

핵심 원칙: **"대담함은 Kit 레벨에서 한 번만"** — 하우스 룩을 토큰/표준에 한 번 박제하고, 모든 서비스는 일관 적용만. 그리고 **절대 AI 냄새 금지**(아래 F 표준).

---

## 0. 3-레이어 아키텍처 (전체 골격)

| 레이어 | 내용 | 상태 |
|---|---|---|
| ① 프레임워크 독립 토큰 | DTCG 단일 소스 → CSS변수 / Tailwind @theme / JSON | 🟡 컬러·radius·폰트만 |
| ② 스택별 컴포넌트 어댑터 | React / Vue / Svelte / 서버렌더 / Python | 🟡 React만, 5개 |
| ③ Claude Code 통합 패키지 | CLAUDE.md · skill · registry · MCP | ⬜ 미착수 (이게 "전용"의 핵심) |

---

## A. Foundations (토큰) — 디자인 계약

- ✅ Color: primitive(olive/ink/red/amber/green) + 23 semantic, light/dark
- ✅ Radius: base 0.5rem + sm/md/lg/xl 스케일
- ✅ Type families: Hanken Grotesk(UI) + IBM Plex Mono(data)
- 🟡 **Type scale**: display-sm~2xl(size+line+tracking 일체형) ✅ / h1–h6·body·label·caption·code 역할 정리 남음
- ⬜ **Spacing scale**: 레이아웃 리듬용 시맨틱 spacing (현재는 Tailwind 기본 의존)
- 🟡 **Elevation/shadow**: `--shadow-card` ✅ / 전체 elevation 스케일 남음
- 🟡 **Motion**: `--ease-brand` ✅ / duration·named transitions·reduced-motion 정책 남음
- ⬜ **Z-index**, **breakpoints**, **opacity scale**, **border-width**
- ⬜ **Icon 표준**: lucide, 크기(16/20), stroke 굵기
- ⬜ **Focus ring 표준**, **Density 모드**(comfortable/compact)

## B. Surface Standards (화면 유형별 표준) ← 랜딩 포함, 가장 중요

> 같은 토큰, **다른 규칙**. 각 표준 = 레이아웃 규칙 + 쓸 컴포넌트/패턴 + 타입 스케일 사용법 + 모션 예산 + Do/Don't(+ AI 금지).

- 🟡 **App / Product UI** — 슬라이스 + [표준 문서](standards/app-ui.md) ✅. 컴포넌트 폭(테이블/사이드바 등) 확장 남음.
- 🟡 **Landing / Marketing** — 슬라이스(light: hero/bento/3-layer/CTA/footer) + [표준 문서](standards/landing.md) ✅. pricing·testimonial·faq 블록 남음.
- ⬜ **Auth / Onboarding** — 집중형, 중앙 정렬, 최소.
- ⬜ **Docs / Content / Editorial** — 읽기 최적화 장문 타입, 코드 블록.
- ⬜ **Empty / Loading / Error** (cross-cutting) — placeholder가 아니라 "디자인된" 상태.
- ⬜ (later) Email / 알림

## C. Components (빌딩 블록) — 현재 5 / 목표 ~50

- ✅ button, card, badge, input, separator
- ⬜ Forms: label, textarea, select, checkbox, radio, switch, slider, combobox, date-picker, form(validation), field
- ⬜ Overlays: dialog, alert-dialog, sheet, drawer, popover, tooltip, dropdown-menu, context-menu, hover-card, command(⌘K)
- ⬜ Navigation: tabs, breadcrumb, pagination, sidebar, navigation-menu, stepper
- ⬜ Feedback: toast, alert, banner, progress, spinner, skeleton, empty-state
- ⬜ Data: table, data-table(sort/filter/page), avatar, tag, stat, chart, calendar, code-block, kbd
- ⬜ Layout: accordion, collapsible, scroll-area, resizable, aspect-ratio, container/section
- ⬜ Marketing: hero, feature-grid, pricing-table, testimonial, logo-cloud, cta-section, faq, marketing-nav, footer

## D. Patterns / Recipes (검증된 조합)

- ⬜ Settings page · CRUD table · Auth screen · Dashboard shell · Detail page · Wizard · Search(⌘K) · Billing · Profile
- ⬜ Landing 섹션 레시피(hero→features→proof→pricing→faq→cta→footer)

## E. Content & Voice 표준 (카피도 디자인 재료)

- ⬜ Active voice, sentence case, 사용자 언어로 명명, error/empty 카피 규칙, 버튼 라벨 일관성, 톤
- ⬜ **AI 카피 tell 금지**: 대시(—)·가운뎃점(·) 남발, "Seamless/Effortless/Unlock/Elevate" 류 마케팅 클리셰

## F. "No AI Smell" 표준 (1급 규칙, 강제)

피해야 할 구체 tell (사용자 강조):
- ⬜ 한쪽 rounded border에 색칠(카드 상단/좌측 컬러 띠)
- ⬜ 대시(—), 가운뎃점(·) 구분자
- ⬜ soft-tint rounded-full pill 배지 남용(shadcn 기본 룩)
- ⬜ 보라/바이올렛 그라데이션, 흰 배경 위 그라데이션, glassmorphism 도배
- ⬜ "큰 숫자 + 작은 라벨 + 그라데이션" 히어로 템플릿
- ⬜ 남용 폰트(Inter/Roboto/Geist/Space Grotesk/system), 이모지 장식
- ⬜ scattered 애니메이션(ping/fade 도배) — "less is more"
- ⬜ 완벽 대칭 3-카드 피처 그리드, 중앙 히어로+버튼 2개 템플릿

→ 이 목록을 ③ 통합층(CLAUDE.md/skill)에 negative-constraint로 박제해 Claude Code가 매번 강제.

## G. Accessibility & 품질 바닥선

- ⬜ 대비 AA, focus-visible, 키보드 내비, reduced-motion, 히트 타깃, semantic HTML, RTL — 모든 컴포넌트/표준 통과 체크리스트

## H. Theming / Multi-brand

- ✅ light/dark (토큰 스왑)
- ⬜ 서비스별 accent 테마(공유 primitive 위), 브랜드 preset

## I. Multi-stack Delivery (레이어 ②)

- ✅ React + Tailwind v4
- ⬜ Vue/Nuxt, Svelte, 서버렌더(Rails/Django/Laravel: plain CSS변수 + 유틸/partial), Python/Streamlit theming — 전부 **같은 토큰** 소비, 컴포넌트만 재구현

## J. Claude Code 통합 (레이어 ③) — 미착수, "전용"의 본질

- ⬜ CLAUDE.md 디자인 규칙(하우스 표준 + F의 AI 금지 리스트)
- ⬜ frontend-design Skill fork/invert("하우스 시스템 적용") + surface별 가이드
- ⬜ private shadcn registry(컴포넌트+토큰+rules 배포) + namespaced(@olivekit/*)
- ⬜ shadcn MCP 연결(자연어 browse/install) + output-style

## K. Governance / 채택

- ⬜ 토큰·컴포넌트 semver + changelog
- ⬜ 신규 서비스 1-커맨드 채택(registry add / preset)
- ⬜ 기여 규칙·리뷰, 비주얼 회귀(스크린샷) 테스트
- ⬜ 살아있는 문서 사이트(모든 컴포넌트 + surface 표준 쇼케이스)

---

## 권장 진행 순서 (제안)

1. **Surface 표준 골격 + App-UI 표준 성문화**(방금 슬라이스를 규칙으로) + **Landing 표준 작성 & 랜딩 슬라이스** ← 사용자 요청
2. **Foundations 완성**(type scale·spacing·elevation·motion) — 표준이 의존하므로
3. **③ Claude Code 통합층**(CLAUDE.md + skill + registry) — 일관성 강제의 본체
4. **컴포넌트 확장** + **Patterns**
5. **②의 2번째 스택**(Vue 또는 서버렌더) — 멀티스택 증명
6. Governance + 문서 사이트
