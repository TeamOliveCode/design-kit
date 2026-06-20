# Surface Standard — Landing / Marketing

> 설득하는 화면(운영 아님). 참조 구현: `apps/demo/src/Landing.tsx` (OliveKit 랜딩, `#/landing`).
> [App UI 표준](./app-ui.md)과 **같은 토큰, 다른 규칙**.

## 언제
랜딩, 제품 소개, 가격, 소개(about) — 방문자를 설득하는 화면.

## 모드
**Light-dominant editorial 기본.** (캠페인에 따라 dark 허용.) 어둡고 빽빽한 앱과 의도적으로 대비.

## 레이아웃
- `Container` `max-w-[1140px]` + `px-6`. `Section` 세로 리듬 `py-20 sm:py-28`.
- **넉넉한 여백**이 핵심 — 앱보다 훨씬 숨통을 틔운다.

## 타입
- 헤딩 = **display 스케일**(`text-display-sm` ~ `text-display-2xl`). 크고, tracking은 토큰에 내장(별도 `tracking-tight` 금지).
- 본문 `text-base`/`text-lg leading-relaxed`. code/install/워드마크는 mono.

## 색 / 악센트
- olive를 앱보다 **더** 아낀다 — eyebrow rule, primary CTA, 마크 1~2개.
- 중립색 + `bg-card` 표면(`shadow-card`)이 깊이를 운반.

## Hero 표준 (★ AI 클리셰 회피의 핵심)
- **비대칭**: 텍스트 + **시그니처 아티팩트 1개**. "중앙 헤드라인 + 그라데이션 + 버튼 2개" 템플릿 금지.
- 아티팩트는 **진짜/온브랜드** (여기선 *디자인 시스템을 그 자체로* 보여줌 — 팔레트 + 렌더된 컴포넌트 + 토큰 라인). 스톡 일러스트 금지.
- "큰 숫자 + 작은 라벨 + 그라데이션" 히어로 금지.

## 섹션
- eyebrow + 헤딩 + 보조문 패턴.
- 피처는 **의도적 bento/editorial** — 대칭 3-아이콘-카드 그리드 금지(전형적 AI). 비대칭 span으로.
- proof는 **조용히** — 가짜 로고 대신 절제된 워드마크/지표.
- CTA는 페이지당 명확히 하나.

## 모션 예산
오케스트레이션된 진입 **최대 1개**(`--ease-brand` fade-up). reduced-motion 존중. scattered 효과 금지.

## 컴포넌트
`Container` · `Section` · `Eyebrow` + `Button`/`Card` + (예정) hero·feature·pricing·testimonial·faq·footer 블록.

## Do / Don't
- ✅ 큰 display 타입, 넉넉한 여백, 절제된 올리브, 비대칭 히어로/bento, 온브랜드 아티팩트, 조용한 proof.
- ❌ 보라/그라데이션 히어로, 대칭 3카드, 큰숫자 히어로, 이모지, 대시(—)·가운뎃점(·), "Seamless/Effortless/Unlock/Elevate" 류 마케팅 클리셰 카피, 카드 색띠.

→ 빌드 후 [No AI Smell 체크리스트](../design-system-scope.md#f-no-ai-smell-표준-1급-규칙-강제)로 자가 검증.
