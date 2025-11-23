import { useState } from 'react'
import type { Route } from './+types/preview'
import { confettiPresets } from '../components/confetti'
import { useConfetti } from '../components/use-confetti'
import type { Options as ConfettiOptions } from 'canvas-confetti'

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Confetti Preview - 미리보기' },
    { name: 'description', content: 'Confetti 효과를 실시간으로 테스트해보세요' },
  ]
}

export default function Preview() {
  const fire = useConfetti()
  const [selectedPreset, setSelectedPreset] = useState<string>('celebration')

  // 커스텀 옵션 상태
  const [particleCount, setParticleCount] = useState(100)
  const [spread, setSpread] = useState(70)
  const [startVelocity, setStartVelocity] = useState(45)
  const [decay, setDecay] = useState(0.9)
  const [gravity, setGravity] = useState(1)
  const [ticks, setTicks] = useState(200)
  const [originX, setOriginX] = useState(0.5)
  const [originY, setOriginY] = useState(0.6)
  const [angle, setAngle] = useState(90)
  const [scalar, setScalar] = useState(1)

  // 색상 옵션
  const [useCustomColors, setUseCustomColors] = useState(false)
  const [customColors, setCustomColors] = useState<string[]>(['#ff0000', '#00ff00', '#0000ff'])
  const [colorInput, setColorInput] = useState('#ff0000')

  // 모양 옵션
  const [shapes, setShapes] = useState<string[]>(['square', 'circle'])

  // 커스텀 프리셋 저장
  interface CustomPreset {
    name: string
    options: ConfettiOptions[]
  }
  const [customPresets, setCustomPresets] = useState<CustomPreset[]>([])
  const [presetName, setPresetName] = useState('')
  const [presetOptions, setPresetOptions] = useState<ConfettiOptions[]>([]) // 프리셋에 추가할 옵션들

  // 색상 프리셋
  const colorPresets = {
    rainbow: ['#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF', '#4B0082', '#9400D3'],
    pastel: ['#FFB6C1', '#FFC0CB', '#FFD1DC', '#FFE4E1', '#E0BBE4', '#D4A5A5'],
    gold: ['#FFD700', '#FFA500', '#FF8C00', '#DAA520', '#B8860B'],
    ocean: ['#006994', '#0099CC', '#66CCFF', '#99CCFF', '#CCE5FF'],
    fire: ['#FF0000', '#FF4500', '#FF6347', '#FF7F50', '#FFA500'],
    forest: ['#228B22', '#32CD32', '#90EE90', '#98FB98', '#00FF00'],
    purple: ['#9370DB', '#8A2BE2', '#9932CC', '#BA55D3', '#DA70D6'],
    sunset: ['#FF6B6B', '#FFA07A', '#FFD93D', '#6BCF7F', '#4ECDC4'],
  }

  // 현재 옵션 조합
  const currentOptions: ConfettiOptions = {
    particleCount,
    spread,
    startVelocity,
    decay,
    gravity,
    ticks,
    origin: { x: originX, y: originY },
    angle,
    scalar,
    ...(useCustomColors && customColors.length > 0 ? { colors: customColors } : {}),
    ...(shapes.length > 0 ? { shapes: shapes as any } : {}),
  }

  // 색상 추가
  const addColor = () => {
    if (colorInput && !customColors.includes(colorInput)) {
      setCustomColors([...customColors, colorInput])
    }
  }

  // 색상 제거
  const removeColor = (color: string) => {
    setCustomColors(customColors.filter((c) => c !== color))
  }

  // 색상 프리셋 적용
  const applyColorPreset = (presetName: string) => {
    const preset = colorPresets[presetName as keyof typeof colorPresets]
    setCustomColors(preset)
    setUseCustomColors(true)
  }

  // 모양 토글
  const toggleShape = (shape: string) => {
    if (shapes.includes(shape)) {
      setShapes(shapes.filter((s) => s !== shape))
    } else {
      setShapes([...shapes, shape])
    }
  }

  // 프리셋 실행
  const firePreset = (presetName: string) => {
    setSelectedPreset(presetName)
    const preset = confettiPresets[presetName as keyof typeof confettiPresets]
    fire(preset)
  }

  // 커스텀 옵션으로 실행
  const fireCustom = () => {
    fire(currentOptions)
  }

  // 프리셋에 현재 옵션 추가
  const addToPreset = () => {
    setPresetOptions([...presetOptions, currentOptions])
  }

  // 프리셋에서 옵션 제거
  const removeFromPreset = (index: number) => {
    setPresetOptions(presetOptions.filter((_, i) => i !== index))
  }

  // 커스텀 프리셋 저장
  const saveCustomPreset = () => {
    if (!presetName.trim()) {
      alert('프리셋 이름을 입력해주세요')
      return
    }

    if (presetOptions.length === 0) {
      alert('최소 1개 이상의 옵션을 추가해주세요')
      return
    }

    const newPreset: CustomPreset = {
      name: presetName,
      options: presetOptions,
    }

    setCustomPresets([...customPresets, newPreset])
    setPresetName('')
    setPresetOptions([])
    alert(`"${presetName}" 프리셋이 저장되었습니다! (${presetOptions.length}개 효과)`)
  }

  // 커스텀 프리셋 실행
  const fireCustomPreset = (preset: CustomPreset) => {
    fire(preset.options)
  }

  // 커스텀 프리셋 삭제
  const deleteCustomPreset = (index: number) => {
    setCustomPresets(customPresets.filter((_, i) => i !== index))
  }

  // 코드 미리보기 생성
  const generateCodePreview = () => {
    if (presetOptions.length === 0) {
      return `fire(${JSON.stringify(currentOptions, null, 2)})`
    }
    return `fire(${JSON.stringify(presetOptions, null, 2)})`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Confetti 미리보기</h1>
        <p className="text-gray-600 mb-8">다양한 옵션을 조절하며 confetti 효과를 테스트해보세요</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 왼쪽: 프리셋 & 특수 효과 */}
          <div className="space-y-6">
            {/* 프리셋 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">프리셋 효과</h2>
              <div className="grid grid-cols-2 gap-3">
                {Object.keys(confettiPresets).map((presetName) => (
                  <button
                    key={presetName}
                    onClick={() => firePreset(presetName)}
                    className={`px-4 py-3 rounded-lg font-medium transition-all ${
                      selectedPreset === presetName
                        ? 'bg-purple-600 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {presetName}
                  </button>
                ))}
              </div>
            </div>

            {/* 커스텀 프리셋 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">커스텀 프리셋</h2>

              {/* 프리셋 구성 중 */}
              <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-medium text-blue-900">
                    프리셋 구성 ({presetOptions.length}개 효과)
                  </label>
                  <button
                    onClick={addToPreset}
                    className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-xs font-medium"
                  >
                    + 현재 옵션 추가
                  </button>
                </div>

                {/* 추가된 옵션들 */}
                {presetOptions.length > 0 && (
                  <div className="space-y-2 mb-3">
                    {presetOptions.map((option, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 p-2 bg-white rounded border border-blue-300"
                      >
                        <span className="flex-1 text-xs text-gray-700 font-mono truncate">
                          효과 {index + 1}: {option.particleCount}개 파티클, {option.spread}° 퍼짐
                        </span>
                        <button
                          onClick={() => removeFromPreset(index)}
                          className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors text-xs"
                        >
                          제거
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {presetOptions.length === 0 && (
                  <p className="text-xs text-blue-600 mb-3">
                    오른쪽의 커스텀 옵션을 조절한 후 "+ 현재 옵션 추가" 버튼을 눌러 효과를 추가하세요
                  </p>
                )}

                {/* 프리셋 저장 */}
                <div className="flex gap-2 pt-3 border-t border-blue-200">
                  <input
                    type="text"
                    value={presetName}
                    onChange={(e) => setPresetName(e.target.value)}
                    placeholder="프리셋 이름 입력"
                    className="flex-1 px-3 py-2 border border-blue-300 rounded text-sm text-gray-800"
                  />
                  <button
                    onClick={saveCustomPreset}
                    disabled={presetOptions.length === 0}
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors text-sm font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    저장
                  </button>
                </div>
              </div>

              {/* 저장된 프리셋 목록 */}
              {customPresets.length > 0 && (
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    저장된 프리셋
                  </label>
                  {customPresets.map((preset, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <button
                        onClick={() => fireCustomPreset(preset)}
                        className="flex-1 text-left px-3 py-2 bg-purple-100 text-purple-800 rounded hover:bg-purple-200 transition-colors font-medium text-sm"
                      >
                        {preset.name} <span className="text-xs text-purple-600">({preset.options.length}개 효과)</span>
                      </button>
                      <button
                        onClick={() => deleteCustomPreset(index)}
                        className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors text-sm font-medium"
                      >
                        삭제
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {customPresets.length === 0 && (
                <p className="text-sm text-gray-500 text-center py-4">
                  저장된 커스텀 프리셋이 없습니다
                </p>
              )}
            </div>
          </div>

          {/* 오른쪽: 커스텀 옵션 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">커스텀 옵션</h2>

            <div className="space-y-4 mb-6">
              {/* Particle Count */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  파티클 개수: {particleCount}
                </label>
                <input
                  type="range"
                  min="10"
                  max="500"
                  value={particleCount}
                  onChange={(e) => setParticleCount(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              {/* Spread */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  퍼짐 정도 (Spread): {spread}°
                </label>
                <input
                  type="range"
                  min="0"
                  max="360"
                  value={spread}
                  onChange={(e) => setSpread(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              {/* Start Velocity */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  시작 속도: {startVelocity}
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={startVelocity}
                  onChange={(e) => setStartVelocity(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              {/* Gravity */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  중력: {gravity.toFixed(1)}
                </label>
                <input
                  type="range"
                  min="0"
                  max="3"
                  step="0.1"
                  value={gravity}
                  onChange={(e) => setGravity(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              {/* Decay */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  감속 (Decay): {decay.toFixed(2)}
                </label>
                <input
                  type="range"
                  min="0.5"
                  max="1"
                  step="0.01"
                  value={decay}
                  onChange={(e) => setDecay(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              {/* Ticks */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  지속 시간 (Ticks): {ticks}
                </label>
                <input
                  type="range"
                  min="50"
                  max="600"
                  value={ticks}
                  onChange={(e) => setTicks(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              {/* Angle */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  발사 각도: {angle}°
                </label>
                <input
                  type="range"
                  min="0"
                  max="180"
                  value={angle}
                  onChange={(e) => setAngle(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              {/* Origin X */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  X 위치 (Origin X): {originX.toFixed(2)}
                </label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={originX}
                  onChange={(e) => setOriginX(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              {/* Origin Y */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Y 위치 (Origin Y): {originY.toFixed(2)}
                </label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={originY}
                  onChange={(e) => setOriginY(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              {/* Scalar */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  크기 (Scalar): {scalar.toFixed(1)}x
                </label>
                <input
                  type="range"
                  min="0.1"
                  max="3"
                  step="0.1"
                  value={scalar}
                  onChange={(e) => setScalar(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              {/* 색상 옵션 */}
              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-medium text-gray-700">커스텀 색상 사용</label>
                  <button
                    onClick={() => setUseCustomColors(!useCustomColors)}
                    className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                      useCustomColors ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    {useCustomColors ? 'ON' : 'OFF'}
                  </button>
                </div>

                {useCustomColors && (
                  <div className="space-y-3">
                    {/* 색상 프리셋 */}
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-2">
                        색상 프리셋
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {Object.keys(colorPresets).map((presetName) => (
                          <button
                            key={presetName}
                            onClick={() => applyColorPreset(presetName)}
                            className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded text-xs font-semibold transition-colors capitalize text-gray-800 hover:text-gray-900"
                          >
                            {presetName}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* 현재 색상 목록 */}
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-2">
                        현재 색상
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {customColors.map((color) => (
                          <div
                            key={color}
                            className="flex items-center gap-1 bg-gray-100 rounded px-2 py-1"
                          >
                            <div
                              className="w-4 h-4 rounded border border-gray-300"
                              style={{ backgroundColor: color }}
                            />
                            <span className="text-xs text-gray-800 font-medium">{color}</span>
                            <button
                              onClick={() => removeColor(color)}
                              className="ml-1 text-red-500 hover:text-red-700 text-xs font-bold"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 색상 추가 */}
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-2">
                        색상 추가
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="color"
                          value={colorInput}
                          onChange={(e) => setColorInput(e.target.value)}
                          className="w-12 h-10 rounded cursor-pointer"
                        />
                        <input
                          type="text"
                          value={colorInput}
                          onChange={(e) => setColorInput(e.target.value)}
                          placeholder="#ff0000"
                          className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm text-gray-800 placeholder:text-gray-400"
                        />
                        <button
                          onClick={addColor}
                          className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors text-sm font-medium"
                        >
                          추가
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* 모양 옵션 */}
              <div className="pt-4 border-t border-gray-200">
                <label className="block text-sm font-medium text-gray-700 mb-3">파티클 모양</label>
                <div className="flex gap-2">
                  {['circle', 'square', 'star'].map((shape) => (
                    <button
                      key={shape}
                      onClick={() => toggleShape(shape)}
                      className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                        shapes.includes(shape)
                          ? 'bg-purple-600 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {shape === 'circle' && '●'}
                      {shape === 'square' && '■'}
                      {shape === 'star' && '★'}
                      <span className="ml-1 capitalize">{shape}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 커스텀 실행 버튼 */}
            <button
              onClick={fireCustom}
              className="w-full px-6 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg font-bold text-lg hover:from-orange-600 hover:to-red-600 transition-all shadow-lg"
            >
              🎨 커스텀 옵션으로 발사!
            </button>

            {/* 코드 미리보기 */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="text-sm font-semibold text-gray-700 mb-2">코드 미리보기</h3>
              <div className="bg-gray-900 rounded p-4 overflow-x-auto">
                <pre className="text-xs text-green-400 font-mono">
                  <code>{generateCodePreview()}</code>
                </pre>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                useConfetti 훅을 사용하여 위 코드로 confetti를 발사할 수 있습니다
              </p>
            </div>
          </div>
        </div>

        {/* 하단: 문서 링크 */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">더 많은 옵션 알아보기</h2>
          <p className="text-gray-600 mb-3">
            canvas-confetti는 더 많은 커스터마이징 옵션을 제공합니다.
          </p>
          <a
            href="https://github.com/catdad/canvas-confetti"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors"
          >
            📚 공식 문서 보기
          </a>
        </div>
      </div>
    </div>
  )
}
