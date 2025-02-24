<template>
  <div class="mt-8 mb-8">
    <form
      @submit.prevent="submitForm"
      :validation-schema="schema"
      class="flex flex-col gap-4 justify-center items-center"
    >
      <div class="flex flex-col gap-1 justify-center">
        <label for="">Name</label>
        <input
          v-model="formData.username"
          type="text"
          name="name"
          class="w-[500px] h-10 border border-black p-4"
        />
      </div>
      <div class="flex flex-col gap-1">
        <label for="">Email</label>
        <input
          v-model="formData.email"
          name="email"
          type="email"
          class="w-[500px] h-10 border border-black p-4"
        />
      </div>
      <div class="flex flex-col gap-1">
        <label for="">Age</label>
        <input
          v-model="formData.age"
          type="number"
          name="age"
          class="w-[500px] h-10 border border-black p-4"
        />
      </div>
      <div class="flex flex-col gap-1">
        <label for="">Password</label>
        <input
          v-model="formData.password"
          type="password"
          name="password"
          class="w-[500px] h-10 border border-black p-4"
        />
      </div>

      <div class="flex flex-col gap-1">
        <label for="">Password</label>
        <input
          v-model="formData.confirmPassword"
          type="password"
          name="password"
          class="w-[500px] h-10 border border-black p-4"
        />
      </div>

      <div class="flex justify-center items-center gap-6">
        <!-- <button
        class="px-6 py-3 text-center bg-black border border-white rounded-xl text-white"
      >
        Cancel
      </button> -->
        <button
          type="submit"
          class="px-6 py-3 text-center bg-green-400 border border-white rounded-xl text-white"
        >
          Submit
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";

const formData = reactive({
  username: "",
  email: "",
  age: "",
  password: "",
  confirmPassword: "",
});

const rules = {
  username: { required },
  email: { required },
  age: { required },
  password: { required },
  confirmPassword: { required },
};

const v$ = useVuelidate(rules, formData);

const submitForm = async () => {
  const result = await v$.value.$validate();
  if (result) {
    alert("form submitted");
  } else {
    alert("form not submitted");
  }
};
</script>
