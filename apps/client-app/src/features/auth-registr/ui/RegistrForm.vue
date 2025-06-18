<template>
  <div class="login-container">
    <div
      class="login-card"
      :style="{ borderColor: 'var(--card-border-color)', borderWidth: '1px' }"
    >
      <AppProgressBar :loading="loading" />
      <DividerAuth title="Регистрация" />
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
            <label for="identifier"> Email</label>
          </FloatLabel>
          <MessageAuth
            :is-show="$field?.invalid"
            :message="$field.error?.message"
          />
        </FormField>
        <FormField v-slot="$field" name="nickName" class="">
          <FloatLabel variant="on">
            <InputText
              id="nickName"
              v-model="initialValues.nickName"
              class="login-input"
              type="text"
            />
            <label for="nickName"> Логин</label>
          </FloatLabel>
          <MessageAuth
            :is-show="$field?.invalid"
            :message="$field.error?.message"
          />
        </FormField>
        <FormField v-slot="$field" name="firstName" class="">
          <FloatLabel variant="on">
            <InputText
              id="firstName"
              v-model="initialValues.firstName"
              class="login-input"
              type="text"
            />
            <label for="firstName"> Имя</label>
          </FloatLabel>
          <MessageAuth
            :is-show="$field?.invalid"
            :message="$field.error?.message"
          />
        </FormField>
        <FormField v-slot="$field" name="lastName" class="">
          <FloatLabel variant="on">
            <InputText
              id="lastName"
              v-model="initialValues.lastName"
              class="login-input"
              type="text"
            />
            <label for="lastName"> Фамилия</label>
          </FloatLabel>
          <MessageAuth
            :is-show="$field?.invalid"
            :message="$field.error?.message"
          />
        </FormField>
        <FormField v-slot="$field" name="patronymic" class="">
          <FloatLabel variant="on">
            <InputText
              id="patronymic"
              v-model="initialValues.patronymic"
              class="login-input"
              type="text"
            />
            <label for="patronymic"> Отчество</label>
          </FloatLabel>
          <MessageAuth
            :is-show="$field?.invalid"
            :message="$field.error?.message"
          />
        </FormField>
        <FormField v-slot="$field" name="birthDate" class="">
          <FloatLabel variant="on">
            <DatePicker
              id="birthDate"
              v-model="initialValues.birthDate as Date"
              class="login-input"
              dateFormat="dd.mm.yy"
            />

            <label for="birthDate"> Дата Рождения</label>
          </FloatLabel>
          <MessageAuth
            :is-show="$field?.invalid"
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
            :is-show="$field?.invalid"
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
          :label="'Зарегестрироваться'"
        />
      </Form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatDate, useRegistrStore } from '@features/auth-registr';
import { FormField, Form } from '@primevue/forms';
import { yupResolver } from '@primevue/forms/resolvers/yup';

import {
  Button,
  DatePicker,
  FloatLabel,
  InputText,
  Message,
  Password,
} from 'primevue';
import { reactive, computed, ref } from 'vue';
import * as yup from 'yup';

import { RegistrData } from '@/entities/User';

import { MessageAuth, DividerAuth, AppProgressBar } from '@/shared';

import type { FormSubmitEvent } from '@primevue/forms';

const loading = ref(false);
const registrStore = useRegistrStore();
const initialValues = reactive<RegistrData>({
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  nickName: '',
  patronymic: '',
  birthDate: null,
});

const schema = computed(() => {
  const baseSchema = {
    email: yup
      .string()
      .email('Некорректный email')
      .required('Email является обязательным полем для регистрации'),
    firstName: yup
      .string()

      .required('Имя является обязательным полем для регистрации'),
    lastName: yup
      .string()
      .required('Фамилия является обязательным полем для регистрации'),
    nickName: yup
      .string()
      .transform((value) => (value === '' ? undefined : value))
      .min(3, 'Слишком короткий Логин')
      .required('Логин является обязательным полем для регистрации'),
    patronymic: yup.string(),
    birthDate: yup
      .date()
      .required('Дата Рождения является обязательным полем для регистрации'),
    password: yup
      .string()
      .matches(
        /[a-z]/,
        'Пароль должен содержать хотя бы одну строчную латинскую букву'
      )
      .matches(
        /[A-Z]/,
        'Пароль должен содержать хотя бы одну заглавную латинскую букву'
      )
      .min(8, 'Пароль должен содержать минимум 8 символов')
      .required('Пароль обязателен'),
  };
  return yup.object().shape(baseSchema);
});

const resolver = computed(() => yupResolver(schema.value));
function ResetForm() {
  (initialValues.email = ''), (initialValues.password = '');
  (initialValues.birthDate = null),
    (initialValues.firstName = ''),
    (initialValues.lastName = ''),
    (initialValues.patronymic = ''),
    (initialValues.nickName = '');
}
const onFormSubmit = async (event: FormSubmitEvent<Record<string, any>>) => {
  try {
    if (event.valid) {
      const values = event.values as RegistrData;
      const dataApi: RegistrData = {
        ...values,
        birthDate: formatDate(values.birthDate as Date),
      };
      await registrStore.registr(dataApi);
      ResetForm();
    }
  } catch (error) {
    console.error(error);
  }
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
    background-color: darken(var(--button-bg), 10%);
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
