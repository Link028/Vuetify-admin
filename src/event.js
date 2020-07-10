export default [
  {
    name: "APP_LOGIN_SUCCESS",
    callback: () => {
      this.$router.push("/");
    }
  },
  {
    name: "APP_AUTH_FAILED",
    callback: () => {
      this.$message.error("会话过期")
      this.$router.push("/login")
    }
  },
  {
    name: "APP_ACCESS_DENIED",
    callback: msg => {
      this.$message.error(msg)
      this.$router.push("/forbidden")
    }
  },
  {
    name: "APP_LOGOUT",
    callback: () => {
      this.$snackbar = {
        show: true,
        color: "green",
        text: "退出成功."
      }
    }
  },
  {
    name: "APP_BAD_REQUEST",
    callback: msg => {
      this.$message.error(msg)
    }
  },
  {
    name: "APP_PAGE_LOADED",
    callback: () => {}
  },
  {
    name: "APP_RESOURCE_CREATED",
    callback: msg => {
      this.$message.success(msg)
    }
  },
  {
    name: "APP_RESOURCE_UPDATED",
    callback: msg => {
      this.$message.success(msg)
    }
  },
  {
    name: "APP_RESOURCE_DELETED",
    callback: msg => {
      this.$message.success(msg)
    }
  }
]
