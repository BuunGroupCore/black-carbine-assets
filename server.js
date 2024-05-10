const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const publicDir = path.join(__dirname, 'public');

app.use(express.static(publicDir));

app.get('/', (req, res) => {
    const files = fs.readdirSync(publicDir);
    const imageHTML = files
        .filter(file => file.endsWith('.jpg') || file.endsWith('.png') || file.endsWith('.gif'))
        .map(file => `<img src="/${file}" alt="${file}">`)
        .join('');
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
