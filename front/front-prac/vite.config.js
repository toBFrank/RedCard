import { defineConfig, loadEnv } from 'vite';
import solidPlugin from 'vite-plugin-solid';

//let cringe = import.meta.env.VITE_API_HOST;
const htmlPlugin = () => {
  
  return {
    name: 'html-transform',
    transformIndexHtml(html) {
      return html.replace(
        /<script>\/\/<\/script>/,
        `<script>let formData=new FormData();formData.append('path',window.location.href.toString().split(window.location.host)[1]);fetch("`+process.env.VITE_API_HOST+`/log",{body:formData,method:"post"})</script>`
      )
    }
  }
}


export default ({ mode }) => {
    // Load app-level env vars to node-level env vars.
    process.env = {...process.env, ...loadEnv(mode, process.cwd())};

    return defineConfig({
  plugins: [solidPlugin(), htmlPlugin()],
  build: {
    target: 'esnext',
    polyfillDynamicImport: false,
  },
  server: {
    port: 3000,
    host: true,
	watch: {
	usePolling: true
}
  }
    })}
