<template>
  <div>
    <div class="userslist">
      <h2 class="heading-primary">{{ title }}</h2>
      <div class="row userslist__row">
        <div class="col-xs-12">
          <v-client-table :columns="columns" :data="users" :options="options"> </v-client-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2';

export default {
  name: 'usersList',
  data() {
    return {
      title: 'Here is your AwesomeUsersList',
      users: [],
      // vue-tables-2 datas
      columns: ['id', 'first_name', 'last_name', 'email', 'gender', 'ip_address'],
      options: {
        headings: {
          id: 'User id',
          first_name: 'First Name',
          last_name: 'Last Name',
          email: 'Email',
          gender: 'Gender',
          ip_address: 'IP adress',
        },
        sortable: ['id', 'first_name', 'last_name', 'email', 'gender', 'ip_address'],
        filterable: ['id', 'first_name', 'last_name', 'email', 'gender', 'ip_address'],
      },
    };
  },
  methods: {
    getUsers() {
      this.$http
        .get('/csv', {})
        .then(res => {
          if (!res) {
            Swal.fire({
              type: 'error',
              text: 'Server Error',
            });
          }

          this.users = res.data.users;
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
  beforeMount() {
    this.getUsers();
  },
};
</script>

<style scoped>
</style>
