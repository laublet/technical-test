<template>
  <div class="auth">
    <form v-on:submit.prevent>
      <div class="row">
        <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
          <h1 class="heading-primary">{{ title }}</h1>
          <hr />
          <div class="form-group">
            <label for="username"
              >Username
              <span>*</span>
            </label>
            <input
              v-model="user.username"
              id="username"
              class="form-control"
              name="username"
              type="text"
              placeholder="Choose an username"
              required
            />
          </div>
          <div class="form-group">
            <label for="email"
              >Email
              <span>*</span>
            </label>
            <input
              v-model="user.email"
              id="email"
              class="form-control"
              name="email"
              type="email"
              placeholder="email@example.com"
              required
            />
          </div>
          <div class="form-group">
            <label for="password"
              >Password
              <span>*</span>
            </label>
            <input
              v-model="user.password"
              id="password"
              name="password"
              class="form-control"
              type="password"
              placeholder="Must contain 5 to 10 characters"
              pattern=".{5,10}"
              title="5 to 10 characters"
              required
            />
          </div>
          <div class="form-group">
            <label for="confirmPassword"
              >Password Confirmation
              <span>*</span>
            </label>
            <input
              v-model="confirmPassword"
              id="confirmPassword"
              class="form-control"
              name="confirmPassword"
              type="password"
              placeholder="Confirm password"
              required
            />
          </div>
          <router-link tag="button" class="btn btn-lg btn--white" :to="{ name: 'login' }"
            >Go to Login</router-link
          >
          <button class="btn btn-lg btn--white" @click="check">Sign In</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import Swal from 'sweetalert2';

export default {
  name: 'signup',
  data() {
    return {
      title: 'Signup',
      user: {
        email: '',
        username: '',
        password: '',
      },
      confirmPassword: '',
    };
  },
  methods: {
    signIn() {
      this.$http
        .post('/users/signup', this.user)
        .then(res => {
          if (res) {
            console.log('res', res.data);
            Swal.fire({
              type: 'success',
              title: 'Congrat ! Your Profile has been created',
              text: res.data.message,
            });
            this.$router.push('/');
          } else {
            Swal.fire({
              type: 'error',
              text: 'Server Error',
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
          }
        });
    },
    check() {
      if (this.user.password === this.confirmPassword) {
        this.signIn();
      } else {
        Swal.fire({
          type: 'error',
          title: 'Oups',
          text: 'You must enter the same password twice',
        });
      }
    },
  },
};
</script>

<style scoped>
</style>
