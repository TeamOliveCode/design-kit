# Component Standard — the depth bar

> 모든 컴포넌트는 "done"이 되기 전에 이 바를 전부 통과해야 한다. 얕은 40개보다 **깊은 컴포넌트**가 목표.
> 참조: `apps/demo/src/components/ui/*`, 갤러리 `#/gallery`.

## 1. Anatomy (구조)
- `forwardRef` + `displayName`, `className` 패스스루(`cn()`), 나머지 props 스프레드.
- 합성형 — 서브컴포넌트를 함께 export (예: `Dialog` → `Dialog/Trigger/Content/Header/Title/Description/Footer`).
- 인터랙티브 컴포넌트는 **Radix UI**(`radix-ui` 통합 패키지) 위에 스타일만 입힌다. a11y를 손으로 짜지 않는다.

## 2. Tokens only
세만틱 토큰 유틸리티만 사용(`bg-*`/`text-*`/`border-*`/`ring-*`). **ad-hoc hex 금지.** dark/light는 토큰 스왑으로 자동 — `dark:` 변형 쓰지 않는다.

## 3. Variants × Sizes (cva)
- 의미 있는 곳엔 `cva`로 `variant`(default/secondary/outline/ghost/destructive 등) + `size`(sm/default/lg/icon).
- 합리적 `defaultVariants`. 타입은 `VariantProps`로 노출.

## 4. States (전 상태 필수)
default · **hover** · **focus-visible**(`ring-2 ring-ring ring-offset-2 ring-offset-background`) · active · **disabled**(`opacity-50 pointer-events-none`).
해당되면: **loading**(스피너+비활성), **invalid**(`aria-invalid` → `ring-destructive`), **checked/selected**, **open/expanded**.

## 5. Accessibility (품질 바닥선)
- 키보드 완전 동작(Tab/Arrow/Esc/Enter/Space), ARIA 역할·상태, focus trap/restore(오버레이), 가시적 focus.
- `prefers-reduced-motion` 존중, 히트 타깃 ≥ 충분, label 연결(`htmlFor`/`aria-label`), 대비 AA.

## 6. Motion
Radix `data-[state]` + `data-[side]`에 맞춘 **절제된** enter/exit(토큰 easing). scattered 효과 금지, reduced-motion 안전.

## 7. No AI smell
[F 표준](../design-system-scope.md#f-no-ai-smell-표준-1급-규칙-강제) 준수 — soft-pill 남발/카드 색띠/대시·가운뎃점/그라데이션/이모지 금지.

## 8. 문서화
갤러리(`#/gallery`)에 **모든 variant·size·state**를 light/dark 양쪽으로 전시. "보이지 않으면 done 아님."

---

## 인벤토리 (목표 ~40)

| 그룹 | 컴포넌트 |
|---|---|
| Forms | label · input✅ · textarea · select · checkbox · radio-group · switch · slider · field/form |
| Overlays | dialog · alert-dialog · sheet · popover · tooltip · dropdown-menu · command(⌘K) |
| Navigation | tabs · breadcrumb · pagination · accordion |
| Feedback | alert · toast · progress · skeleton · spinner · empty-state |
| Data | table · avatar · badge✅ · kbd · separator✅ · card✅ |
| Layout | scroll-area · aspect-ratio · collapsible |

✅ = 1차 슬라이스에 존재(일부는 깊이 표준으로 재정비 필요).
