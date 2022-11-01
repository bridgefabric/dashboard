<template>
  <v-app-bar app flat class="transparent app-bar" :class="$vuetify.theme.dark ? 'dark-line':'light-line'">
    <v-container class="d-flex justify-space-between">
      <div class="d-flex align-center">
        <!-- <img src="~@/assets/logo.png"
             alt="logo"
             height="50px"
             class="mr-10 cur-p"
             @click="$router.push('/')"
        /> -->
        <v-btn
            rounded
            v-for="(v,k) in ['actors','nodes']"
            :key="k"
            class="font-weight-regular text-subtitle-1 text-capitalize mr-5"
            :to="{name: v}"
            text
        >{{ v }}
        </v-btn>
      </div>
      <div class="d-flex align-center">
        <v-btn :to="{name: 'manage'}" text >
          <span class="font-weight-regular text-capitalize text-caption">Manage</span>
        </v-btn>
      </div>
    </v-container>
  </v-app-bar>
</template>
<script>
import cookie from 'js-cookie'
import { getCache, setCache } from '@/utils/cache'

export default {
  computed: {
    avatar() {
      return this.$store.state.user.avatar
    },
    shortEmail() {
      return this.$store.state.user.email.substring(0, 2)
    },
    isLogin() {
      return !!this.shortEmail
    }
  },
  created() {
    this.$vuetify.theme.dark = getCache('theme_dark', true)
  },
  methods: {
    handleLogout() {
      cookie.remove('bf')
      window.location.href = '/'
    },
    handlewallet() {
      window.location.href = '/wallet'
    },
    handleToggleTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
      setCache('theme_dark', this.$vuetify.theme.dark)
    }
  }
}
</script>
<style lang="scss" scoped>
.app-bar {
  backdrop-filter: blur(15px);

  &.dark-line {
    border-bottom: 1px solid #333 !important;
  }

  &.light-line {
    border-bottom: 1px solid #e8e8e8 !important;
  }
}
</style>
