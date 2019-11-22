<template>
  <div>
    <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
      <!-- Card stats -->
      <div class="row">
        <div class="col-xl-3 col-lg-6"></div>
      </div>
    </base-header>

    <!--Charts-->
    <div class="container-fluid mt--7">
      <!-- End charts-->

      <!--Tables-->
      <div class="row mt-5">
        <div class="col-xl-12">
          <produtos-table></produtos-table>
        </div>
      </div>
      <!--End tables-->
    </div>
  </div>
</template>
<script>
// Tables
import ProdutosTable from "./Dashboard/ProdutosTable";

export default {
  components: {
    EntradasTable,
    ProdutosTable
  },
  data() {
    return {};
  },
  methods: {},
  mounted() {}
};
</script>
<style></style>
