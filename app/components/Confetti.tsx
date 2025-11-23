import { useCallback, useRef } from 'react'
import confetti from 'canvas-confetti'
import type { Options as ConfettiOptions } from 'canvas-confetti'

export { confettiPresets } from './presets'

/**
 * Confetti 컴포넌트의 Props 타입
 */
export interface ConfettiProps {
  /**
   * 자식 요소 (트리거 요소)
   * 클릭 시 confetti 효과가 발생합니다
   */
  children: React.ReactNode

  /**
   * canvas-confetti 커스터마이징 옵션
   * 단일 옵션 또는 배열 형태로 제공 가능
   * 배열인 경우 순차적으로 모든 효과가 발사됩니다
   * @see https://github.com/catdad/canvas-confetti
   */
  options?: ConfettiOptions | ConfettiOptions[]

  /**
   * 자동으로 confetti를 실행할지 여부
   * @default false
   */
  autoFire?: boolean

  /**
   * 트리거 요소의 클래스명
   */
  className?: string

  /**
   * confetti 실행 전 콜백 함수
   */
  onBeforeFire?: () => void

  /**
   * confetti 실행 후 콜백 함수
   */
  onAfterFire?: () => void
}

/**
 * canvas-confetti를 활용한 Confetti 컴포넌트
 *
 * @description
 * 클릭 이벤트 또는 자동 실행을 통해 confetti 효과를 발생시키는 컴포넌트입니다.
 * canvas-confetti의 모든 커스터마이징 옵션을 지원합니다.
 *
 * @example
 * ```tsx
 * // 기본 사용법
 * <Confetti>
 *   <button>클릭하세요!</button>
 * </Confetti>
 *
 * // 커스텀 옵션 사용
 * <Confetti
 *   options={{
 *     particleCount: 100,
 *     spread: 70,
 *     origin: { y: 0.6 }
 *   }}
 * >
 *   <button>축하합니다!</button>
 * </Confetti>
 *
 * // 자동 실행
 * <Confetti autoFire options={{ particleCount: 200 }}>
 *   <div>자동으로 confetti가 실행됩니다</div>
 * </Confetti>
 * ```
 */
export function Confetti({
  children,
  options = {},
  autoFire = false,
  className,
  onBeforeFire,
  onAfterFire,
}: ConfettiProps) {
  const hasAutoFired = useRef(false)

  /**
   * confetti 실행 함수
   */
  const fireConfetti = useCallback(() => {
    onBeforeFire?.()

    // 배열인 경우 모든 효과를 순차적으로 발사
    if (Array.isArray(options)) {
      options.forEach((option) => confetti(option))
    } else {
      confetti(options)
    }

    onAfterFire?.()
  }, [options, onBeforeFire, onAfterFire])

  /**
   * 클릭 핸들러
   */
  const handleClick = useCallback(() => {
    fireConfetti()
  }, [fireConfetti])

  /**
   * 자동 실행 처리
   */
  if (autoFire && !hasAutoFired.current) {
    hasAutoFired.current = true
    // 다음 렌더링 사이클에서 실행
    setTimeout(fireConfetti, 0)
  }

  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  )
}
