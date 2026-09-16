import { compileContent } from "../src/lib/content/load.mjs";
try {
  const result = await compileContent({
    write: !process.argv.includes("--check"),
  });
  console.log(
    `Validated section YAML and ${result.count} media files (${(result.bytes / 1_000_000).toFixed(1)} MB).`,
  );
} catch (error) {
  console.error(`Content error: ${error.message}`);
  process.exitCode = 1;
}
