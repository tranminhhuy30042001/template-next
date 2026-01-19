'use client'

import { UserForm } from "@/components/settings/UserForm"


export default function Page() {
  return (
    <main className="p-4">
      <UserForm
        onSubmit={(values) => {
          console.log('Submit settings:', values)
        }}
      />
    </main>
  )
}
