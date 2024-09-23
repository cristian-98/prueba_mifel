<template>
  <div class="d-flex justify-center align-center" style="min-height: 100vh">
    <v-card style="width: 80%">
      <v-card-text>
        <FormDataUser />
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import FormDataUser from "@/components/DatosUsuario/FormDataUser.vue";
export default {
  name: "UserIndex",
  components: {
    FormDataUser,
  },
};
</script>

<style scoped></style>
