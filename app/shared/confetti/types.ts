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
