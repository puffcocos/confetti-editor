/**
 * 로컬 스토리지 유틸리티
 *
 * @description
 * 로컬 스토리지에 데이터를 안전하게 저장하고 불러오는 유틸리티 함수들입니다.
 * JSON 직렬화/역직렬화와 에러 핸들링을 포함합니다.
 */

/**
 * 로컬 스토리지에서 데이터를 불러옵니다
 *
 * @param key - 스토리지 키
 * @param defaultValue - 데이터가 없거나 에러 발생 시 반환할 기본값
 * @returns 저장된 데이터 또는 기본값
 */
export function getFromStorage<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') {
    return defaultValue
  }

  try {
    const item = window.localStorage.getItem(key)
    if (item === null) {
      return defaultValue
    }
    return JSON.parse(item) as T
  } catch (error) {
    console.warn(`Failed to load data from localStorage (key: ${key}):`, error)
    return defaultValue
  }
}

/**
 * 로컬 스토리지에 데이터를 저장합니다
 *
 * @param key - 스토리지 키
 * @param value - 저장할 데이터
 * @returns 저장 성공 여부
 */
export function saveToStorage<T>(key: string, value: T): boolean {
  if (typeof window === 'undefined') {
    return false
  }

  try {
    window.localStorage.setItem(key, JSON.stringify(value))
    return true
  } catch (error) {
    console.warn(`Failed to save data to localStorage (key: ${key}):`, error)
    return false
  }
}

/**
 * 로컬 스토리지에서 데이터를 제거합니다
 *
 * @param key - 스토리지 키
 * @returns 제거 성공 여부
 */
export function removeFromStorage(key: string): boolean {
  if (typeof window === 'undefined') {
    return false
  }

  try {
    window.localStorage.removeItem(key)
    return true
  } catch (error) {
    console.warn(`Failed to remove data from localStorage (key: ${key}):`, error)
    return false
  }
}
