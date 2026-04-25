#!/usr/bin/env node
import { intro, outro, text } from "@clack/prompts";

async function main(): Promise<void> {
  intro("{{PROJECT_NAME}}");

  const name = await text({
    message: "What is your name?",
    placeholder: "world",
    defaultValue: "world",
  });

  outro(`Hello, ${String(name)}!`);
}

main().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
