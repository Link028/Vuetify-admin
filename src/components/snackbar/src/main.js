import Vue from 'vue';
import VMain from './VMain.vue';
import config from '@/config/config.js'

const SnackbarConstructor = Vue.extend(VMain);

let instance;
let seed = 1;
const instances = [];

const Snackbar = (options) => {
  let opts = options || {};
  const id = `message_${seed += 1}`;

  if (typeof opts === 'string') {
    opts = {
      text: opts,
    };
  }

  instance = new SnackbarConstructor({
    data: opts,
  });
  instance.id = id;
  instance.vm = instance.$mount();
  document.body.appendChild(instance.vm.$el);
  instance.vm.visible = true;
  instance.dom = instance.vm.$el;
  //instance.dom.style.zIndex = seed + 1001;
  instances.push(instance);
  return instance.vm;
};

['success', 'warning', 'info', 'error'].forEach((type) => {
  Snackbar[type] = (options) => {
    let opts = options || {};
    var vcolor = config.view.info;
    if ( type === 'success' ) { vcolor = config.view.success; }
    if (type === 'info') { vcolor = config.view.info; }
    if (type === 'error') { vcolor = config.view.error; }
    if (type === 'warning') { vcolor = config.view.warning; }
    
    if (typeof opts === 'string') {
      opts = {
        text: opts,
        color: vcolor ,
      };
    }

    opts.type = type;
    return Snackbar(opts);
  };
});

Snackbar.close = (id) => {
  for (let i = 0, len = instances.length; i < len; i += 1) {
    if (id === instances[i].id) {
      instances.splice(i, 1);
      break;
    }
  }
};

Snackbar.closeAll = () => {
  for (let i = 0, len = instances.length; i < len; i += 1) {
    instances[i].close();
  }
};

export default Snackbar;
