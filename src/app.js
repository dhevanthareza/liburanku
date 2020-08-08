import Vue from 'vue'
import AddPage from './add-page.vue'
import DashboardPage from './dashboard-page.vue'
import ListPage from './list-page.vue'
import TabunganPage from './tabungan-page.vue'
// import 'materialize-css/dist/css/materialize.min.css'
import 'materialize-css/dist/js/materialize.min.js'
const liburanku = new Vue({
    components: { AddPage, DashboardPage, ListPage, TabunganPage },
    el: "#liburanku",
    data: {
      message: "Hello Vue!",
      sideNavInstance: null,
      currentPage: 'dashboard-page',
      pageList: [
          {
              title: 'Dashboard',
              page: 'dashboard-page'
          },
          {
              title: 'Tambah Liburan',
              page: 'add-page'
          },
          {
              title: 'Daftar Liburan',
              page: 'list-page'
          },
          {
              title: 'Tabungan',
              page: 'tabungan-page'
          }
      ]
    },
    methods: {
        initSideNav() {
            const elem = this.$refs.sidenav
            this.sideNavInstance = M.Sidenav.init(elem);
        },
    },
    mounted() {
        this.initSideNav()
    }
  });