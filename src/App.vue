<template>
  <div class="mb-8 flex flex-col gap-4">
    <nav
      class="flex fixed top-0 left-0 w-full justify-end flex-row gap-5 items-center pr-6 bg-[#214885] h-20"
    >
      <button
        class="text-white font-semibold font-sans"
        @click="switchLanguage"
      >
        {{ locale === "en" ? "EN - English" : "IT - Italian" }}
      </button>
    </nav>
    <div class="mt-28">
      <form
        @submit.prevent="submitForm"
        class="flex flex-col gap-4 justify-center items-center"
      >
        <div class="flex justify-center items-center">
          <h1 class="text-2xl">{{ t("registration") }}</h1>
        </div>
        <div class="flex flex-col gap-1 justify-center">
          <label for="">{{ t("username") }}</label>
          <input
            v-model="formData.username"
            type="text"
            name="username"
            class="w-[500px] h-10 border border-black p-4"
          />

          <ul
            class="flex flex-col"
            v-for="error in v$.username.$errors"
            :key="error.$uid"
          >
            <li class="text-red-500 font-sans font-semibold">
              {{ error.$message }}
            </li>
          </ul>
        </div>
        <div class="flex flex-col gap-1">
          <label for="">{{ t("emailaddress") }}</label>
          <input
            v-model="formData.email"
            name="email"
            type="email"
            class="w-[500px] h-10 border border-black p-4"
          />
          <ul
            class="flex flex-col"
            v-for="error in v$.email.$errors"
            :key="error.$uid"
          >
            <li class="text-red-500 font-sans font-semibold">
              {{ error.$message }}
            </li>
          </ul>
        </div>
        <div class="flex flex-col gap-1">
          <label for="">{{ t("age") }}</label>
          <input
            v-model="formData.age"
            type="number"
            name="age"
            class="w-[500px] h-10 border border-black p-4"
          />
          <ul
            class="flex flex-col"
            v-for="error in v$.age.$errors"
            :key="error.$uid"
          >
            <li class="text-red-500 font-sans font-semibold">
              {{ error.$message }}
            </li>
          </ul>
        </div>
        <div class="flex flex-col gap-1">
          <label for="">{{ t("password") }}</label>
          <input
            v-model="formData.password"
            type="password"
            name="password"
            class="w-[500px] h-10 border border-black p-4"
          />
          <ul
            class="flex flex-col"
            v-for="error in v$.password.$errors"
            :key="error.$uid"
          >
            <li class="text-red-500 font-sans font-semibold">
              {{ error.$message }}
            </li>
          </ul>
        </div>

        <div class="flex flex-col gap-1">
          <label for="">{{ t("confirmPassword") }}</label>
          <input
            v-model="formData.confirmPassword"
            type="password"
            name="password"
            class="w-[500px] h-10 border border-black p-4"
          />
          <ul
            class="flex flex-col"
            v-for="error in v$.confirmPassword.$errors"
            :key="error.$uid"
          >
            <li class="text-red-500 font-sans font-semibold">
              {{ error.$message }}
            </li>
          </ul>
        </div>

        <div class="flex mt-4 justify-center items-center gap-6">
          <button
            type="submit"
            class="px-6 py-3 text-center bg-[#214885] border border-white rounded-xl text-white"
          >
            {{ t("submit") }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed } from "vue";
import { toast } from "vue3-toastify";
import useVuelidate from "@vuelidate/core";
import {
  required,
  minLength,
  email,
  sameAs,
  helpers,
  numeric,
} from "@vuelidate/validators";
import { useI18n } from "vue-i18n";

const { t, locale, availableLocales } = useI18n({
  useScope: "global",
});

const switchLanguage = () => {
  locale.value = locale.value === "en" ? "it" : "en";
};

const formData = reactive({
  username: "",
  email: "",
  age: "",
  password: "",
  confirmPassword: "",
});

const minAge = (value) => {
  return value >= 18;
};

const containsUser = (value) => {
  return value.includes("user");
};

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const emailValidation = (value) => {
  if (!value) return true; // If the email field is empty, skip the validation
  return emailRegex.test(value) || "Invalid email address"; // Check regex pattern
};

const rules = computed(() => {
  return {
    username: {
      minLength: minLength(10),
      containsUser: helpers.withMessage("Username is invalid", containsUser),
    },
    email: {
      required,
      emailValidation: helpers.withMessage(
        "Email has to be proper format",
        emailValidation
      ),
    },
    age: {
      required,
      numeric,
      minAge: helpers.withMessage("Age has to be above 18", minAge),
    },
    password: { required, minLength: minLength(8) },
    confirmPassword: { required, sameAs: sameAs(formData.password) },
  };
});

const v$ = useVuelidate(rules, formData);

const submitForm = async () => {
  const result = await v$.value.$validate();
  if (result) {
    toast("Your registration is in process ! Hold tight", {
      theme: "colored",
      type: "success",
      transition: "zoom",
      position: "top-center",
      dangerouslyHTMLString: true,
    });
  } else {
    toast("Errors in filling form !", {
      theme: "colored",
      type: "error",
      transition: "zoom",
      position: "top-center",
      dangerouslyHTMLString: true,
    });
  }
};
</script>
