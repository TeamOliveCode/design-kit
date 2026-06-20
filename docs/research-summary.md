# Claude Code 전용 Design Kit — 리서치 요약 (2026-06-20)

> Deep-research 하니스(107 에이전트, 25 소스, 검증된 finding 24/25)의 압축본.
> 대부분 1차 자료 기반 high confidence. 원본 raw 출력은 별도 보관(`tasks/wwg8bz2gr.output`, tmp).

## 한 줄 결론

멀티스택에서 공유 가능한 건 **컴포넌트가 아니라 "디자인 계약(토큰)"과 "규칙(rules)" 뿐**이다.
→ **3층 아키텍처**가 유일하게 현실적이며, 각 층 도구는 이미 성숙(2025.10~2026). 단 "하나의 잘 빠진 룩"은
도구가 못 만든다 — 하우스 미감을 **한 번** 정의하면 3층이 전 스택에 복제·강제한다.

## 설계를 지배하는 재프레이밍

설치된 두 공식 skill이 정반대를 지향한다:

| | Anthropic `frontend-design` | Vercel `shadcn` Design Direction |
|---|---|---|
| 목표 | 프로젝트마다 distinctive | 모든 화면 일관성 |
| 최적화 | 일관성의 반대(차별화) | 차별화의 반대(일관성) |

우리는 후자(일관성)를 원하지만 전자의 품질 기준(제네릭 탈피)은 못 버린다.
→ **"대담함"을 프로젝트마다 쓰지 말고 Design Kit에서 단 한 번 쓴다.**

## 3층 아키텍처

### ① 프레임워크 독립 토큰 레이어 — 바닥, 전 스택 공유
- 단일 소스: **DTCG JSON** (W3C Design Tokens, 2025.10 첫 stable). `primitive → semantic` 2계층.
- 빌드: **Style Dictionary v4**(가장 성숙, plain CSS/SCSS 출력으로 서버렌더/Python까지 도달) 주력 + **Terrazzo**(Tailwind v4 `@theme`, 네이티브) 보조.
- 출력: **CSS 변수**(★전 스택 공통어), Tailwind v4 `@theme`, JS/TS, 네이티브.
- ⚠️ 함정: DTCG 2025.10은 stable이나 도구 풀지원은 진행 중(SD는 v5, Terrazzo는 2.0). "W3C 표준" 아님(Community Group Final Report). 버전 고정 + 분기별 재검증. Tailwind v4 `@theme`는 tree-shaking → 전체 방출엔 `@theme static`.

### ② 스택별 컴포넌트 어댑터 — 공유 안 됨, 스택마다 따로
- 배포 전송: **shadcn registry**(JSON-over-HTTP면 어떤 프레임워크로도 호스팅). private registry(`@yourco/...`+Bearer) + `registry:base`로 컴포넌트+CSS변수+폰트+config+**rules까지** 한 방에.
- ⚠️ 가장 큰 함정: framework-agnostic은 **전송/호스팅 차원일 뿐, 컴포넌트 구현은 스택마다 분리**(React=shadcn/ui, Vue=shadcn-vue…). "headless 하나로 전 프레임워크 공유"는 환상. 공유되는 건 토큰·rules·전송뿐.

### ③ Claude Code 통합 패키지 — "전용"을 만드는 층
- **`<frontend_aesthetics>` 제약 블록**(Anthropic 공식 cookbook): Claude의 'AI slop' 수렴을 공식 인정, system prompt/CLAUDE.md에 append 처방. → 하우스 룩(양성) + 금지 리스트(음성).
- 금지 리스트(공식): Inter/Roboto/Arial/Open Sans 등 남용 폰트, 흰 배경 보라 그라데이션, 예측가능 레이아웃, Space Grotesk 수렴 + frontend-design 3대 클리셰(크림+세리프+테라코타 / 검정+형광 / 신문+radius0).
- **frontend-design Skill을 fork해 목표를 뒤집기**(distinctive→하우스 일관 적용). 2-pass와 self-critique는 계승.
- **shadcn MCP**를 사내 registry에 연결 → Claude Code가 자연어로 컴포넌트 browse/search/install.
- 효과적 조합 = 토큰 컨텍스트 주입 + MCP registry + fork된 Skill + CLAUDE.md rules.

## 솔직한 갭 (직접 풀어야)

- 서버렌더(Rails/Django/Laravel)·Python/Streamlit 토큰 주입의 검증된 베스트프랙티스 없음 → 우리가 패턴화.
- v0/Lovable/bolt의 일관성 강제 메커니즘은 블로그 수준만 확보 → 참고만.
- Figma Dev Mode MCP·21st.dev Magic 등 다른 조합의 실효성 미검증.

## 핵심 1차 소스

- Anthropic frontend-aesthetics cookbook — https://github.com/anthropics/claude-cookbooks/blob/main/coding/prompting_for_frontend_aesthetics.ipynb
- frontend-design SKILL — https://github.com/anthropics/claude-code/blob/main/plugins/frontend-design/skills/frontend-design/SKILL.md
- DTCG 2025.10 — https://www.designtokens.org/tr/2025.10/format/
- Style Dictionary DTCG — https://styledictionary.com/info/dtcg/
- Terrazzo (Tailwind v4) — https://terrazzo.app/docs/integrations/tailwind/
- shadcn registry — https://ui.shadcn.com/docs/registry
- shadcn MCP — https://ui.shadcn.com/docs/mcp
- Tailwind v4 — https://tailwindcss.com/blog/tailwindcss-v4
