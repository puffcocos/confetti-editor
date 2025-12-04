/**
 * canvas-confetti 타입 re-export
 *
 * @description
 * canvas-confetti 라이브러리에서 제공하는 모든 타입을 re-export합니다.
 * 사용자는 이 파일에서 필요한 타입을 import하여 사용할 수 있습니다.
 *
 * @example
 * ```tsx
 * import type { ConfettiOptions, Shape } from '~/components/types';
 *
 * const options: ConfettiOptions = {
 *   particleCount: 100,
 *   spread: 70
 * };
 * ```
 */

// canvas-confetti의 모든 타입 re-export
export type {
  Options as ConfettiOptions,
  Shape,
  CreateTypes,
  GlobalOptions,
  Origin,
} from 'canvas-confetti'

// 로컬 타입 import
import type { Options as ConfettiOptions, CreateTypes } from 'canvas-confetti'
import confetti from '../lib/canvas-confetti/confetti'

/**
 * Confetti Frame 타입
 * fire 호출을 포함하는 함수와 지속 시간을 정의합니다.
 */
export interface ConfettiFrame {
  /**
   * confetti fire 함수를 받아서 실행할 로직
   * @param fire - confetti 발사 함수 (기본 confetti 또는 커스텀 canvas의 confetti)
   */
  execute: (fire: typeof confetti | CreateTypes) => void
  /**
   * 프레임 실행 지속 시간 (밀리초)
   */
  duration: number
}

/**
 * Confetti 프리셋 타입
 * 기존 배열 방식 또는 프레임 방식을 모두 지원합니다.
 */
export type ConfettiPreset = ConfettiOptions[] | ConfettiFrame
