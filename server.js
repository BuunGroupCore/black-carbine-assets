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

    res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Image Gallery</title>
    <style>
        body {
            margin: 0;
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .image-container {
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="image-container">
        <img src="/black-carbine.png" alt="Black Carbine Logo">
    </div>
</body>
</html>
    `);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
