import { ErrorBox } from './ErrorBox'

export function DefaultError({ error }: { error: Error }) {
  return <ErrorBox error={error} />
}
