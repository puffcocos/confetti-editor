import { useCallback, useState } from 'react'
import confetti from 'canvas-confetti'
import type { Options as ConfettiOptions, Shape, CreateTypes } from 'canvas-confetti'

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
 * setConfettiCanvasRef를 통해 특정 canvas 요소에서만 confetti를 렌더링할 수 있습니다.
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { fire, createShape, setConfettiCanvasRef } = useConfetti();
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
 *   return (
 *     <>
 *       <canvas ref={setConfettiCanvasRef} />
 *       <button onClick={handleSuccess}>성공!</button>
 *     </>
 *   );
 * }
 * ```
 */
export function useConfetti() {
  const [customConfetti, setCustomConfetti] = useState<CreateTypes | null>(null)

  // Canvas ref setter
  const setConfettiCanvasRef = useCallback((canvas: HTMLCanvasElement | null) => {
    if (canvas) {
      setCustomConfetti(confetti.create(canvas, { resize: true }))
    } else {
      setCustomConfetti(null)
    }
  }, [])

  const fire = useCallback(
    (options?: ConfettiOptions | ConfettiOptions[]) => {
      // 커스텀 canvas가 설정되어 있으면 해당 canvas 사용, 아니면 기본 confetti 사용
      const confettiFn = customConfetti || confetti

      if (!options) {
        confettiFn({})
        return
      }

      // 배열인 경우 모든 효과를 순차적으로 실행
      if (Array.isArray(options)) {
        options.forEach((option) => confettiFn(option))
      } else {
        confettiFn(options)
      }
    },
    [customConfetti]
  )

  const createShape = useCallback((options: ShapeFromPathOptions): Shape => {
    if (options.matrix) {
      // 배열을 DOMMatrix로 변환
      const matrix = new DOMMatrix(options.matrix)
      return confetti.shapeFromPath({ path: options.path, matrix })
    }
    return confetti.shapeFromPath({ path: options.path })
  }, [])

  return { fire, createShape, setConfettiCanvasRef }
}
