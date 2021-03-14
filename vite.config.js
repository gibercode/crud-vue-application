import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()]
})

// module.exports = {
//   css: {
//     loaderOptions: {
//       sass: {
//         data: `@import "@/assets/styles.scss";`
//       }
//     }
//   }
// };