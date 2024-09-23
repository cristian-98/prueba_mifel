<template>
  <div class="form-group">
    <label :for="id" class="green-label">
      {{ label }} <span v-if="required" class="required-asterisk">*</span>
    </label>
    <input
      :type="type"
      :id="id"
      :name="id"
      v-model="inputValue"
      class="custom-input"
      @input="onInput"
    />
    <small v-if="errorMessage" class="error-message">{{ errorMessage }}</small>
  </div>
</template>

<script>
export default {
  name: "FormInputText",
  props: {
    label: String,
    type: {
      type: String,
      default: "",
    },
    id: String,
    required: {
      type: Boolean,
      default: false,
    },
    validationSpecial: {
      type: RegExp,
      default() {
        return /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
      },
    },
    value: String,
  },
  data() {
    return {
      inputValue: this.value || "",
      errorMessage: "",
    };
  },
  watch: {
    value(newValue) {
      this.inputValue = newValue;
    },
  },
  methods: {
    onInput() {
      this.validateInput();
      this.$emit("input", this.inputValue);
    },
    validateInput() {
      if (
        this.validationSpecial &&
        !this.validationSpecial.test(this.inputValue)
      ) {
        this.errorMessage = `El formato de ${this.label} es incorrecto.`;
      } else {
        this.errorMessage = "";
      }
    },
  },
};
</script>

<style scoped>
.error-message {
  color: red;
  font-size: 12px;
}
</style>

<style scoped>
div {
  margin: 10px 0;
}

label {
  margin-right: 10px;
}

input {
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.custom-input {
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  padding: 12px 16px;
  font-size: 16px;
  border-radius: 8px;
  width: 100%;
  box-sizing: border-box;
}

.green-label {
  color: rgb(72, 185, 160);
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-left: 10px;
}

.required-asterisk {
  color: rgb(72, 185, 160);
  margin-left: 5px;
}

.error-message {
  color: red;
  font-size: 12px;
}
</style>
