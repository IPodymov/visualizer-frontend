const fs = require('fs');

function patch(filePath, replacements) {
  let content = fs.readFileSync(filePath, 'utf-8');
  for (const [oldStr, newStr] of replacements) {
    content = content.split(oldStr).join(newStr);
  }
  fs.writeFileSync(filePath, content, 'utf-8');
}

patch('src/index.css', [
  [
    '--danger: #ef4444;',
    '--danger: #ef4444;\n  --danger-hover: #dc2626;\n  --danger-bg: #fee2e2;\n  --text-inverse: #ffffff;\n  --bg-inverse: #111827;'
  ],
  [
    '--danger: #ef4444;', // just in case the dark mode needs one too, but wait: I'll manually edit it.
    ''
  ],
]);
