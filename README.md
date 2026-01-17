This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

QUY TẮC THÊM API MỚI
BƯỚC 1: KHAI BÁO TYPE
📁 src/types/index.ts
export type Settings = {
  theme: 'light' | 'dark'
  language: string
}


✔ Luôn có type
✔ 1 nguồn duy nhất

🌐 BƯỚC 2: TẠO API ROUTE
📁 src/app/api/settings/route.ts
import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    theme: 'dark',
    language: 'vi',
  })
}


👉 Test:

/api/settings

🔌 BƯỚC 3: (OPTIONAL) FETCH HELPER

Nếu bạn đã có apiFetch → dùng luôn

apiFetch<Settings>('/api/settings')

🎣 BƯỚC 4: TẠO HOOK CHO API
📁 src/hooks/useSettings.ts
import { useResource } from './useResource'
import { apiFetch } from '@/lib/apiFetch'
import type { Settings } from '@/types'

export function useSettings() {
  return useResource<Settings>(
    signal => apiFetch('/api/settings', { signal }),
    []
  )
}


✔ Không cần params
✔ Không cần condition
✔ Reuse được mọi nơi

🔗 BƯỚC 5: COMBINE (NẾU CẦN)

Nếu UI cần nhiều API không có [id]:

export function useAppBootstrap() {
  const user = useUser()
  const settings = useSettings()

  return combineResources({
    user,
    settings,
  })
}

🎨 BƯỚC 6: DÙNG TRONG COMPONENT
'use client'

import { DataBoundary } from '@/components/DataBoundary'
import { useSettings } from '@/hooks/useSettings'

export function SettingsPanel() {
  const resource = useSettings()

  return (
    <DataBoundary {...resource}>
      {settings => (
        <div>
          <p>Theme: {settings.theme}</p>
          <p>Language: {settings.language}</p>
        </div>
      )}
    </DataBoundary>
  )
}
