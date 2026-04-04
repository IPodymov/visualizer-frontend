import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import fs from 'node:fs'

// https://vite.dev/config/
export default defineConfig(() => {
  // Насильно читаем только файл .env, игнорируя .env.local и остальные
  const envPath = path.resolve(__dirname, '.env')
  const env: Record<string, string> = {}
  
  if (fs.existsSync(envPath)) {
    const rawEnv = fs.readFileSync(envPath, 'utf-8')
    rawEnv.split('\n').forEach(line => {
      const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/)
      if (match) {
        env[match[1]] = match[2].trim()
      }
    })
  }

  // Перекидываем переменные с префиксом VITE_ в define глоб. объекта import.meta.env
  const define: Record<string, string> = {}
  for (const [key, value] of Object.entries(env)) {
    if (key.startsWith('VITE_')) {
      define[`import.meta.env.${key}`] = JSON.stringify(value)
    }
  }
  
  return {
    plugins: [react()],
    // Указываем несуществующую директорию, чтобы Vite не читал дефолтные .env* файлы
    envDir: './non-existent-env-dir',
    define,
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    server: {
      proxy: {
        '/api': {
          target: env.VITE_API_URL,
          changeOrigin: true,
          secure: false,
        },
      },
    },
  }
})
