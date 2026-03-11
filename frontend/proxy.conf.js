module.exports = [
  {
    context: ["/api"],
    target: "http://localhost:8086",
    secure: false,
    changeOrigin: true,
    logLevel: "debug"
  },
  {
    // Proxy apenas /map e /map/** (não pega /mapa)
    context: ["/map", "/map/**"],
    target: "http://localhost:8086",
    secure: false,
    changeOrigin: true,
    logLevel: "debug"
  }
];
