export function ErrorBox({ error }: { error?: Error }) {
  return <div style={{ color: 'red' }}>{error?.message}</div>
}
