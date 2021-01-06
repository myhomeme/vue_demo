<template>
  <div id="clock">
    <p class="date">...404 error page...</p>
    <p class="time">{{ time }}</p>
    <p class="text">{{ date }}</p>
  </div>
</template>

<script>
export default {
  name: '4040',
  data: function() {
    return {
      time: '',
      date: '',
      week: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
    }
  },
  mounted() {
    this.readyThing()
  },
  methods: {
    readyThing() {
      this.updateTime()
      setInterval(this.updateTime, 1000)
    },
    updateTime() {
      var cd = new Date()
      this.time = this.zeroPadding(cd.getHours(), 2) + ':' + this.zeroPadding(cd.getMinutes(), 2) + ':' + this.zeroPadding(cd.getSeconds(), 2)
      this.date = this.zeroPadding(cd.getFullYear(), 4) + '-' + this.zeroPadding(cd.getMonth() + 1, 2) + '-' + this.zeroPadding(cd.getDate(), 2) + ' ' + this.week[cd.getDay()]
    },
    zeroPadding(num, digit) {
      var zero = ''
      for (var i = 0; i < digit; i++) {
        zero += '0'
      }
      return (zero + num).slice(-digit)
    }
  }
}
</script>
<style>html, body {
  height: 95%;
}

body {
  background: #0f3854;
  background: -webkit-radial-gradient(center ellipse, #0a2e38 0%, #000000 70%);
  background: radial-gradient(ellipse at center, #0a2e38 0%, #000000 70%);
  background-size: 100%;
}

p {
  margin: 0;
  padding: 0;
}

#clock {
  font-family: 'Share Tech Mono', monospace;
  color: #ffffff;
  text-align: center;
  position: absolute;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  color: #daf6ff;
  text-shadow: 0 0 20px #0aafe6, 0 0 20px rgba(10, 175, 230, 0);
}

#clock .time {
  letter-spacing: 0.05em;
  font-size: 60px;
  padding: 5px 0;
}

#clock .date {
  letter-spacing: 0.1em;
  font-size: 15px;
}

#clock .text {
  letter-spacing: 0.1em;
  font-size: 12px;
  padding: 20px 0 0;
}</style>

