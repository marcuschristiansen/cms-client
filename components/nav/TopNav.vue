<template>
<div>
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <nuxt-link :to="{ name: 'index' }" class="navbar-item">
          <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28">
        </nuxt-link>

        <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" class="navbar-menu">
        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
                <b-button v-if="!user && authStatusSet" type="is-primary" @click="signupModal = true">Sign up</b-button>
                <b-button v-if="!user && authStatusSet" type="is-success" @click="loginModal = true">Log in</b-button>
                <b-button v-if="user && authStatusSet" type="is-success" @click="handleLogout">Log out</b-button>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <!-- Sign up / in Modals -->
    <b-modal :active.sync="loginModal" has-modal-card>
        <login-form></login-form>
    </b-modal>
    <b-modal :active.sync="signupModal" has-modal-card>
        <signup-form></signup-form>
    </b-modal>
</div> 
    
</template>

<script>
import LoginForm from '~/components/auth/LoginForm'
import SignupForm from '~/components/auth/SignupForm'

export default {
    components: {
        LoginForm,
        SignupForm
    },
    computed: {
        user() {
            return this.$store.state.user.user
        },
        authStatusSet() {
            return this.$store.state.auth.authStatusSet
        }
    },
    data() {
        return {
            signupModal: false,
            loginModal: false,
        }
    },
    methods: {
        async handleLogout() {
            const res = await this.$store.dispatch('auth/logout')
        
            this.$router.push({ name: 'index' })
        }
    }
}
</script>
