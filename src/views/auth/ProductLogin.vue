<template>
  <div class="panel-wrapper">
    <span class="logo">
      <img
        src="/img/login-logo.png"
        alt=""
      >
    </span>

    <div class="slogan-wrapper">
      <div class="slogan">
        <img
          src="/img/login-bg.svg"
          alt=""
        >
      </div>
    </div>

    <div class="panel-content">
      <v-app class="login-con">
        <!-- <v-spacer></v-spacer> -->
        <v-content>
          <base-langbar />
          <v-container
            fluid
            fill-height
          >
            <v-layout
              align-center
              justify-center
            >
              <v-flex class="frame">
                <h1 v-if="!isMobile">
                  {{ $t('common.loginN')}}
                </h1>
                <v-form>
                  <v-text-field
                    v-model="form.username"
                    prepend-icon="person"
                    clearable
                    :label="$t('common.username')"
                    @keyup.enter.native="login"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="form.password"
                    prepend-icon="lock"
                    @keyup.enter.native="login"
                    :append-icon="showPwd ? 'visibility_off' : 'visibility'"
                    :type="showPwd ? 'text' : 'password'"
                    @click:append="showPwd = !showPwd"
                    :label="$t('common.password')"
                    required
                  ></v-text-field>
                  <v-layout
                    column
                    wrap
                    justify-end
                    align-end
                  >
                    <v-flex>
                      <v-btn
                        flat
                        small
                        color="primary"
                        @click="redirectForgotPassword"
                      >
                        {{ $t('common.forgetPassword') }}
                      </v-btn>
                    </v-flex>
                    <v-flex>
                      <v-btn
                        :loading="loginLoading"
                        @click="login"
                      >
                        <span slot="loader">Loading...</span>
                        {{ $t('common.login') }}
                      </v-btn>
                    </v-flex>
                  </v-layout>
                </v-form>
              </v-flex>
            </v-layout>
          </v-container>
        </v-content>

        <v-footer
          color="#fbfbfb"
          height="auto"
        >
          <v-layout>
            <v-flex text-xs-center>
              <!-- {{ $t('common.copyrightMessage', { currentYear }) }} -->
            </v-flex>
          </v-layout>
        </v-footer>
      </v-app>
    </div>
  </div>
</template>

<script>
import { isMobile } from '@/utils/util';

export default { 
  components: {},
  data() {
    return {
      currentYear: new Date().getFullYear(),
      showPwd: false,
      form: {
        username: '',
        password: '',
      },
      loginLoading: false,
    };
  },
  computed: {
    isMobile() {
      return isMobile();
    },
  },
  methods: {
    login() {
      if (!this.form.password || !this.form.username) {
        return;
      }

      this.loginLoading = true;

      this.$store.dispatch('login', this.form)
        .then(() => {
          try {
            this.$router.push({ name: 'home' });
          } catch (err) {
            this.$router.push({ path: '/' });
          }
        })
        .catch((res) => {
          console.log('login-failed', res);
          this.$message({
            type: 'error',
            text: this.$t('common.invalid_password_username'),
          });
        })
        .finally(() => {
          this.loginLoading = false;
        });
    },
    redirectForgotPassword() {
      console.log('redirectForgotPassword');
      this.$message({
        type: 'info',
        text: 'Ahem: Please add redirect function',
      });
    },
  },
  created() {},
};
</script>

<style lang="scss">
.panel-wrapper {
  width: 100%;
  height: 100%;
  display: block;
  margin: 0;
  padding: 0;
  overflow: hidden;

  .logo {
    display: block;
    position: absolute;
    width: 175px;
    top: 20px;
    left: 20px;
    z-index: 100;

    img {
      display: inline-block;
      height: 36px;
    }
  }
}

.slogan-wrapper {
  height: 100%;
  background: linear-gradient(#011738,#065bc9);
  display: flex;
  align-items: center;
  justify-content: center;

  .slogan {
    margin: 0 20px;
    position: relative;
    display: flex;
    align-items: center;
    max-width: 420px;

    img {
      width: 100%;
    }
  }
}

@media (min-width: 1440px) {
  .panel-wrapper {
    padding-left: 720px;
  }

  .slogan-wrapper {
    position: absolute;
    width: 720px;
    left: 0;
    top: 0;
  }
}

@media (min-width: 768px) and (max-width: 1440px) {
  .panel-wrapper {
    padding-left: 50%;
  }

  .slogan-wrapper {
    position: absolute;
    width: 50%;
    left: 0;
    top: 0;
  }
}
@media (max-width: 768px) {
  .slogan-wrapper {
    display: none;
  }
}

.panel-content {
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  height: 100%;
  min-height: 480px;

  .login-con {
    width: 100%;
    padding: 0 20px;

    .frame {
      max-width: 520px;
      margin: auto;
    }

    h1 {
      font-family: Source Sans Pro, Futura, Century Gothic, Arial Black;
      font-size: 40px;
      font-weight: 800;
      color: #5d7498;
      margin-bottom: 40px;
    }
  }

  .el-footer {
    display: block;
    position: absolute;
    bottom: 0;
    width: 100%;
  }

  .change-lang {
    display: block;
    position: absolute;
    top: 20px;
    right: 30px;

    span {
      cursor: pointer;
      padding: 0 4px;
      color: #53546a;

      &.active-lang {
        color: #237ae0;
      }
    }
  }
}

.resetpsw-result {
  display: block;
  width: 300px;
  margin: 80px auto;
  position: relative;

  h3 {
    font-size: 22px;
    display: flex;
    align-items: center;
    margin-bottom: 40px;
    font-weight: 400;
  }

  .el-icon-success {
    font-size: 24px;
    vertical-align: middle;
    margin-right: 10px;
  }

  .el-button {
    margin-left: 36px;
  }
}

</style>
