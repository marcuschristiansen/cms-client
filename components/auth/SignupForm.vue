<template>
    <div class="modal-card" style="width: auto">
        <!-- <header class="modal-card-head">
            <p class="modal-card-title">Login</p>
        </header>
        <section class="modal-card-body">
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

            <b-checkbox>Remember me</b-checkbox>
        </section>
        <footer class="modal-card-foot">
            <b-button class="button" @click="$parent.close()">Close</b-button>
            <b-button class="button is-primary" @click="handleLogin" :loading="loading">Login</b-button>
        </footer> -->
        <h1>RIGHT</h1>
    </div>
</template>

<script>
export default {
    data() {
        return {
            loading: false,
            formValues: {
                email: 'christiansen.marcus@gmail.com',
                password: '5[9c5{SEDTtMju+5E#6'
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
        }
    },
}
</script>


