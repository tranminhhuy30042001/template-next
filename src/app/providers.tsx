"use client";

import { ConfigProvider } from "antd";
import "antd/dist/reset.css";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#1677ff",
          borderRadius: 6,
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}
