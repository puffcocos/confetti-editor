# 프리셋 가이드

프리셋은 미리 정의된 confetti 효과 조합입니다. 바로 사용할 수 있는 8가지 기본 프리셋을 제공합니다.

## 기본 프리셋

### Import

```tsx
import { confettiPresets } from '~/shared/confetti/presets'
import { useConfetti } from '~/shared/confetti/use-confetti'
```

### 사용 가능한 프리셋

#### 1. celebration (축하)

생일, 기념일 등 축하할 때 사용하는 기본 프리셋입니다.

```tsx
const { fire } = useConfetti()
fire(confettiPresets.celebration)
```

**효과:**

- 중앙에서 양쪽으로 퍼지는 효과
- 다양한 색상
- 적당한 파티클 수

---

#### 2. fireworks (불꽃놀이)

화려한 불꽃놀이 효과입니다.

```tsx
fire(confettiPresets.fireworks)
```

**효과:**

- 여러 방향에서 동시에 발사
- 높은 초기 속도
- 폭발하는 듯한 시각 효과

---

#### 3. snow (눈)

부드럽게 떨어지는 눈 효과입니다.

```tsx
fire(confettiPresets.snow)
```

**효과:**

- 흰색 파티클
- 천천히 떨어지는 애니메이션
- 좌우로 흔들리는 움직임

---

#### 4. stars (별)

별이 쏟아지는 효과입니다.

```tsx
fire(confettiPresets.stars)
```

**효과:**

- 별 모양 파티클
- 다양한 금색 톤
- 위에서 아래로 떨어지는 효과

---

#### 5. cannon (대포)

왼쪽에서 오른쪽으로 발사되는 대포 효과입니다.

```tsx
fire(confettiPresets.cannon)
```

**효과:**

- 양쪽 끝에서 중앙을 향해 발사
- 강한 초기 속도
- 대칭적인 효과

---

#### 6. pride (프라이드)

무지개 색상의 프라이드 플래그 효과입니다.

```tsx
fire(confettiPresets.pride)
```

**효과:**

- 무지개 색상
- 여러 방향 동시 발사
- 화려한 시각 효과

---

#### 7. burst (폭발)

중앙에서 사방으로 폭발하는 효과입니다.

```tsx
fire(confettiPresets.burst)
```

**효과:**

- 360도 전방향 발사
- 높은 파티클 수
- 폭발하는 듯한 임팩트

---

#### 8. schoolPride (학교 프라이드)

학교 색상(파랑+금색)을 사용한 프리셋입니다.

```tsx
fire(confettiPresets.schoolPride)
```

**효과:**

- 파랑과 금색 조합
- 양쪽에서 발사
- 학교 행사에 적합

---

## 커스텀 프리셋

여러 효과를 배열로 조합하여 나만의 프리셋을 만들 수 있습니다.

### 기본 사용법

```tsx
const { fire } = useConfetti()

const myCustomPreset = [
  { particleCount: 50, angle: 60, origin: { x: 0 } },
  { particleCount: 50, angle: 120, origin: { x: 1 } },
]

fire(myCustomPreset)
```

### 예제: 연속 폭발

```tsx
const continuousBurst = [
  { particleCount: 100, spread: 360, origin: { x: 0.3, y: 0.5 } },
  { particleCount: 100, spread: 360, origin: { x: 0.5, y: 0.5 } },
  { particleCount: 100, spread: 360, origin: { x: 0.7, y: 0.5 } },
]

fire(continuousBurst)
```

### 예제: 색상 변화 효과

```tsx
const colorWave = [
  { particleCount: 50, colors: ['#ff0000'], origin: { x: 0, y: 0.5 } },
  { particleCount: 50, colors: ['#00ff00'], origin: { x: 0.33, y: 0.5 } },
  { particleCount: 50, colors: ['#0000ff'], origin: { x: 0.66, y: 0.5 } },
  { particleCount: 50, colors: ['#ffff00'], origin: { x: 1, y: 0.5 } },
]

fire(colorWave)
```

---

## 프리셋 수정하기

기존 프리셋을 복사하여 수정할 수 있습니다.

```tsx
const customCelebration = confettiPresets.celebration.map((effect) => ({
  ...effect,
  particleCount: effect.particleCount * 2, // 파티클 2배
  colors: ['#ff0000', '#00ff00'], // 색상 변경
}))

fire(customCelebration)
```

---

## 프리셋 저장하기

미리보기 페이지에서 프리셋을 로컬 스토리지에 저장할 수 있습니다.

### 웹 UI에서 저장

1. `/preview` 페이지 접속
2. 원하는 옵션 설정
3. "프리셋에 추가" 버튼 클릭
4. 프리셋 이름 입력 후 "커스텀 프리셋 저장" 클릭

### 코드로 저장

```tsx
import { useLocalStorage } from '~/hooks/use-local-storage'

function MyComponent() {
  const [savedPresets, setSavedPresets] = useLocalStorage('my-presets', [])

  const savePreset = (name: string, options: ConfettiOptions[]) => {
    setSavedPresets([...savedPresets, { name, options }])
  }

  return (
    <button onClick={() => savePreset('my-preset', [{ particleCount: 100, spread: 70 }])}>
      프리셋 저장
    </button>
  )
}
```

---

## 프리셋 타이밍 조절

프리셋의 각 효과를 순차적으로 실행하려면 `setTimeout`을 사용합니다.

```tsx
const { fire } = useConfetti()

const fireSequentially = () => {
  confettiPresets.celebration.forEach((effect, index) => {
    setTimeout(() => {
      fire(effect)
    }, index * 300) // 300ms 간격으로 실행
  })
}
```

---

## 다음 단계

- [API 레퍼런스](./api-reference.md) - 옵션 상세 설명
- [커스텀 파티클](./custom-shapes.md) - 커스텀 모양 만들기
- [예제 모음](./examples.md) - 실전 예제
