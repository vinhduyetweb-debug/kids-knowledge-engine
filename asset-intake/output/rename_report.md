# Asset Intake Inventory Report

This report is read-only for raw assets. No source files were renamed, deleted, or overwritten.

- Total input images: 104
- Auto-suggested by filename: 5
- Needs visual review: 99
- Contact sheet status: created

## Contact Sheets

- contact_sheet_001.jpg
- contact_sheet_002.jpg
- contact_sheet_003.jpg
- contact_sheet_004.jpg
- contact_sheet_005.jpg
- contact_sheet_006.jpg

## Next Step

Review the contact sheets, fill `asset-intake/output/asset_mapping_template.csv`, then run:

```bat
node tools\asset-apply-mapping.js
```

Rows with blank target filename or `NEEDS_REVIEW` will be skipped.
