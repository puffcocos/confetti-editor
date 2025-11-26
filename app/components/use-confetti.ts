import { useCallback } from 'react'
import confetti from 'canvas-confetti'
import type { Options as ConfettiOptions, Shape } from 'canvas-confetti'

interface ShapeFromPathOptions {
  path: string
  matrix?: number[]
}

/**
 * useConfetti Hook
 *
 * @description
 * confetti를 프로그래밍 방식으로 제어할 수 있는 훅입니다.
 * 단일 옵션 또는 배열 형태로 제공 가능하며, 배열인 경우 순차적으로 모든 효과가 실행됩니다.
 * createShape 함수를 통해 SVG Path 기반 커스텀 도형을 생성할 수 있습니다.
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { fire, createShape } = useConfetti();
 *
 *   const handleSuccess = () => {
 *     // 단일 효과
 *     fire({ particleCount: 100, spread: 70 });
 *
 *     // 여러 효과 (배열)
 *     fire([
 *       { particleCount: 50, origin: { x: 0 } },
 *       { particleCount: 50, origin: { x: 1 } }
 *     ]);
 *
 *     // 커스텀 도형 사용
 *     const heart = createShape({ path: 'M5 2 C5 0.5 6 0...' });
 *     fire({ shapes: [heart], particleCount: 50 });
 *   };
 *
 *   return <button onClick={handleSuccess}>성공!</button>;
 * }
 * ```
 */
export function useConfetti() {
  const fire = useCallback((options?: ConfettiOptions | ConfettiOptions[]) => {
    if (!options) {
      confetti({})
      return
    }

    // 배열인 경우 모든 효과를 순차적으로 실행
    if (Array.isArray(options)) {
      options.forEach((option) => confetti(option))
    } else {
      confetti(options)
    }
  }, [])

  const createShape = useCallback((options: ShapeFromPathOptions): Shape => {
    if (options.matrix) {
      // 배열을 DOMMatrix로 변환
      const matrix = new DOMMatrix(options.matrix)
      return confetti.shapeFromPath({ path: options.path, matrix })
    }
    return confetti.shapeFromPath({ path: options.path })
  }, [])

  return { fire, createShape }
}
