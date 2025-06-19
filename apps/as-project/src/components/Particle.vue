<template>
  <canvas ref="canvas" :class="classname" />
</template>
<script>
import {defineComponent, getCurrentInstance, onMounted, onBeforeUnmount, ref, nextTick} from 'vue';

export default defineComponent({
  name: 'Particle',
  props: {
    r: {
      type: [String, Number],
      required: false,
      default: 10
    },
    width: {
      type: [Number, String],
      required: false
    },
    height: {
      type: [Number, String],
      required: false
    },
    classname: {
      type: String,
      required: false,
      default: ''
    },
    action: {
      type: Function,
      required: false
    }
  },
  setup(props) {
    const {proxy} = getCurrentInstance();
    const width = ref(props.width || document.documentElement.clientWidth);
    const HEIGHT = props.height || document.documentElement.clientHeight;
    const round = [];
    const initRoundPopulation = 80;
    let ctx;
    let content;
    let resizeObserver;
    const animate = () => {
      content.clearRect(0, 0, width.value, HEIGHT);
      for (const i in round) {
        round[i].move && round[i].move();
      }
      requestAnimationFrame(animate);
    };
    const init = () => {
      for (let i = 0; i < initRoundPopulation; i++) {
        round[i] = new box(i, Math.random() * width.value, Math.random() * HEIGHT, {content, height: HEIGHT, radius: props.r});
        round[i].draw();
      }
      animate();
    };
    const debounce = (fn, wait = 200) => {
      let timer;
      return function() {
        if (timer) {
          clearTimeout(timer);
        }
        timer = setTimeout(() => {
          fn.call(this);
        }, wait);
      }
    };
    const resize = debounce(() => {
      width.value = proxy.$.refs.canvas.parentNode.offsetWidth;
      ctx.width = width.value;
      init();
    });
    function box(index, x, y, options) {
      this.content = options.content;
      this.height = options.height;
      this.index = index;
      this.x = x;
      this.y = y;
      this.r = Math.random() * options.radius + 1;
      var alpha = (Math.floor(Math.random() * 10) + 1) / 10 / 2;
      this.color = "rgba(255,255,255," + alpha + ")";
    }

    box.prototype.draw = function() {
      this.content.fillStyle = this.color;
      this.content.shadowBlur = this.r * 2;
      this.content.beginPath();
      this.content.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
      this.content.closePath();
      this.content.fill();
    };

    box.prototype.move = function() {
      this.y -= 0.30;   //  上升移动速度
      if (this.y <= -10) {
        this.y = this.height + 10;
      }
      this.draw();
    };
    onMounted(() => {
      resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(proxy.$.refs.canvas.parentNode);
      width.value = proxy.$.refs.canvas.parentNode.offsetWidth;
      ctx = proxy.$.refs.canvas;
      content = ctx.getContext('2d');
      ctx.width = width.value;
      ctx.height = HEIGHT;
      nextTick(() => {
        init();
      });
    });
    onBeforeUnmount(() => {
      resizeObserver.unobserve(proxy.$.refs.canvas.parentNode);
    });
  }
});
</script>