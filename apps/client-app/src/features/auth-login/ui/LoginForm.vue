<template>
  <div class="flex items-center justify-center min-h-screen">
    <div
      class="bg-[var(--background-color)] rounded-lg shadow-lg p-6 w-full max-w-md"
      :style="{ borderColor: 'var(--card-border-color)', borderWidth: '1px' }"
    >
      <div v-if="loading">
        <ProgressBar
          class="custom-progressbar"
          mode="indeterminate"
          style="height: 5px"
        />
      </div>
      <Divider align="center" type="solid">
        <span
          class="text-xl font-bold text-[var(--text-color)] bg-[var(--background-color)]"
        >
          Вход
        </span>
      </Divider>

      <Form
        :initialValues="initialValues"
        :resolver="resolver"
        @submit="onFormSubmit"
        class="flex flex-col gap-4 w-full"
      >
        <FormField v-slot="$field" name="email" class="flex flex-col gap-1">
          <FloatLabel variant="on">
            <InputText
              class="w-full"
              type="text"
              v-model="initialValues.email"
              id="email"
            />
            <label for="email"> Username</label>
          </FloatLabel>
          <Message
            v-if="$field?.invalid"
            severity="error"
            size="small"
            variant="simple"
            >{{ $field.error?.message }}</Message
          >
        </FormField>

        <FormField v-slot="$field" name="password" class="flex flex-col gap-1">
          <FloatLabel variant="on">
            <Password
              type="text"
              id="password"
              v-model="initialValues.password"
              :feedback="true"
              :inputAttrs="{ autocomplete: 'current-password' }"
            />
            <label for="password">Пароль</label>
          </FloatLabel>
          <Message
            v-if="$field?.invalid"
            severity="error"
            size="small"
            variant="simple"
            >{{ $field.error?.message }}</Message
          >
        </FormField>
        <Message
          severity="warn"
          class="text-center text-[var(var(--border-color))]"
        >
          Забыли пароль?
          <Button
            variant="text"
            class="text-[var(--border-color)] p-0 border-0 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:shadow-none"
            style="text-decoration: underline; text-underline-offset: 4px"
            @click=""
            >Восстановить пароль</Button
          >
        </Message>
        <Button
          :disabled="loading"
          type="submit"
          class="bg-[var(--button-bg)] border-0 save-btn"
          :label="'Войти'"
        />
      </Form>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed, ref } from 'vue';
import { yupResolver } from '@primevue/forms/resolvers/yup';
import * as yup from 'yup';
import { FormField } from '@primevue/forms';
import { nextTick } from 'vue';
import {
  Button,
  DatePicker,
  Divider,
  FloatLabel,
  InputText,
  Message,
  Password,
  ProgressBar,
  Select,
} from 'primevue';
import { Form } from '@primevue/forms';

import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

import axios from 'axios';

const router = useRouter();
const loading = ref(false);
const initialValues = reactive({
  nickname: '',
  password: '',
});
const schema = computed(() => {
  const baseSchema = {
    email: yup.string().required('Укажите email'),
    // .email("Некорректный формат email"),
    password: yup
      .string()
      .min(8, 'Пароль должен содержать минимум 8 символов')
      .required('Пароль обязателен'),
  };

  return yup.object().shape(baseSchema);
});

const resolver = computed(() => yupResolver(schema.value));

const onFormSubmit = async (formData) => {};
</script>
<style>
.custom-progressbar .p-progressbar-value {
  background-color: black !important;
}
.save-btn:hover {
  filter: brightness(90%);
}
label {
  background-color: transparent;
}
.p-inputtext {
  background: var(--background-color);
}
.p-select {
  background: var(--background-color);
}
</style>
