const { spawn } = require("child_process");

console.log("🚀 Iniciando build otimizado para Vercel...");

const child = spawn("npx", ["expo", "export", "-p", "web"], {
  shell: true,
  stdio: ["ignore", "pipe", "pipe"],
});

child.stdout.on("data", (data) => {
  const output = data.toString();
  process.stdout.write(output);

  if (output.includes("Exported: dist")) {
    console.log("\n✅ Build estático gerado!");
    process.exit(0);
  }
});

child.stderr.on("data", (data) => {
  process.stderr.write(data.toString());
});

child.on("close", (code) => {
  process.exit(code);
});
