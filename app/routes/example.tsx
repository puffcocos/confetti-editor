import type { Route } from './+types/example'
import { ExamplePage } from '~/pages/example'

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Example Page' },
    { name: 'description', content: 'This is an example page with Confetti component.' },
  ]
}

export default function Example() {
  return <ExamplePage />
}
