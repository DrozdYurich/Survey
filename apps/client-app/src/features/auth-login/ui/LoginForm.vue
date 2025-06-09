<template>
  <div class="login-container">
    <div
      class="login-card"
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
        <span class=""> Вход </span>
      </Divider>
      <Form
        :initialValues="initialValues"
        :resolver="resolver"
        class="login-form"
        @submit="onFormSubmit"
      >
        <FormField v-slot="$field" name="email" class="">
          <FloatLabel variant="on">
            <InputText
              id="email"
              v-model="initialValues.email"
              class="login-input"
              type="text"
            />
            <label for="email"> Username</label>
          </FloatLabel>
          <MessageAuth
            v-if="$field?.invalid"
            :message="$field.error?.message"
          />
        </FormField>

        <FormField v-slot="$field" name="password" class="">
          <FloatLabel variant="on">
            <Password
              id="password"
              v-model="initialValues.password"
              type="text"
              class="login-input"
              :feedback="true"
              :inputAttrs="{ autocomplete: 'current-password' }"
            />
            <label for="password">Пароль</label>
          </FloatLabel>

          <MessageAuth
            v-if="$field?.invalid"
            :message="$field.error?.message"
          />
        </FormField>
        <Message severity="warn" class="login-forgot-password">
          Забыли пароль?
          <Button
            variant="text"
            class=""
            style="text-decoration: underline; text-underline-offset: 4px"
            @click=""
            >Восстановить пароль</Button
          >
        </Message>
        <Button
          :disabled="loading"
          type="submit"
          class="login-submit-button"
          :label="'Войти'"
        />
      </Form>
    </div>
  </div>
</template>

<script setup>
import { FormField, Form } from '@primevue/forms';
import { yupResolver } from '@primevue/forms/resolvers/yup';
import {
  Button,
  Divider,
  FloatLabel,
  InputText,
  Message,
  Password,
  ProgressBar,
} from 'primevue';
import { reactive, computed, ref } from 'vue';
import * as yup from 'yup';

import { MessageAuth } from '@/shared';

const loading = ref(false);
const initialValues = reactive({
  nickname: '',
  password: '',
});
const schema = computed(() => {
  const baseSchema = {
    email: yup.string().required('Укажите email'),

    password: yup
      .string()
      .min(8, 'Пароль должен содержать минимум 8 символов')
      .required('Пароль обязателен'),
  };

  return yup.object().shape(baseSchema);
});

const resolver = computed(() => yupResolver(schema.value));

const onFormSubmit = async (formData) => {
  console.log(formData);
};
</script>
<style>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: var(--background-color);
  padding: 2rem;
}

.login-card {
  width: 100%;
  max-width: 400px;
  padding: 2rem;
  border: 1px solid var(--card-border-color);
  border-radius: 0.5rem;
  background-color: var(--background-color);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}
.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.login-input {
  width: 100%;
  border-radius: 0.375rem;
  background-color: var(--background-color);
  color: var(--text-color);
  transition: border-color 0.2s ease-in-out;
}

.login-forgot-password {
  text-align: left;
}
.login-submit-button {
  background-color: var(--button-bg);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 0.375rem;
  font-weight: 500;
  transition: background-color 0.2s ease-in-out;

  &:not(:disabled):hover {
    background-color: darken(
      var(--button-bg),
      10%
    ); /* Затемняем кнопку при наведении */
    cursor: pointer;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}
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
  width: 100%;
  background: var(--background-color);
}
.p-select {
  background: var(--background-color);
}
</style>
