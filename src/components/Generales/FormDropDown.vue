<template>
  <div class="form-group">
    <label :for="id" class="green-label">
      {{ label }} <span v-if="required" class="required-asterisk">*</span>
    </label>
    <select :id="id" :name="id" :required="required" class="custom-select">
      <option disabled value="">Selecciona una opción</option>
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.text }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: "FormDropDown",
  props: {
    label: String,
    id: String,
    required: {
      type: Boolean,
      default: false,
    },
    options: {
      type: Array,
      required: true,
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
.green-label {
  color: rgb(72, 185, 160);
}

.custom-select {
  background-color: #f0f0f0;
  padding: 12px 16px;
  font-size: 16px;
  border-radius: 8px;
  border: 1px solid #ccc;
  width: 100%;
  box-sizing: border-box;
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
</style>
