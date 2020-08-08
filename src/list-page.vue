<template>
  <div class="container">
    <table class="responsive">
      <thead>
        <tr>
          <th>Nama Tempat</th>
          <th>Kategori</th>
          <th>Kebutuhan Biaya</th>
          <th>Foto</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="data in dataList" :key="data.id">
          <td>{{ data.name }}</td>
          <td>{{ data.category }}</td>
          <td>{{ data.price }}</td>
          <td><img width="100" :src="data.image"/></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dbInstance: null,
      dataList: [],
    };
  },
  methods: {
    loadData() {
      console.log(this.dbInstance);
      this.dbInstance.transaction((tx) => {
        tx.executeSql(
          "SELECT * FROM liburan",
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
    this.loadData();
  },
};
</script>