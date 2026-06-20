# Standard — No AI Smell (Anti-Pattern Checklist)

> 1급 강제 규칙. 빌드 후 출시 전, 이 목록으로 **자가 감사**한다. 출처는 최근 공개된 anti-slop 가이드/스킬 종합(하단).
> 측정은 가능하면 **결정론적 DOM/CSS 체크**(Playwright)로 — LLM 시각 점수는 편향됨.

## 0. 두 개의 지문 (가장 흔한 AI 신호)
- **shadcn 기본 룩 그대로** (기본 zinc + 기본 radius + soft-pill + icon-top 카드). → 토큰으로 *우리 것*으로 만든다.
- **Glassmorphism** (frosted-glass 카드, 과한 backdrop-blur 도배).

## 1. Typography
- ❌ Inter · Roboto · Arial · Open Sans · Montserrat · Geist · Space Grotesk · Instrument Serif (세대 간 수렴 폰트). 하나의 의도적 페어링에 commit.
- ❌ 본문 한 줄에 serif-italic 한 단어 악센트.
- ❌ **all-caps 헤딩/섹션 라벨 도배.** 정말 필요한 마이크로 라벨만, 그마저 sentence-case 우선.
- ❌ em-dash(—)·가운뎃점(·). → 쉼표/콜론/괄호/하이픈.
- ✅ measure 65–75자, body line-height ~1.5, 숫자는 tabular-nums, uppercase 쓸 땐 letter-spacing.

## 2. Color & Contrast
- ❌ "VibeCode 퍼플"(라벤더-퍼플), 흰 배경 위 퍼플/블루 그라데이션, blue→약간-다른-blue 저대비 그라데이션.
- ❌ 순수 `#000`/`#fff`. → OKLCH, neutral을 brand hue로 살짝 tint(우리 ink가 이미 그렇게 함).
- ❌ 그라데이션 도배, 큰 컬러 glow/box-shadow.
- ❌ 다크모드 저대비 회색 본문(WCAG AA 미달). ✅ body 4.5:1, 큰 헤딩 3:1.
- ✅ product UI는 색 절제, marketing은 더 강하게(같은 토큰, 다른 표준).

## 3. Layout & Components
- ❌ **카드 한쪽 모서리 컬러 띠**(좌측 3–4px stripe = em-dash급 AI 신호). 상단 띠도 동일.
- ❌ **badge/kicker 가 H1 바로 위**(decorative text strip). 헤드라인이 리드하게.
- ❌ **icon-top 동일 카드 반복**(특히 대칭 3-카드 피처/스텝). → 하나의 primitive를 *의도적으로* 변주, asymmetric bento + dominant anchor.
- ❌ 중앙 정렬 generic sans 히어로, 숫자 스텝(01/02/03), stat banner row 반복, 이모지 nav 아이콘.
- ❌ 모든 걸 카드로 감싸기(대시보드). → spacing·border·typography로 그룹핑.
- ❌ fake product mockup, floating icon pill, generic "BETA" 배지, scroll-arrow, floating stamp.
- ✅ 그리드 빈 셀 없게, 모바일에서 hierarchy 유지.

## 4. Motion
- ❌ `transition: all`. ✅ **transform·opacity만** 애니메이트(width/height/margin/top/left 금지).
- ✅ 120–250ms, custom cubic-bezier(우리 `--ease-brand`), entrance에 ease-in 금지.
- ✅ 고빈도 액션은 즉각(애니메이션 X), `prefers-reduced-motion` 존중, 효과는 scattered 금지(오케스트레이션 1개).

## 5. Spacing & Nav
- ✅ 헤더 < 80px, 한 줄. CTA 줄바꿈 금지·스크롤 없이 보이게. 헤드라인 ≤ 2줄, 보조문 ≤ 20단어.

## 6. Copy (카피도 디자인 재료)
- ❌ 금지어: leverage · elevate · unlock · navigate · robust · seamless · transformative · effortless · pivotal · paradigm.
- ❌ throat-clearing 도입부, binary contrast 선언("not X, but Y"), 극적 단편("Three words."), significance inflation, gerund 뭉치(highlighting/showcasing/fostering/leveraging/ensuring), synonym cycling, 아무 글에나 붙는 일반적 마무리.
- ❌ **cadence uniformity** — 연속 3문장 같은 길이 금지(하나는 리듬 깨기).
- ✅ 첫 문장에 정보(숫자·이름·날짜), 섹션당 시각 아이디어 1개, 중복 CTA 의도 제거, read-aloud 테스트.

## 7. Quality Gates
- ✅ empty/loading/error 상태 디자인, semantic HTML, a11y(focus-visible·ARIA·label·키보드·대비 AA), React 안정 key, 레이아웃 반복 금지.

## 8. 강제 방법
- **결정론적 감사**: Playwright로 DOM/CSS 룰 체크(컬러 stripe, all-caps 비율, `transition:all`, 폰트, 대비). LLM 시각 점수보다 신뢰.
- **Vercel `web-design-guidelines` 스킬**(`vercel-labs/agent-skills`) — 11개 카테고리 100+ 룰의 공식 UI 감사 스킬. ③ Claude Code 통합층에서 채택/연동 대상.
- **2-pass 자가비평**(frontend-design Skill): 토큰 플랜 → 이 목록 대비 비평 → 코드.

## 출처 (2025–2026)
- Developers Digest — "AI Design Slop: 16 Patterns" — https://www.developersdigest.tech/blog/ai-design-slop-and-how-to-spot-it
- Elkholy — "Anti-Slop Framework for AI Frontend Craftsmanship" — https://moelkholy1995.medium.com/beyond-make-it-beautiful-the-anti-slop-framework-for-ai-frontend-craftsmanship-c99bbee6c994
- Gaurav Tiwari — "Stop AI Slop: Skill & Checklist" — https://gauravtiwari.org/stop-slop-ai-slop/
- Vercel — `web-design-guidelines` skill — https://github.com/vercel-labs/agent-skills/blob/main/skills/web-design-guidelines/SKILL.md
- Anthropic — frontend-aesthetics cookbook — https://platform.claude.com/cookbook/coding-prompting-for-frontend-aesthetics
- prg.sh — "Why Your AI Keeps Building the Same Purple Gradient Website" — https://prg.sh/ramblings/Why-Your-AI-Keeps-Building-the-Same-Purple-Gradient-Website
