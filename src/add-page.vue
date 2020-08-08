<template>
  <div>
    <div class="row">
      <form class="col s12">
        <div class="input-field col s12">
          <input id="first_name" type="text" class="validate" v-model="detail.name" />
          <label for="first_name">Nama Tempat</label>
        </div>
        <div class="input-field col s12">
          <select ref="select" v-model="detail.category">
            <option value disabled selected>Pilih Kategori</option>
            <option>Gunung</option>
            <option>Pantai</option>
            <option>Kuliner</option>
          </select>
          <label>Pilih Kategori</label>
        </div>
        <div class="input-field col s12">
          <span class="prefix">Rp.</span>
          <input id="biaya" type="tel" class="validate" v-model="detail.price" />
          <label for="biaya">Perkiraan Biaya</label>
        </div>
        <div class="file-field input-field col s12">
          <div class="btn">
            <span>File</span>
            <input @change="handleImage" type="file" ref="imageInput" accept="image/*" />
          </div>
          <div class="file-path-wrapper">
            <input class="file-path validate" ref="imageText" type="text" />
          </div>
        </div>
      </form>
      <div class="row mt5">
        <div class="col s6">
          <a v-if="!loading" class="btn" @click="add">Simpan</a>
          <loading-comp v-if="loading"></loading-comp>
        </div>
        <div class="col s6">
          <h4>{{ message }}</h4>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import LoadingComp from './components/loading-comp.vue'
export default {
  components: {
    LoadingComp
  },
  data() {
    return {
      detail: {},
      message: "",
      loading: false,
      dbInstance: null,
    };
  },
  methods: {
    initSelect() {
      const elem = this.$refs.select;
      this.sideNavInstance = M.FormSelect.init(elem);
    },
    add() {
      this.loading = true
      this.dbInstance.transaction((tx) => {
        tx.executeSql(
          "CREATE TABLE IF NOT EXISTS liburan (id INTEGER PRIMARY KEY, name, category, price, image)"
        );
        tx.executeSql(
          `INSERT INTO liburan (name, category, price, image) VALUES ("${this.detail.name}", "${this.detail.category}", "${this.detail.price}", "${this.detail.image}")`
        );
      });
      this.loading = false
      this.message = 'Data Berhasil disimpan'
    },
    handleImage(element) {
      const selectedImage = element.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        this.detail.image = e.target.result;
        this.image = e.target.result;
      };
      reader.readAsDataURL(selectedImage);
      console.log(this.detail);
    },
    openDatabase() {
      const db = openDatabase(
        "liburanku",
        "1.0",
        "This is a client side database",
        2 * 1024 * 1024
      );
      this.dbInstance = db;
    },
  },
  mounted() {
    this.openDatabase();
    this.initSelect();
  },
};
</script>