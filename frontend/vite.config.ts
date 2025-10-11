// ...existing code...
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Enable serving on the local network. Use host: true so Vite binds 0.0.0.0 and is reachable
// from other machines in the LAN. Keep proxy settings for API forwarding during dev.
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // bind to 0.0.0.0 so other devices on the LAN can connect
    port: 5173,
    strictPort: false,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      },
      '/pages': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      },
    },
    // If your network requires HMR client to connect to a specific host/port,
    // you can uncomment and set the hmr options below (replace HOST_IP if needed):
    // hmr: {
    //   protocol: 'ws',
    //   host: 'HOST_IP',
    //   port: 5173,
    // },
  },
})

