import type { Route } from './+types/home'
import { PreviewPage } from '~/pages/preview'

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Confetti Editor - 미리보기' },
    { name: 'description', content: 'Confetti 효과를 실시간으로 테스트하고 커스터마이징하세요' },
  ]
}

export default function Home() {
  return <PreviewPage />
}
