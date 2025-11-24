import type { Options as ConfettiOptions } from 'canvas-confetti'

/**
 * 미리 정의된 confetti 프리셋
 * 각 프리셋은 ConfettiOptions 배열로 구성되어 여러 효과를 순차적으로 실행할 수 있습니다.
 */
export const confettiPresets = {
  /**
   * 축하 효과 (현실적인 폭죽)
   */
  celebration: [
    {
      particleCount: 50,
      spread: 26,
      startVelocity: 55,
      origin: { y: 0.7 },
    },
    {
      particleCount: 40,
      spread: 60,
      origin: { y: 0.7 },
    },
    {
      particleCount: 70,
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
      origin: { y: 0.7 },
    },
    {
      particleCount: 20,
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
      origin: { y: 0.7 },
    },
    {
      particleCount: 20,
      spread: 120,
      startVelocity: 45,
      origin: { y: 0.7 },
    },
  ] as ConfettiOptions[],

  /**
   * 폭발 효과
   */
  explosion: [
    {
      particleCount: 150,
      spread: 180,
      origin: { y: 0.5 },
      startVelocity: 45,
    },
  ] as ConfettiOptions[],

  /**
   * 별 효과
   */
  stars: [
    {
      particleCount: 50,
      spread: 360,
      ticks: 100,
      gravity: 0,
      decay: 0.94,
      startVelocity: 30,
      shapes: ['star'],
      colors: ['FFE400', 'FFBD00', 'E89400', 'FFCA6C', 'FDFFB8'],
    },
  ] as ConfettiOptions[],

  /**
   * 눈 효과
   */
  snow: [
    {
      particleCount: 200,
      spread: 180,
      origin: { y: -0.1 },
      startVelocity: 0,
      ticks: 300,
      gravity: 0.5,
      colors: ['#ffffff'],
    },
  ] as ConfettiOptions[],

  /**
   * 불꽃놀이 효과
   */
  fireworks: [
    {
      particleCount: 100,
      spread: 360,
      ticks: 100,
      gravity: 1,
      decay: 0.94,
      startVelocity: 30,
    },
  ] as ConfettiOptions[],

  /**
   * 양쪽에서 효과
   */
  sides: [
    {
      particleCount: 50,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.6 },
    },
    {
      particleCount: 50,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.6 },
    },
  ] as ConfettiOptions[],

  /**
   * 학교 졸업식 스타일
   */
  school: [
    {
      particleCount: 100,
      spread: 26,
      startVelocity: 55,
    },
  ] as ConfettiOptions[],

  /**
   * 랜덤 방향
   */
  random: [
    {
      particleCount: 100,
      spread: 360,
      ticks: 50,
      gravity: 0,
      decay: 0.94,
      startVelocity: 30,
    },
  ] as ConfettiOptions[],
} as const
