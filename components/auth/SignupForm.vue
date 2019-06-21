<template>
    <div class="modal-card">

        <header class="modal-card-head">
            <p class="modal-card-title">Signup</p>
        </header>

        <!-- Form for new users -->
        <section v-if="!accountCreated" class="modal-card-body">
            <b-field label="Name" :message="errors.name" :type="(errors.name) ? 'is-danger' : ''">
                <b-input
                    type="text"
                    v-model="formValues.name"
                    placeholder="Your name"
                    required>
                </b-input>
            </b-field>

            <b-field label="Email" :message="errors.email" :type="(errors.email) ? 'is-danger' : ''">
                <b-input
                    type="email"
                    v-model="formValues.email"
                    placeholder="Your email"
                    required>
                </b-input>
            </b-field>

            <b-field label="Password" :message="errors.password" :type="(errors.password) ? 'is-danger' : ''">
                <b-input
                    type="password"
                    v-model="formValues.password"
                    password-reveal
                    placeholder="Your password"
                    required>
                </b-input>
            </b-field>

            <b-field label="Password" :message="errors.password_confirmation" :type="(errors.password_confirmation) ? 'is-danger' : ''">
                <b-input
                    type="password"
                    v-model="formValues.password_confirmation"
                    password-reveal
                    placeholder="Confirm password"
                    required>
                </b-input>
            </b-field>
        </section>

        <!-- Once a user has successfully registered -->
        <section v-if="accountCreated" class="modal-card-body">
            <b-notification type="is-success" aria-close-label="Close notification" :closable="false">
                You have successfully created your account. Please check your inbox to verify your account!
            </b-notification>
        </section>

        <footer class="modal-card-foot" v-if="!accountCreated">
            <b-button class="button is-primary" @click="handleSignup" :loading="loading">Signup</b-button>
        </footer>
    </div>
</template>

<script>
export default {
    data() {
        return {
            loading: false,
            accountCreated: false,
            formValues: {
                name: process.env.name,
                email: process.env.email,
                password: process.env.password,
                password_confirmation: process.env.password
            },
            errors: false
        }
    },
    methods: {
        async handleSignup() {
            this.loading = true
            this.errors = false

            try {
                const result = await this.$store.dispatch('auth/createUser', this.formValues)

                this.accountCreated = true
            } catch (error) {
                console.log(error)
                this.errors = error.data.errors

                this.$toast.open({
                    duration: 5000,
                    message: error.data.message,
                    position: 'is-top',
                    type: 'is-danger'
                })
            } finally {
                this.loading = false
            }
        }
    },
}
</script>


