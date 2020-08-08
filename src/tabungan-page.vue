<template>
  <div class="container">
    <form class="col s12">
      <div class="row">
        <div class="input-field col s12">
          <input id="first_name" type="text" class="validate" v-model="amount" />
          <label for="first_name">Jumlah Uang yang ingin ditabung</label>
        </div>
      </div>
    </form>
    <div class="row">
      <div class="col s6">
        <a v-if="!loading" class="btn" @click="add">Simpan</a>
        <loading-comp v-if="loading"></loading-comp>
      </div>
      <div class="col s6">
        <p>{{ message }}</p>
      </div>
    </div>
    <table class="responsive">
      <thead>
        <tr>
          <th>Jumlah Tabungan</th>
          <th>Tanggal</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="data in dataList" :key="data.id">
          <td>{{ data.amount }}</td>
          <td>{{ data.date }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import LoadingComp from './components/loading-comp.vue'
import dayjs from 'dayjs'
export default {
  components: {
    LoadingComp
  },
  data() {
    return {
      dbInstance: null,
      amount: '',
      loading: false,
      message: '',
      dataList: []
    };
  },
  methods: {
    add() {
      this.loading = true
      const date = dayjs().format('DD/MM/YYYY')
      this.dbInstance.transaction((tx) => {
        tx.executeSql(
          "CREATE TABLE IF NOT EXISTS tabungan (id INTEGER PRIMARY KEY, amount, date)"
        );
        tx.executeSql(
          `INSERT INTO tabungan (amount, date) VALUES ("${this.amount}", "${date}")`
        );
      });
      this.dataList.push({
        amount: this.amount,
        date
      })
      this.loading = false
      this.message = 'Data Berhasil disimpan'
    },
    getData() {
      this.dbInstance.transaction((tx) => {
        tx.executeSql(
          "SELECT * FROM tabungan",
          [],
          async (tx, results) => {
            console.log(results.rows);
            await Object.keys(results.rows).forEach((key) => {
              if (key !== "length") {
                this.dataList.push(results.rows[key]);
              }
            });
          },
          null
        );
      });
    },
    openDb() {
      const db = openDatabase(
        "liburanku",
        "1.0",
        "This is a client side database",
        2 * 1024 * 1024
      );
      this.dbInstance = db;
    },
  },
  created() {
    this.openDb();
    this.getData();
  },
};
</script>