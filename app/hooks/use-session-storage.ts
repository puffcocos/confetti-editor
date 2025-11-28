import { useState, useEffect, useCallback } from 'react'

/**
 * 세션 스토리지에서 데이터를 불러옵니다
 *
 * @param key - 스토리지 키
 * @param defaultValue - 데이터가 없거나 에러 발생 시 반환할 기본값
 * @returns 저장된 데이터 또는 기본값
 */
function getFromSessionStorage<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') {
    return defaultValue
  }

  try {
    const item = window.sessionStorage.getItem(key)
    if (item === null) {
      return defaultValue
    }
    return JSON.parse(item) as T
  } catch (error) {
    console.warn(`Failed to load data from sessionStorage (key: ${key}):`, error)
    return defaultValue
  }
}

/**
 * 세션 스토리지에 데이터를 저장합니다
 *
 * @param key - 스토리지 키
 * @param value - 저장할 데이터
 * @returns 저장 성공 여부
 */
function saveToSessionStorage<T>(key: string, value: T): boolean {
  if (typeof window === 'undefined') {
    return false
  }

  try {
    window.sessionStorage.setItem(key, JSON.stringify(value))
    return true
  } catch (error) {
    console.warn(`Failed to save data to sessionStorage (key: ${key}):`, error)
    return false
  }
}

/**
 * 세션 스토리지와 동기화되는 상태 관리 Hook
 *
 * @description
 * useState와 유사하게 동작하지만, 상태 변경 시 자동으로 세션 스토리지에 저장됩니다.
 * 초기 마운트 시 세션 스토리지에서 데이터를 불러옵니다.
 * 세션 스토리지는 브라우저 탭을 닫으면 데이터가 사라집니다.
 *
 * @param key - 세션 스토리지 키
 * @param initialValue - 초기값 (세션 스토리지에 데이터가 없을 때 사용)
 * @returns [상태값, 상태 변경 함수]
 *
 * @example
 * ```tsx
 * const [canvasWidth, setCanvasWidth] = useSessionStorage('canvas-width', 400)
 * ```
 */
export function useSessionStorage<T>(
  key: string,
  initialValue: T,
): [T, (value: T | ((prev: T) => T)) => void] {
  // 초기값을 세션 스토리지에서 불러오거나 initialValue 사용
  const [storedValue, setStoredValue] = useState<T>(() => {
    return getFromSessionStorage(key, initialValue)
  })

  // 값 변경 시 세션 스토리지에 저장
  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      try {
        // 함수형 업데이트 지원
        const valueToStore = value instanceof Function ? value(storedValue) : value

        // 상태 업데이트
        setStoredValue(valueToStore)

        // 세션 스토리지에 저장
        saveToSessionStorage(key, valueToStore)
      } catch (error) {
        console.warn(`Failed to update value for key: ${key}`, error)
      }
    },
    [key, storedValue],
  )

  return [storedValue, setValue]
}
