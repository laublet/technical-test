<template>
  <div class="profileEdit">
    <router-link :to="{ name: 'profileDisplay' }">
      <button class="btn btn-lg btn--menu">Your profile</button>
    </router-link>
    <router-link :to="{ name: 'profileEdit' }">
      <button class="btn btn-lg btn--menu">Edit your profile</button> </router-link
    ><br />
    <h2 class="heading-primary">You are about to delete your profile</h2>
    <hr />
    <div class="row profileEdit__row">
      <form v-on:submit.prevent>
        <div class="profileEdit__firstform">
          <div class="form-group">
            <label for="email">Email <span>*</span> </label>
          </div>
          <input
            v-model="email"
            id="email"
            class="form-control"
            name="email"
            type="email"
            placeholder="Email"
            required
          /><br />
          <div class="form-group">
            <label for="password">Password <span>*</span> </label>
          </div>
          <input
            v-model="password"
            id="password"
            class="form-control"
            name="password"
            type="password"
            placeholder="Password"
            pattern=".{5,10}"
            title="5 to 10 characters"
            required
          /><br />
          <div class="form-group">
            <label for="confirmPassword">Confirm Password <span>*</span> </label>
            <input
              v-model="confirmPassword"
              id="confirmPassword"
              class="form-control"
              name="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              required
            />
          </div>
        </div>
        <hr />
      </form>
    </div>
    <button class="btn btn-lg btn--white" @click="check">Confirm</button>
  </div>
</template>

<script>
import Swal from 'sweetalert2';

export default {
  name: 'profileConfirm',
  data() {
    return {
      title: 'Delete your profile permanently',
      email: '',
      password: '',
      confirmPassword: '',
    };
  },
  methods: {
    check() {
      if (!this.password && !this.confirmPassword) {
        Swal.fire({
          type: 'error',
          title: 'Oups',
          text: 'You must fill ',
        });
      }
      this.deleteUser(this.password);
    },

    deleteUser(passwordConfirmed) {
      this.$http
        .delete('/users/deleteUser', { data: { email: this.email, password: passwordConfirmed } })
        .then(res => {
          if (res) {
            Swal.fire({
              type: 'success',
              title: 'Congrat !',
              text: res.data,
            });
            this.$router.push('/login');
          } else {
            Swal.fire({
              type: 'error',
              text: 'Server error',
            });
          }
        })
        .catch(error => {
          if (error) {
            Swal.fire({
              type: 'error',
              title: 'Oh no ...',
              text: error,
            });
          } else {
            Swal.fire({
              type: 'error',
              text: 'Cannot catch error',
            });
          }
        });
    },
  },
};
</script>

<style scoped>
</style>
