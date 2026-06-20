# Surface Standard — App / Product UI

> 밀도 높은 운영 화면. 참조 구현: `apps/demo/src/App.tsx` (Experiments 콘솔).
> 같은 토큰을 쓰지만 [Landing 표준](./landing.md)과 **규칙이 다르다**.

## 언제
대시보드, 데이터 테이블, 설정, 내부 툴, 콘솔 — "조작하는" 화면.

## 모드
**Dark-first.** light는 `.dark` 토글로 토큰 스왑(무료). 콘텐츠 중심 화면이 아닌 한 dark 기본.

## 레이아웃
- 중앙 정렬 `max-w-[1180px]`, 좌우 `px-6`.
- Sticky 상단바: `border-b border-border` + `bg-background/80 backdrop-blur`, 높이 56px.
- **밀도는 페이지당 하나로 통일**: comfortable(`p-5`/`gap-6`/`text-sm`) 또는 compact(`p-4`/`gap-3`). 섞지 말 것.

## 타입
- UI = Hanken Grotesk. **데이터는 전부 IBM Plex Mono** — ID, 숫자, duration, timestamp, metric, 모델명, code, kbd.
- 페이지 타이틀 `text-2xl font-extrabold tracking-tight`. 본문 `text-sm`. 숫자 `font-mono tabular-nums`.

## 색 / 악센트
- ink 중립색이 95%를 운반. **olive(primary)는 절제** — primary 액션, active nav 밑줄, live/running, 핵심 metric 1개에만.
- 악센트는 **하나**. 서로 경쟁시키지 말 것.
- 표면은 토큰으로만: `bg-background`·`bg-card`·`text-foreground`·`text-muted-foreground`·`border-border`. ad-hoc hex 금지.

## 상태(status) 표기
**dot + 평문 텍스트** (`size-1.5 rounded-full` + 색 + 라벨). soft-tint `rounded-full` pill 남용 금지(= AI 룩).

## 먼저 집는 컴포넌트
Card · Table · Button · Input · Separator · (예정) Tabs · Sheet · DropdownMenu · Dialog · AlertDialog(파괴적 확인) · Command(⌘K). Badge는 정말 필요할 때만.

## 모션
최소. 라이브 펄스 최대 1개. 나머지는 hover transition만. reduced-motion 존중.

## Do / Don't
- ✅ 빽빽하지만 정렬된 그리드, mono 데이터, 조용한 중립색, 단일 올리브 악센트, dot 상태.
- ❌ 카드 한쪽 모서리에 컬러 띠, 대시(—)·가운뎃점(·), soft-pill 남발, 그라데이션/glassmorphism, 다중 악센트, 카드 안의 카드 안의 카드, 빈/로딩/에러 상태 방치, scattered 애니메이션.

→ 빌드 후 [No AI Smell 체크리스트](../design-system-scope.md#f-no-ai-smell-표준-1급-규칙-강제)로 자가 검증.
