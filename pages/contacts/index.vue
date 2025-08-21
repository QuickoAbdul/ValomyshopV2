<template>
    <section class="contact-page">
        <h1>Contact Us</h1>
        <form @submit.prevent="submitForm" class="contact-form">
            <div>
                <label for="name">Name</label>
                <input v-model="form.name" id="name" type="text" required />
            </div>
            <div>
                <label for="email">Email</label>
                <input v-model="form.email" id="email" type="email" required />
            </div>
            <div>
                <label for="message">Message</label>
                <textarea v-model="form.message" id="message" required></textarea>
            </div>
            <button type="submit">Send</button>
        </form>
        <div v-if="submitted" class="success-message">
            Thank you for contacting us!
        </div>
    </section>
</template>

<script setup>
import { ref } from 'vue'

const form = ref({
    name: '',
    email: '',
    message: ''
})

const submitted = ref(false)

function submitForm() {
    // Here you would typically send the form data to your backend
    submitted.value = true
    // Reset form if needed
    form.value = { name: '', email: '', message: '' }
}
</script>

<style scoped>
.contact-page {
    max-width: 500px;
    margin: 2rem auto;
    padding: 2rem;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}
.contact-form div {
    margin-bottom: 1rem;
}
label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 600;
}
input, textarea {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 4px;
}
button {
    padding: 0.5rem 1.5rem;
    background: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}
.success-message {
    margin-top: 1rem;
    color: #28a745;
    font-weight: bold;
}
</style>