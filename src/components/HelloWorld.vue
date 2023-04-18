<script setup>
defineProps({
  msg: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
    <h3>
     Experience the dazzling spectacle of our LED light show - a feast for the eyes that you won't soon forget!
    </h3>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media screen and (max-width: 600px) {
  .greetings h1 {
    font-size: 20px;
  }

   .greetings  h3 {
    font-size: 10px;
  }

    .greetings img {
    width: 80%;
    max-width: 300px;
    margin: 0 auto;
    display: block;
  }
}


</style>
