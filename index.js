const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const https = require('https');
const minimist = require('minimist');

// Helper function to download an image
const downloadImage = (url, folderName, imageName) => {
  const filePath = path.join(folderName, imageName);
  const file = fs.createWriteStream(filePath);
  https.get(url, (response) => {
    response.pipe(file);
  });
};

// Function to extract the manga name and chapter number from the description meta tag
const getMangaDetailsFromDescription = (description) => {
  const regex = /Komik\s(.+?)\s(Chapter\s\d+)/i;
  const match = description.match(regex);
  if (match) {
    const mangaName = match[1].replace(/\s+/g, ' ').trim(); // Clean up spaces
    const chapter = match[2].replace(/\s+/g, '_').trim(); // Chapter name with underscores
    return { mangaName, chapter };
  }
  return { mangaName: 'default_manga', chapter: 'chapter_default' };
};

// Main function
(async () => {
  // Parse the command-line arguments
  const args = minimist(process.argv.slice(2));
  const url = args.url;

  if (!url) {
    console.log('Please provide a URL using --url');
    process.exit(1);
  }

  // Launch Puppeteer
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Go to the provided URL
  await page.goto(url, { waitUntil: 'networkidle2' });

  // Extract meta description for folder name and manga details
  const description = await page.evaluate(() => {
    const metaTag = document.querySelector('meta[name="description"]');
    return metaTag ? metaTag.getAttribute('content') : 'Default Description';
  });

  // Get manga name and chapter number
  const { mangaName, chapter } = getMangaDetailsFromDescription(description);

  // Define the folder path for output
  const folderPath = path.join(__dirname, 'output', mangaName, chapter);

  // Create folders if they don't exist
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }

  // Extract all image sources under div with id 'Baca_Komik'
  const imageSources = await page.evaluate(() => {
    const imageElements = document.querySelectorAll('#Baca_Komik img');
    return Array.from(imageElements).map(img => img.src);
  });

  // Download each image
  imageSources.forEach((src, index) => {
    const imageName = `image_${index + 1}.jpg`; // You can customize the file naming convention
    downloadImage(src, folderPath, imageName);
  });

  console.log(`Downloaded ${imageSources.length} images to folder: ${folderPath}`);

  await browser.close();
})();
