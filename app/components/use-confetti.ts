import { useCallback } from 'react'
import confetti from 'canvas-confetti'
import type { Options as ConfettiOptions } from 'canvas-confetti'

/**
 * useConfetti Hook
 *
 * @description
 * confetti를 프로그래밍 방식으로 제어할 수 있는 훅입니다.
 * 단일 옵션 또는 배열 형태로 제공 가능하며, 배열인 경우 순차적으로 모든 효과가 실행됩니다.
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const fire = useConfetti();
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
 *   };
 *
 *   return <button onClick={handleSuccess}>성공!</button>;
 * }
 * ```
 */
export function useConfetti() {
  return useCallback((options?: ConfettiOptions | ConfettiOptions[]) => {
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
}
