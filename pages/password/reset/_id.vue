<template>
<section v-if="user" class="section">
    <div class="container">
        <div class="card">
            <header class="card-header">
                <p class="card-header-title">Reset password</p>
            </header>
            <div class="card-content">
                <div class="content">
                    <password-reset-form :user="user"></password-reset-form>
                </div>
            </div>
        </div>
    </div>
</section>

</template>

<script>
import PasswordResetForm from '~/components/auth/PasswordResetForm'
import PasswordHttp from "~/services/PasswordHttp"

export default {
    components: {
        PasswordResetForm
    },
    created() {
        this.passwordHttp = new PasswordHttp()
        this.validateToken()
    },
    data() {
        return {
            user: false
        }
    },
    methods: {
        validateToken() {
            this.passwordHttp.find(this.$route.params.id)
            .then(result => {
                this.user = result.data
            })
            .catch(error => {
                this.$nuxt.error({ statusCode: 404, message: error.response.data.message })
            })
        }
    },
}
</script>