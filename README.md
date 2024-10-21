
# Manga Image Scraper

This script is designed to fetch images from manga sites, specifically under a div with the ID `#Baca_Komik`, and automatically downloads them into folders based on the manga name and chapter number, as derived from the page's meta description.

## Features

- **Automated Image Scraping:** Fetches all image URLs under a specified div and downloads them to organized folders.
- **Dynamic Folder Naming:** Folders are named based on the manga title and chapter number extracted from the page meta description.
- **Command-line Integration:** Specify the URL via the command line to scrape different manga pages.
- **Puppeteer-powered:** Uses Puppeteer to bypass common web challenges.

## Prerequisites

- [Node.js](https://nodejs.org/)
- [Puppeteer](https://pptr.dev/)
- Internet connection for fetching manga images.

## Installation

1. Clone this repository to your local machine:
    ```bash
    git clone https://github.com/igun997/komiku.id-manga-scrap.git
    cd komiku.id-manga-scrap
    ```

2. Install the required dependencies:
    ```bash
    npm install puppeteer minimist
    ```

## Usage

To use this script, simply run the following command in your terminal:

```bash
node index.js --url=<manga_page_url>
```

Replace `<manga_page_url>` with the actual URL of the manga page you want to scrape.

### Example

```bash
node index.js --url=https://example.com/manga-page
```

The script will:

1. **Access the URL** provided via the `--url` parameter.
2. **Extract the Manga Name and Chapter Number** from the meta description.
3. **Download Images** from the div with the ID `#Baca_Komik`.
4. **Save the images** in the following folder structure:
    ```
    output/
    └── Manga_Name/
        └── chapter_XX/
            ├── image_1.jpg
            ├── image_2.jpg
            └── ...
    ```

### Folder Structure

The images are downloaded into the `output` folder, organized like so:

```text
output/
└── <Manga_Name>/
    └── chapter_<Chapter_Number>/
        ├── image_1.jpg
        ├── image_2.jpg
        └── ...
```

### Example Output

For a manga with the meta description:
`"Komik Childhood Friend Of The Zenith Chapter 05 bahasa Indonesia terbaru, gratis, dan kualitas gambar terbaik."`

The images will be saved in:

```text
output/
└── Childhood Friend Of The Zenith/
    └── chapter_05/
        ├── image_1.jpg
        ├── image_2.jpg
        └── ...
```

## How It Works

1. **URL Input:** You pass the manga page URL using the `--url` parameter.
2. **Meta Description Parsing:** The script extracts the manga name and chapter number from the meta description using a regular expression.
3. **Image Extraction:** The script fetches all the images inside the `#Baca_Komik` div on the page.
4. **Folder Creation:** It creates the folder structure based on the manga name and chapter number.
5. **Image Downloading:** Each image is downloaded sequentially and saved in the corresponding folder.

## Customization

- You can modify the folder naming convention by adjusting the regex inside the `getMangaDetailsFromDescription` function.
- Customize image file naming patterns (e.g., `image_1.jpg`) in the `downloadImage` function.

## License

This project is licensed under the MIT License.
