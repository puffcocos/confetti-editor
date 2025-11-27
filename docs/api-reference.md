# API 레퍼런스

## useConfetti

confetti를 프로그래밍 방식으로 제어하는 React 훅입니다.

### Import

```tsx
import { useConfetti } from '~/shared/confetti/use-confetti'
```

### 반환값

```typescript
{
  fire: (options?: ConfettiOptions | ConfettiOptions[]) => void
  createShape: (options: ShapeFromPathOptions) => Shape
  setConfettiCanvasRef: (canvas: HTMLCanvasElement | null) => void
}
```

#### `fire`

confetti 효과를 실행하는 함수입니다.

**파라미터:**

- `options?: ConfettiOptions | ConfettiOptions[]` - confetti 옵션 (단일 또는 배열)

**예제:**

```tsx
const { fire } = useConfetti()

// 기본 옵션으로 실행
fire()

// 커스텀 옵션으로 실행
fire({ particleCount: 200, spread: 180 })

// 여러 효과를 배열로 실행 (순차적으로 실행됨)
fire([
  { particleCount: 100, angle: 60, origin: { x: 0 } },
  { particleCount: 100, angle: 120, origin: { x: 1 } },
])
```

#### `createShape`

SVG Path로부터 커스텀 파티클 모양을 생성합니다.

**파라미터:**

- `options: ShapeFromPathOptions`
  - `path: string` - SVG path 문자열
  - `matrix?: number[]` - 선택적 transform matrix (성능 최적화)

**반환:**

- `Shape` - canvas-confetti의 Shape 객체

**예제:**

```tsx
const { fire, createShape } = useConfetti()

const heart = createShape({
  path: 'M5 2 C5 0.5 6 0 7 0 C8 0 9 1 9 2.5 C9 4 7.5 6 5 8 C2.5 6 1 4 1 2.5 C1 1 2 0 3 0 C4 0 5 0.5 5 2z',
})

fire({ shapes: [heart], particleCount: 50 })
```

#### `setConfettiCanvasRef`

특정 canvas 요소에서만 confetti를 렌더링하도록 설정하는 ref setter 함수입니다.

**파라미터:**

- `canvas: HTMLCanvasElement | null` - canvas 요소 또는 null (전역 canvas로 복귀)

**예제:**

```tsx
const { fire, setConfettiCanvasRef } = useConfetti()

return (
  <div>
    <canvas ref={setConfettiCanvasRef} width={800} height={600} />
    <button onClick={() => fire()}>발사!</button>
  </div>
)
```

---

## ConfettiOptions

canvas-confetti의 모든 옵션을 지원합니다. 주요 옵션:

### 기본 옵션

| 옵션                      | 타입                       | 기본값                 | 설명                              |
| ------------------------- | -------------------------- | ---------------------- | --------------------------------- |
| `particleCount`           | `number`                   | `50`                   | 생성할 파티클 개수                |
| `angle`                   | `number`                   | `90`                   | 발사 각도 (도)                    |
| `spread`                  | `number`                   | `45`                   | 파티클 퍼짐 정도 (도)             |
| `startVelocity`           | `number`                   | `45`                   | 초기 속도 (픽셀/프레임)           |
| `decay`                   | `number`                   | `0.9`                  | 감속 비율 (0-1)                   |
| `gravity`                 | `number`                   | `1`                    | 중력 강도                         |
| `drift`                   | `number`                   | `0`                    | 좌우 이동 정도                    |
| `ticks`                   | `number`                   | `200`                  | 애니메이션 지속 시간 (프레임)     |
| `origin`                  | `{ x: number, y: number }` | `{ x: 0.5, y: 0.5 }`   | 발사 위치 (0-1)                   |
| `colors`                  | `string[]`                 | `undefined`            | 파티클 색상 배열 (hex)            |
| `shapes`                  | `(Shape \| string)[]`      | `['square', 'circle']` | 파티클 모양                       |
| `scalar`                  | `number`                   | `1`                    | 파티클 크기 배율                  |
| `zIndex`                  | `number`                   | `100`                  | z-index 값                        |
| `disableForReducedMotion` | `boolean`                  | `false`                | 접근성: 애니메이션 감소 모드 대응 |

### 전체 타입 정의

```typescript
import type { ConfettiOptions } from '~/shared/confetti/types'

// 또는 직접 import
import type { Options as ConfettiOptions } from 'canvas-confetti'
```

---

## 타입

프로젝트에서 사용하는 모든 타입은 `~/shared/confetti/types.ts`에서 re-export됩니다.

### Import

```tsx
import type {
  ConfettiOptions,
  Shape,
  CreateTypes,
  GlobalOptions,
  Origin,
} from '~/shared/confetti/types'
```

### 주요 타입

#### `ConfettiOptions`

canvas-confetti의 `Options` 타입의 별칭입니다.

#### `Shape`

커스텀 파티클 모양을 나타내는 타입입니다. `createShape` 함수가 반환합니다.

#### `CreateTypes`

`confetti.create()`가 반환하는 커스텀 confetti 인스턴스의 타입입니다.

#### `Origin`

발사 위치를 나타내는 타입입니다.

```typescript
type Origin = {
  x?: number // 0-1 범위 (0: 왼쪽, 1: 오른쪽)
  y?: number // 0-1 범위 (0: 위, 1: 아래)
}
```

---

## 성능 최적화

### useCallback과 함께 사용

`fire` 함수는 이미 `useCallback`으로 메모이제이션되어 있어 안전하게 의존성 배열에 추가할 수 있습니다.

```tsx
const { fire } = useConfetti()

const handleSuccess = useCallback(() => {
  fire({ particleCount: 100 })
}, [fire]) // ✅ 안전
```

### Ref 기반 구현

`useConfetti`는 내부적으로 `useRef`를 사용하여 불필요한 리렌더링을 방지합니다.

```tsx
// ✅ canvas 설정 시 리렌더링 없음
const { setConfettiCanvasRef } = useConfetti()
```

---

## 다음 단계

- [프리셋 가이드](./presets.md) - 기본 프리셋 사용법
- [커스텀 파티클](./custom-shapes.md) - SVG 기반 커스텀 모양
- [예제 모음](./examples.md) - 실전 예제
