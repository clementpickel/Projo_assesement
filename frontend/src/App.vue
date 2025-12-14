<template>
  <div class="container">
    <h1>Word to Image</h1>

    <form @submit.prevent="generateImage">
      <input
        v-model="word"
        type="text"
        placeholder="Enter a word"
        required
      />
      <button :disabled="loading">
        {{ loading ? 'Generating…' : 'Generate' }}
      </button>
    </form>

    <div v-if="error" class="error">{{ error }}</div>

    <div v-if="loading" class="loading-container">
      <img src="./assets/Pixel 3D GIF by Loading Artist.gif" alt="Loading..." class="loading-gif" />
    </div>

    <div v-if="imageUrl" class="image-container">
      <img :src="imageUrl" alt="Generated result" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { generateImage as generateImageAPI } from './service/apiService';
import './App.css';

const word = ref('');
const imageUrl = ref(null);
const loading = ref(false);
const error = ref(null);

async function generateImage() {
  loading.value = true;
  error.value = null;
  imageUrl.value = null;

  try {
    const blob = await generateImageAPI(word.value);
    imageUrl.value = URL.createObjectURL(blob);
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
}
</script>
