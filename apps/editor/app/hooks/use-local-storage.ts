import { useState, useEffect, useCallback } from 'react'
import { getFromStorage, saveToStorage } from '~/utils/storage'

/**
 * 로컬 스토리지와 동기화되는 상태 관리 Hook
 *
 * @description
 * useState와 유사하게 동작하지만, 상태 변경 시 자동으로 로컬 스토리지에 저장됩니다.
 * 초기 마운트 시 로컬 스토리지에서 데이터를 불러옵니다.
 *
 * @param key - 로컬 스토리지 키
 * @param initialValue - 초기값 (로컬 스토리지에 데이터가 없을 때 사용)
 * @returns [상태값, 상태 변경 함수]
 *
 * @example
 * ```tsx
 * const [presets, setPresets] = useLocalStorage('custom-presets', [])
 * ```
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, (value: T | ((prev: T) => T)) => void] {
  // 초기값을 로컬 스토리지에서 불러오거나 initialValue 사용
  const [storedValue, setStoredValue] = useState<T>(() => {
    return getFromStorage(key, initialValue)
  })

  // 값 변경 시 로컬 스토리지에 저장
  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      try {
        // 함수형 업데이트 지원
        const valueToStore = value instanceof Function ? value(storedValue) : value

        // 상태 업데이트
        setStoredValue(valueToStore)

        // 로컬 스토리지에 저장
        saveToStorage(key, valueToStore)
      } catch (error) {
        console.warn(`Failed to update value for key: ${key}`, error)
      }
    },
    [key, storedValue],
  )

  // 다른 탭에서 변경된 경우 동기화
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue !== null) {
        try {
          setStoredValue(JSON.parse(e.newValue))
        } catch (error) {
          console.warn(`Failed to sync storage change for key: ${key}`, error)
        }
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [key])

  return [storedValue, setValue]
}
