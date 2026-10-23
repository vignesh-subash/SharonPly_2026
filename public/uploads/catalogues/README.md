# Catalogue Uploads

Upload catalogue PDFs and cover images here.

## Structure

```
catalogues/
  pdfs/     ← brochure PDF files
  covers/   ← cover/thumbnail images for catalogue cards
```

## Expected catalogues

| File (PDF) | Cover image (optional) | Used on |
|------------|------------------------|---------|
| `sharonply-product-catalogue.pdf` | `master-catalogue.jpg` | Master Catalogue |
| `plywood-brochure.pdf` | `plywood.jpg` | Plywood |
| `veneer-catalogue.pdf` | `veneer.jpg` | Veneer |
| `door-catalogue.pdf` | `door.jpg` | Doors |
| `technology-brochure.pdf` | `technology.jpg` | Technologies |

## Current site paths

Catalogue PDFs are served from `/pdfs/`. After upload, the agent will copy files to `public/pdfs/` and wire cover images in `src/components/CatalogueClient.tsx`.
