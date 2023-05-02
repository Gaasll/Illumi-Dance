<template>
  <div class="rectangle">
    <div class="side front"></div>
    <div class="side back"></div>
    <div class="side2 left"></div>
    <div class="side2 right"></div>
    <div class="side1 top">
      <br><br>
      <div class="led"></div>
      <div class="led"></div>
      <div class="led"></div>
      <div class="led"></div>
      <div class="led"></div>
      <div class="led"></div>
      <div class="led"></div>
      <div class="led"></div>
      <div class="led"></div>
      <div class="led"></div>
      <div class="led"></div>
      <div class="led"></div>
      
    </div>
    <div class="side1 bottom"></div>
  </div>
  <div class="page2">
  <br>
  
  <h1>Welcome to Illumi-Dance,</h1> <p>the innovative lighting solution for your home, entertainment, and events! We understand the growing demand for lighting solutions that not only add aesthetic value but also offer convenience and functionality. <br><br>

 

  One of the standout features of Illumi-Dance is its ability to set an alarm for your  <span style="font-weight: bold;">sunrise</span>. Unlike existing products, users can set the alarm in the web-app, and 30 minutes before the alarm goes off, the LED lights will automatically turn on and start the “sunrise” show without sound. This feature is perfect for those who want to wake up to a <span style="font-weight: bold;">gently simulated sunlight</span> instead of a traditional alarm clock. The alarm function also makes it easier to keep track of time during events or gatherings.<br><br>


  At Illumi-Dance, we prioritize user experience and satisfaction. Our product is easy to use, and the web-app allows for seamless customization and control of the lighting effects. The product is also energy-efficient and durable, ensuring that you get the most out of your investment.</p><br></div>

   <img alt="phone" src="@/assets/info-phone.png" height="150px" width="200px"/>
</template>


<style>

.rectangle {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  animation: rotate 30s linear infinite;
  margin-right:50%;
   position: fixed;
    z-index: -1;
    top: 0;
    left: 0;
 
}

img {
  display: block;
  margin: 0 auto;
  margin-top: 0px;
}



.strong{
  font-weight: bold;
}



.page2{
  text-align: center;
}

.side {
  position: absolute;
  width: 100px;
  height: 20px;
  background: transparent;
  border: 0.1px solid rgb(207, 204, 204);;
  box-sizing: border-box;
 
}

.side1 {
  position: absolute;
  width: 100px;
  height: 200px;
  background: transparent;
  border: 0.1px solid rgb(207, 204, 204);
  box-sizing: border-box;
}

.side2 {
  position: absolute;
  width: 200px;
  height: 20px;
  background: transparent;
  border: 0.1px solid rgb(207, 204, 204);
  box-sizing: border-box;
}




.front {
  background: rgb(235, 235, 233);
  transform: translateZ(100px);
}

.back {
  background: rgb(235, 235, 233);
  transform: translateZ(-100px) rotateY(180deg);
}

.left {
  background: rgb(235, 235, 233);
  transform: translateX(-100px) rotateY(-90deg);
}

.right {
  background: rgb(235, 235, 233);
  transform: translateX(0px) rotateY(90deg);
}

.bottom {
  background: rgb(235, 235, 233);
  transform: translateY(-80px) rotateX(90deg);
}

.top {
  background-image: url('../assets/backgrnd.png');
  background-repeat: no-repeat;
  background-size: cover;
  transform: translateY(-100px) rotateX(-90deg);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
}

.led {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: #eee786;
  transform: translateZ(10px) rotateY(-20deg) rotateX(20deg);
  animation: blink 2s infinite;
}

.led:nth-child(1) {
  animation-delay: 0.1s;
}

.led:nth-child(2) {
  animation-delay: 0.2s;
}

.led:nth-child(3) {
  animation-delay: 0.3s;
}
.led:nth-child(4) {
  animation-delay: 0.4s;
}
.led:nth-child(5) {
  animation-delay: 0.5s;
}
.led:nth-child(6) {
  animation-delay: 0.6s;
}
.led:nth-child(12) {
  animation-delay: 0.1s;
}
.led:nth-child(11) {
  animation-delay: 0.2s;
}
.led:nth-child(10) {
  animation-delay: 0.3s;
}


@keyframes blink {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
@keyframes rotate {
   from { transform: rotateY(50deg) rotateX(-90deg) rotateZ(-30deg)rotateY(50deg) rotateX(-90deg) rotateZ(-30deg); }
   
}
</style>