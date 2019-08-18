<template>
  <div>
    <div class="welcome">
      <div class="row welcome__row">
        <h2 class="heading-primary">{{ titleOne }} </h2><br>
        <h3 class="heading-secondary">{{ titleTwo }}</h3><br>
        <span class="welcome__random"> {{ random }} </span>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2';

export default {
  name: 'home',
  data() {
    return {
      titleOne: 'Welcome',
      titleTwo: 'Here is some random string for you!',
      random: 'Wait for it...',
    };
  },
  methods: {
    getRandom() {
      this.$http
        .get('/script', {})
        .then(res => {
          if (!res) {
            Swal.fire({
              type: 'error',
              text: 'Server Error',
            });
          }
          this.random = res.data;
        })
        .catch(error => {
          if (error) {
            Swal.fire({
              type: 'error',
              title: 'Oh no ...',
              text: error,
            });
          }
        });
    },
  },
  mounted() {
    this.getRandom();
  },
};
</script>

<style scoped>
</style>
