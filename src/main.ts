import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import directives from "../src/common/directives";
const app = createApp(App)

app.use(directives);
app.use(store).use(router).mount('#app')
