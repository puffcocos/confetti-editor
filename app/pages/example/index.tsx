import { useConfetti } from '../../components/use-confetti'

export function ExamplePage() {
  const { fire } = useConfetti()

  return (
    <div>
      Example Page
      <button onClick={() => fire()}>클릭해서 축하하기!</button>
    </div>
  )
}
