<template>
    <div class="modal-card">
        <header class="modal-card-head">
            <p class="modal-card-title">{{ (!passwordReset) ? 'Login' : 'Reset password' }}</p>
        </header>

        <section v-if="!passwordReset" class="modal-card-body">
            <b-field label="Email">
                <b-input
                    type="email"
                    v-model="formValues.email"
                    placeholder="Your email"
                    required>
                </b-input>
            </b-field>

            <b-field label="Password">
                <b-input
                    type="password"
                    v-model="formValues.password"
                    password-reveal
                    placeholder="Your password"
                    required>
                </b-input>
            </b-field>

            <nuxt-link @click.native="passwordReset = true" to="">Forgot password?</nuxt-link>
        </section>

        <section v-if="passwordReset" class="modal-card-body">
            <b-field label="Email">
                <b-input
                    type="email"
                    v-model="formValues.email"
                    placeholder="Your email"
                    required>
                </b-input>
            </b-field>

            <nuxt-link @click.native="passwordReset = false" to="">Back</nuxt-link>
        </section>

        <footer class="modal-card-foot">
            <b-button class="button" @click="$parent.close()">Close</b-button>
            <b-button v-if="!passwordReset" class="button is-primary" @click="handleLogin" :loading="loading">Login</b-button>
            <b-button v-if="passwordReset" class="button is-primary" @click="handlePasswordReset" :loading="loading">Reset password</b-button>
        </footer>
    </div>
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
            passwordReset: false,
            formValues: {
                email: process.env.email,
                password: process.env.password,
                remember_me: true
            }
        }
    },
    methods: {
        async handleLogin() {
            this.loading = true
            this.errorMessage = ''

            try {
                const token = await this.$store.dispatch('auth/fetchToken', this.formValues)
                if(!token.access_token) {
                    throw 'Incorrect email password'
                }

                const user = await this.$store.dispatch('user/fetchUser', token.access_token)

                this.$toast.open({
                    message: 'Login successfull.',
                    type: 'is-success'
                })

                this.$router.push({ name: 'dashboard' })

            } catch (err) {
                this.$toast.open({
                    duration: 5000,
                    message: err,
                    position: 'is-top',
                    type: 'is-danger'
                })
            } finally {
                this.loading = false
            }
        },

        async handlePasswordReset() {
            this.loading = true

            try {
                const result = await this.passwordHttp.create({ email: this.formValues.email })
            } catch (error) {

            } finally {
                this.$toast.open({
                    duration: 5000,
                    message: 'If the email exists, please check your inbox for your reset link.',
                    type: 'is-success'
                })

                this.loading = false
            }
        }

    },
}
</script>


