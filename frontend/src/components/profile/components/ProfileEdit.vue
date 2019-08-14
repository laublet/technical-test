<template>
  <div class="profileEdit">
    <router-link :to="{ name: 'profileDisplay' }">
      <button class="btn btn-lg btn--menu">Your profile</button>
    </router-link>
    <router-link tag="button" class="btn btn-lg btn--menu" :to="{ name: 'profileDelete' }"
      >Delete your profile</router-link
    ><br />
    <h2 class="heading-primary">{{ title }}</h2>
    <hr />
    <div class="row profileEdit__row">
      <form v-on:submit.prevent>
        <div class="profileEdit__firstform">
          <div class="form-group">
            <label for="avatar">Avatar </label>
            <picture-input
              v-model="avatar"
              id="avatar"
              name="avatar"
              ref="pictureInput"
              @change="onChanged"
              @remove="onRemoved"
              :width="300"
              :removable="true"
              removeButtonClass="ui red button"
              :height="300"
              accept="image/jpeg, image/png, image/gif"
              buttonClass="ui button primary"
              :customStrings="{
                upload: '<h1>Upload it!</h1>',
                drag: 'Drag and drop your image here',
              }"
              :zIndex="1"
            >
            </picture-input>
          </div>
          <div class="form-group">
            <label for="username"
              >Pseudo
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
              >New Password
              <span>*</span>
            </label>
            <input
              v-model="user.password"
              id="password"
              class="form-control"
              name="password"
              type="password"
              placeholder="Your new password"
              pattern=".{5,10}"
              title="5 to 10 characters"
              required
            /><br />
          </div>
          <div class="form-group">
            <label for="confirmPassword"
              >New Password Confirmation
              <span>*</span>
            </label>
            <input
              v-model="confirmPassword"
              id="confirmPassword"
              class="form-control"
              name="confirmPassword"
              type="password"
              placeholder="Repeat your new password"
              required
            />
          </div>
        </div>
        <hr />
      </form>
    </div>
    <button class="btn btn-lg btn--white" @click="checkPassword">Confirm</button>
  </div>
</template>

<script>
import Swal from 'sweetalert2';
import PictureInput from 'vue-picture-input';

export default {
  name: 'profileEdit',
  components: {
    PictureInput,
  },
  data() {
    return {
      title: 'Edit your profile',
      user: {
        password: '',
        username: '',
        email: '',
      },
      avatar: '',
      confirmPassword: '',
      config: '',
    };
  },
  methods: {
    checkPassword() {
      if (this.password && this.confirmPassword) {
        if (this.password !== this.confirmPassword) {
          Swal.fire({
            type: 'error',
            title: 'Oups',
            text: 'You must enter your password',
          });
          return;
        }
        this.updateUser();
      } else {
        this.updateUser();
      }
    },
    updateUser() {
      const data = new FormData();

      data.append('user', JSON.stringify(this.user));
      if (this.avatar) {
        data.append('avatar', this.avatar);
      }

      this.config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      };

      this.$http
        .put('/users', data, this.config)
        .then(res => {
          if (res) {
            Swal.fire({
              type: 'success',
              title: 'Congrat !',
              text: 'Your profile has been updated',
            });
            this.$router.push('/profile');
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
    getTheUser() {
      this.$http
        .get('/users')
        .then(res => {
          this.user = res.data;
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
    onChanged() {
      if (this.$refs.pictureInput.file) this.avatar = this.$refs.pictureInput.file;
    },
    onRemoved() {
      this.avatar = '';
    },
  },
  created() {
    this.getTheUser();
  },
};
</script>

<style scoped>
</style>
