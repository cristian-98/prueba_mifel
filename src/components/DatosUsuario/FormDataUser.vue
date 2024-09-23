<template>
  <div>
    <v-card class="mt-2">
      <v-card-text>
        <h1 class="title-center">Identificación</h1>
        <form @submit.prevent="submit">
          <v-container class="bg-surface-variant">
            <v-row>
              <v-col cols="4" md="4">
                <FormInputText
                  label="Nombre"
                  id="nombre"
                  required
                  v-model="formData.nombre"
                />
              </v-col>
              <v-col cols="4" md="4">
                <FormInputText
                  label="Primer apellido"
                  id="primerApellido"
                  required
                  v-model="formData.primerApellido"
                />
              </v-col>
              <v-col cols="4" md="4">
                <FormInputText
                  label="Segundo apellido"
                  id="segundoApellido"
                  required
                  v-model="formData.segundoApellido"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6" md="6">
                <FormInputText
                  label="CURP"
                  id="curp"
                  required
                  :validationSpecial="/^[A-Z]{4}\d{6}[HM][A-Z]{5}\d{2}$/"
                  v-model="formData.curp"
                />
              </v-col>
              <v-col cols="6" md="6">
                <FormInputText
                  label="RFC (con homoclave)"
                  id="rfc"
                  required
                  :validationSpecial="/^[A-ZÑ&]{4}\d{6}[A-Z0-9]{3}$/"
                  v-model="formData.rfc"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6" md="2">
                <FormInputNumber
                  label="Código postal"
                  id="codigoPostal"
                  :maxLength="5"
                  :minLength="5"
                  required
                  v-model="formData.codigoPostal"
                />
              </v-col>
              <v-col cols="6" md="10">
                <FormInputText
                  label="Calle"
                  id="calle"
                  required
                  v-model="formData.calle"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6" md="3">
                <FormInputNumber
                  label="Número exterior"
                  id="numExterior"
                  :maxLength="5"
                  :minLength="0"
                  required
                  v-model="formData.numExterior"
                />
              </v-col>
              <v-col cols="6" md="3">
                <FormInputNumber
                  label="Número interior"
                  id="numInterior"
                  :allowAlphanumeric="true"
                  required
                  v-model="formData.numInterior"
                />
              </v-col>
              <v-col cols="6" md="6">
                <FormInputText
                  label="Estado"
                  id="estado"
                  required
                  v-model="formData.estado"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6" md="6">
                <FormInputText
                  label="Delegación / Municipio"
                  id="delegacion"
                  required
                  v-model="formData.delegacion"
                />
              </v-col>
              <v-col cols="6" md="6">
                <FormInputText
                  label="Colonia"
                  id="colonia"
                  required
                  v-model="formData.colonia"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="12">
                <TableUsers />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="12" class="d-flex justify-center">
                <v-btn class="me-4 custom-btn" type="submit"> Guardar </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </form>
      </v-card-text>
    </v-card>
    <v-dialog v-model="dialog" max-width="400">
      <v-card>
        <v-card-title class="headline text-h5 text-center">{{
          dialogTitle
        }}</v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12">
              <v-list dense>
                <v-list-item v-for="(error, index) in errorsLst" :key="index">
                  <v-list-item-content>
                    <v-list-item-title>{{ error }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="dialog = false">Cerrar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import FormInputText from "@/components/Generales/FormInputText.vue";
import FormInputNumber from "@/components/Generales/FormInputNumber.vue";
import TableUsers from "./TableUsers.vue";
import userServices from "@/services/userServices";

export default {
  data() {
    return {
      formData: {
        nombre: "",
        primerApellido: "",
        segundoApellido: "",
        curp: "",
        rfc: "",
        codigoPostal: "",
        calle: "",
        numExterior: "",
        numInterior: "",
        estado: "",
        delegacion: "",
        colonia: "",
      },
      errors: {
        nombre: [],
        primerApellido: [],
        segundoApellido: [],
        curp: [],
        rfc: [],
        codigoPostal: [],
        calle: [],
        numExterior: [],
        numInterior: [],
        estado: [],
        delegacion: [],
        colonia: [],
      },
      formDataDefault: {
        nombre: "",
        primerApellido: "",
        segundoApellido: "",
        curp: "",
        rfc: "",
        codigoPostal: "",
        calle: "",
        numExterior: "",
        numInterior: "",
        estado: "",
        delegacion: "",
        colonia: "",
      },
      dialog: false,
      dialogTitle: "",
      errorsLst: [],
    };
  },
  methods: {
    validate() {
      let isValid = true;
      this.errors = {
        nombre: [],
        primerApellido: [],
        segundoApellido: [],
        curp: [],
        rfc: [],
        codigoPostal: [],
        calle: [],
        numExterior: [],
        numInterior: [],
        estado: [],
        delegacion: [],
        colonia: [],
      };
      if (!this.formData.nombre.match(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)) {
        this.errors.nombre.push("El Nombre solo permite letras.");
        isValid = false;
      }
      if (!this.formData.primerApellido.match(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)) {
        this.errors.primerApellido.push(
          "El Primer Apellido solo permite letras."
        );
        isValid = false;
      }
      if (!this.formData.segundoApellido.match(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)) {
        this.errors.segundoApellido.push(
          "El Segundo Apellido solo permite letras."
        );
        isValid = false;
      }
      if (!this.formData.estado.match(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)) {
        this.errors.estado.push("El Estado solo permite letras.");
        isValid = false;
      }
      if (!this.formData.delegacion.match(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)) {
        this.errors.delegacion.push("La Delegación solo permite letras.");
        isValid = false;
      }
      if (!this.formData.colonia.match(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)) {
        this.errors.colonia.push("La Colonia solo permite letras.");
        isValid = false;
      }
      if (!this.formData.curp.match(/^[A-Z]{4}\d{6}[HM][A-Z]{5}\d{2}$/)) {
        this.errors.curp.push("El CURP es inválido.");
        isValid = false;
      }
      if (!this.formData.rfc.match(/^[A-ZÑ&]{4}\d{6}[A-Z0-9]{3}$/)) {
        this.errors.rfc.push("El RFC es inválido.");
        isValid = false;
      }
      if (this.formData.codigoPostal.length !== 5) {
        this.errors.codigoPostal.push("El Código Postal debe tener 5 dígitos.");
        isValid = false;
      }
      if (this.formData.numExterior.length > 5) {
        this.errors.codigoPostal.push(
          "El Numero Exterior debe tener 5 dígitos."
        );
        isValid = false;
      }

      return isValid;
    },
    generateErrorList() {
      let errorList = [];
      Object.keys(this.errors).forEach((key) => {
        if (this.errors[key].length > 0) {
          this.errors[key].forEach((error) => {
            errorList.push(error);
          });
        }
      });
      return errorList;
    },
    async submit() {
      this.errorsLst = [];
      if (this.validate()) {
        this.dialogTitle = "Campos validados correctamente";
        this.dialog = true;
        let dataCopy = {
          infoUsuario: {
            nombre: this.formData.nombre,
            primerApellido: this.formData.primerApellido,
            segundoApellido: this.formData.segundoApellido,
            curp: this.formData.curp,
            rfc: this.formData.rfc,
          },
          Domicilio: {
            codigoPostal: this.formData.codigoPostal,
            calle: this.formData.calle,
            numExterior: this.formData.numExterior,
            numInterior: this.formData.numInterior,
            estado: this.formData.estado,
            delegacion: this.formData.delegacion,
            colonia: this.formData.colonia,
          },
        };
        let dataToTable = {
          id: this.$store.state.lstUsers.length + 1,
          name: this.formData.nombre,
          username: this.formData.primerApellido,
          email: this.formData.segundoApellido,
          address: {
            street: this.formData.calle,
            suite: this.formData.numExterior,
            city: this.formData.delegacion,
            zipcode: this.formData.codigoPostal,
            geo: {
              lat: "19.762850",
              lng: "-98.962170",
            },
          },
          phone: "1234567890",
          website: "www.google.com",
          company: {
            name: "Google",
            catchPhrase: "Don't be evil",
            bs: "search",
          },
        };
        const response = await userServices.createUser(dataCopy);
        if (response.status === 200) {
          this.dialogTitle = "Usuario creado correctamente";
          this.errorsLst = [];
          this.dialog = true;
          this.$store.commit("SET_USERTOLSTUSERS", dataToTable);
          this.formData = Object.assign({}, this.formDataDefault);
        } else {
          this.dialogTitle = "Error al crear usuario";
          this.dialog = true;
        }
      } else {
        this.dialogTitle = "Existen campos por validar";
        this.dialog = true;
        this.errorsLst = this.generateErrorList();
      }
    },
  },
  name: "FormDataUser",
  components: {
    FormInputText,
    FormInputNumber,
    TableUsers,
  },
};
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

button {
  padding: 5px 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  background-color: #f0f0f0;
  cursor: pointer;
}

.title-center {
  text-align: center;
}

.custom-btn {
  background-color: #1157a2 !important;
  color: #ffffff;
}

.title-center {
  text-align: center;
}

.custom-btn {
  background-color: #1157a2 !important;
  color: #ffffff;
}
</style>
