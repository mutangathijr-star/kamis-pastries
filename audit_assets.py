import json
import os

db_path = r'C:\Users\USER\.gemini\antigravity\scratch\kamis-pastries\database.json'
assets_dir = r'C:\Users\USER\.gemini\antigravity\scratch\kamis-pastries\assets'
pub_assets_dir = r'C:\Users\USER\.gemini\antigravity\scratch\kamis-pastries\public\assets'

with open(db_path, 'r', encoding='utf-8') as f:
    data = json.load(f)

products = data.get('products', [])
print(f"Total products in database.json: {len(products)}")

all_ok = True
for p in products:
    img_rel = p['image']
    file_name = os.path.basename(img_rel)
    src_path = os.path.join(assets_dir, file_name)
    pub_path = os.path.join(pub_assets_dir, file_name)
    
    src_exists = os.path.exists(src_path)
    pub_exists = os.path.exists(pub_path)
    
    status = "OK" if (src_exists and pub_exists) else "MISSING"
    if not (src_exists and pub_exists):
        all_ok = False
    print(f"ID {p['id'].rjust(2)} | {p['name'].ljust(26)} | {img_rel.ljust(30)} | Status: {status}")

print("\nAsset Audit Result:", "ALL 25 ASSETS ARE PRESENT & VERIFIED!" if all_ok else "SOME ASSETS ARE MISSING!")
