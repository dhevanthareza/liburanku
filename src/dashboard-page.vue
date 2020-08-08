<template>
  <div>
    <div class="row">
      <div class="col s12 m6">
        <div class="card blue-grey darken-1">
          <div class="card-content white-text">
            <span class="card-title">Jumlah Liburan</span>
            <h1>{{ jumlahLiburan }}</h1>
          </div>
        </div>
      </div>
      <div class="col s12 m6">
        <div class="card blue-grey darken-1">
          <div class="card-content white-text">
            <span class="card-title">Jumlah Tabungan</span>
            <h1>{{ jumlahTabungan }}</h1>
          </div>
        </div>
      </div>
  </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      jumlahLiburan: 0,
      jumlahTabungan: 0,
      dbInstance: null
    }
  },
  methods: {
    openDb() {
      const db = openDatabase(
        "liburanku",
        "1.0",
        "This is a client side database",
        2 * 1024 * 1024
      );
      this.dbInstance = db;
    },
    loadLiburan() {
      this.dbInstance.transaction((tx) => {
        tx.executeSql(
          "SELECT COUNT(*) FROM liburan",
          [],
          async (tx, results) => {
            this.jumlahLiburan = results.rows[0]['COUNT(*)']
          },
          null
        );
      });
    },
    getTabungan() {
      this.dbInstance.transaction((tx) => {
        tx.executeSql(
          "SELECT * FROM tabungan",
          [],
          async (tx, results) => {
            console.log(results.rows[0]);
            [...results.rows].forEach(element => {
              this.jumlahTabungan += parseInt(element.amount, 10)
            });
          },
          null
        );
      });
    }
  },
  created() {
    this.openDb()
    this.loadLiburan(),
    this.getTabungan()
  }
}
</script>