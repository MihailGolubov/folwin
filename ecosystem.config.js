module.exports = {
  apps: [
    {
      name: "folwin",
      script: "cmd.exe",
      args: "/c npm start",
      cwd: "C:\\Users\\Administrator\\Desktop\\folwin",
      env: {
        NODE_ENV: "production"
      }
    }
  ]
}
