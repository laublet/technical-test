<template>
  <div>
    <router-link :to="{ name: 'profileEdit' }">
      <button class="btn btn-lg btn--menu">Edit your profile</button>
    </router-link>
    <router-link tag="button" class="btn btn-lg btn--menu" :to="{ name: 'profileDelete' }"
      >Delete your profile</router-link
    ><br />
    <h2 class="heading-primary">{{ title }}</h2>
    <div class="profileDisplay">
      <hr />
      <img
        :src="url + this.user.avatar"
        class="profileDisplay__img"
        alt="User Avatar"
        v-if="userAvatar"
      />
      <img
        class="profileDisplay__img"
        src="@/assets/default_avatar.jpeg"
        alt="User Avatar default"
        v-else
      />
      <div class="profileDisplay__content">
        <p><span>Username: </span>{{ user.username }}</p>
        <p><span>Email: </span>{{ user.email }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import swal from 'sweetalert2';
import PictureInput from 'vue-picture-input';
import constants from '@/constants';

export default {
  name: 'profileDisplay',
  components: {
    PictureInput,
  },
  data() {
    return {
      title: 'Welcome to your profile!',
      user: {
        username: '',
        email: '',
        avatar: '',
      },
      url: constants.URL_AVATAR,
    };
  },
  computed: {
    userAvatar() {
      if (this.user.avatar) {
        return true;
      }
      return false;
    },
  },
  methods: {
    getTheUser() {
      this.$http
        .get('/users')
        .then(res => {
          this.user = res.data;
        })
        .catch(error => {
          if (error) {
            swal({
              type: 'error',
              title: 'Oh no ...',
              text: error,
            });
          }
        });
    },
    onChanged() {
      if (this.$refs.pictureInput.file) this.picture = this.$refs.pictureInput.file;
    },
    onRemoved() {
      this.picture = '';
    },
  },
  created() {
    this.getTheUser();
  },
};
</script>

<style scoped>
</style>
