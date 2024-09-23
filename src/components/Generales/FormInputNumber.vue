<template>
  <div class="form-group">
    <label :for="id" class="green-label">
      {{ label }} <span v-if="required" class="required-asterisk">*</span>
    </label>
    <input
      :type="allowAlphanumeric ? 'text' : 'number'"
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
  name: "FormInputNumber",
  props: {
    label: String,
    id: String,
    required: {
      type: Boolean,
      default: false,
    },
    maxLength: {
      type: Number,
      default: 10,
    },
    minLength: {
      type: Number,
      default: 0,
    },
    allowAlphanumeric: {
      type: Boolean,
      default: false,
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
      if (this.inputValue.length > this.maxLength) {
        this.errorMessage = `El valor no puede exceder los ${this.maxLength} caracteres.`;
        this.inputValue = this.inputValue.slice(0, this.maxLength);
      } else if (this.inputValue.length < this.minLength) {
        this.errorMessage = `El valor debe tener al menos ${this.minLength} caracteres.`;
      } else {
        this.errorMessage = "";
      }

      if (!this.allowAlphanumeric && isNaN(this.inputValue)) {
        this.errorMessage = "Solo se permiten números.";
      }
    },
  },
};
</script>

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
  padding: 12px 16px;
  font-size: 16px;
  border-radius: 8px;
  border: 1px solid #ccc;
  width: 100%;
  box-sizing: border-box;
}

.green-label {
  color: rgb(72, 185, 160);
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
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
