<template>
    <section>
        <b-field label="Password" :message="errors.password" :type="(errors.password) ? 'is-danger' : ''">
            <b-input
                type="password"
                v-model="formValues.password"
                password-reveal
                placeholder="Your password"
                required>
            </b-input>
        </b-field>

        <b-field label="Confirm password" :message="errors.password" :type="(errors.password) ? 'is-danger' : ''">
            <b-input
                type="password"
                v-model="formValues.password_confirmation"
                password-reveal
                placeholder="Confirm password"
                required>
            </b-input>
        </b-field>

        <b-button class="button is-primary" @click="handlePasswordReset" :loading="loading">Reset password</b-button>
    </section>
</template>

<script>
import PasswordHttp from "~/services/PasswordHttp"

export default {
    created() {
        this.passwordHttp = new PasswordHttp()
    },
    data() {
        return {
            loading: false,
            formValues: {
                password: process.env.password,
                password_confirmation: process.env.password
            },
            errors: false
        }
    },
    methods: {
        handlePasswordReset() {
            this.loading = true
            this.errors = false
            
            this.passwordHttp.reset({
                email: this.$attrs.user.email,
                password: this.formValues.password,
                password_confirmation: this.formValues.password_confirmation,
                token: this.$attrs.user.token
            })
            .then(result => {
                this.$toast.open({
                    duration: 5000,
                    message: 'Password successfully changed. Please login again.',
                    type: 'is-success'
                })

                this.loading = false

                this.$router.push({ name: 'index' })
            })
            .catch(error => {
                this.errors = error.response.data.errors

                this.$toast.open({
                    duration: 5000,
                    message: error.response.data.message,
                    position: 'is-top',
                    type: 'is-danger'
                })

                this.loading = false
            })
        }
    },
}
</script>