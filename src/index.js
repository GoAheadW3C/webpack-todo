import Vue from 'vue'
import App from './app.vue'

import './assets/styles/test-stylus.styl'
import './assets/images/bg.jpeg'

const root = document.createElement('div');
document.body.appendChild(root);

new Vue({
	render : (h) => h(App) //h就是vue中的createApp参数
}).$mount(root)//将app挂载到body下的div上