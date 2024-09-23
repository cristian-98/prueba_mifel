<template>
  <div>
    <v-card class="mt-2">
      <v-card-text>
        <v-data-table
          :headers="headers"
          :items="lstUsers"
          :items-per-page="-1"
          :footer-props="{
            itemsPerPageAllText: 'Todos',
            itemsPerPageText: 'Elementos por página:',
            pageText: '{0}-{1} de {2}',
          }"
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-spacer></v-spacer>
              <v-dialog v-model="dialogDelete" max-width="550px">
                <v-card class="pa-4">
                  <v-card-title class="text-h5 text-center">
                    <v-icon large color="red" class="mr-2"
                      >mdi-alert-circle</v-icon
                    >
                    <span>¿Estás seguro de eliminar este usuario?</span>
                  </v-card-title>
                  <v-card-text class="text-h4 text-center">
                    <p class="mb-2">{{ userSelected.name }}</p>
                  </v-card-text>
                  <v-card-actions class="justify-center">
                    <v-btn
                      class="mr-4"
                      color="green darken-1"
                      variant="text"
                      @click="closeDelete"
                    >
                      <v-icon left>mdi-cancel</v-icon>
                      Cancelar
                    </v-btn>
                    <v-btn
                      color="red darken-2"
                      variant="text"
                      @click="deleteItemConfirm"
                    >
                      <v-icon left>mdi-delete</v-icon>
                      Eliminar
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-dialog v-model="dialogInfo" max-width="550px">
                <v-card class="pa-4">
                  <v-card-title class="text-h5 text-center">
                    <v-icon large color="blue" class="mr-2"
                      >mdi-alert-circle</v-icon
                    >
                    <span class="mb-2">Información</span></v-card-title
                  >
                  <v-card-text class="text-h4 text-center">
                    <p class="mb-2">{{ userSelected.name }}</p>
                    <v-container>
                      <MapIndex />
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue-darken-1" variant="text" @click="close"
                      >Cerrar</v-btn
                    >
                    <v-spacer></v-spacer>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon
              class="me-2"
              size="x-large"
              color="green darken-2"
              @click="editItem(item)"
            >
              mdi-pencil
            </v-icon>
            <v-icon size="x-large" color="red" @click="deleteItem(item)">
              mdi-delete
            </v-icon>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
import userService from "@/services/userServices";
import MapIndex from "../Map/MapIndex.vue";
import { mapState, mapActions, mapMutations, mapGetters } from "vuex";

export default {
  data: () => ({
    dialogInfo: false,
    dialogDelete: false,
    headers: [
      {
        text: "ID",
        align: "start",
        value: "id",
      },
      { text: "Name", value: "name", sortable: false },
      { text: "Email", value: "email", sortable: false },
      { text: "Website", value: "website", sortable: false },
      { text: "Actions", value: "actions", sortable: false },
    ],
    editedIndex: -1,
    editedItem: {},
    defaultItem: {
      id: "",
      name: "",
      email: "",
      website: "",
    },
  }),

  components: {
    MapIndex,
  },

  computed: {
    ...mapState({
      lstUsers: (state) => state.lstUsers,
    }),
    ...mapGetters(["getUserSelected"]),
    userSelected() {
      return this.getUserSelected;
    },
  },

  watch: {
    dialogInfo(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  async created() {
    userService.getUsers().then((data) => {
      this.setLstUsers(data.data);
    });
    this.initialize();
  },

  methods: {
    initialize() {
      //
    },

    editItem(item) {
      this.editedIndex = this.lstUsers.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.setUserSelected(item);
      this.dialogInfo = true;
    },

    deleteItem(item) {
      this.editedIndex = this.lstUsers.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.setUserSelected(item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.lstUsers.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialogInfo = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
      this.setUserSelected({});
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    ...mapActions(["setLstUsers", "setUserSelected"]),
    ...mapMutations(["SET_LSTUSERS", "SET_USERSELECTED"]),
  },
};
</script>

<style scoped></style>
