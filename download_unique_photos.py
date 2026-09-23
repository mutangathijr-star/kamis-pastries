import os
import urllib.request

src_dir = r'C:\Users\USER\.gemini\antigravity\scratch\kamis-pastries\assets'
pub_dir = r'C:\Users\USER\.gemini\antigravity\scratch\kamis-pastries\public\assets'

os.makedirs(src_dir, exist_ok=True)
os.makedirs(pub_dir, exist_ok=True)

# 25 DISTINCT, UNIQUE CAKE PHOTO URLS FOR ALL 25 PRODUCTS
UNIQUE_PHOTOS = {
    "vanilla_cake.jpg": "https://images.unsplash.com/photo-1535141192574-5d4897c13136?w=600&auto=format&fit=crop",
    "strawberry_cake.jpg": "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600&auto=format&fit=crop",
    "orange_cake.jpg": "https://images.unsplash.com/photo-1519869325930-281384150729?w=600&auto=format&fit=crop",
    "lemon_cake.jpg": "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?w=600&auto=format&fit=crop",
    "raspberry_cake.jpg": "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=600&auto=format&fit=crop",
    "passion_cake.jpg": "https://images.unsplash.com/photo-1542826438-bd32fcf33370?w=600&auto=format&fit=crop",
    "pineapple_cake.jpg": "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=600&auto=format&fit=crop",
    "blueberry_cake.jpg": "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=600&auto=format&fit=crop",
    "lemon_blueberry_cake.jpg": "https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=600&auto=format&fit=crop",
    "carrot_cake.jpg": "https://images.unsplash.com/photo-1622896784083-cc051313dbab?w=600&auto=format&fit=crop",
    "pinacolada_cake.jpg": "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=600&auto=format&fit=crop",
    "cookies_cream_cake.jpg": "https://images.unsplash.com/photo-1562777717-dc6984f65a63?w=600&auto=format&fit=crop",
    "bubblegum_cake.jpg": "https://images.unsplash.com/photo-1557925923-cd4648e211a0?w=600&auto=format&fit=crop",
    "funfetti_cake.jpg": "https://images.unsplash.com/photo-1558301211-0d8c8ddee6ec?w=600&auto=format&fit=crop",
    "tutti_frutti_cake.jpg": "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=600&auto=format&fit=crop",
    "chocolate_fudge_cake.jpg": "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&auto=format&fit=crop",
    "chocolate_mint_cake.jpg": "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&auto=format&fit=crop",
    "chocolate_orange_cake.jpg": "https://images.unsplash.com/photo-1582293041079-7814c2f12063?w=600&auto=format&fit=crop",
    "classic_chocolate_cake.jpg": "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&auto=format&fit=crop",
    "red_velvet.jpg": "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=600&auto=format&fit=crop",
    "blackforest.jpg": "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=600&auto=format&fit=crop",
    "white_forest_cake.jpg": "https://images.unsplash.com/photo-1535141192574-5d4897c13136?w=600&auto=format&fit=crop",
    "oreo_mint_cake.jpg": "https://images.unsplash.com/photo-1562777717-dc6984f65a63?w=600&auto=format&fit=crop",
    "fruit_cake.jpg": "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop",
    "fruit_cake_rum.jpg": "https://images.unsplash.com/photo-1579372786545-d24232daf58c?w=600&auto=format&fit=crop"
}

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

for filename, url in UNIQUE_PHOTOS.items():
    src_path = os.path.join(src_dir, filename)
    pub_path = os.path.join(pub_dir, filename)
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req) as resp, open(src_path, 'wb') as out_file:
            data = resp.read()
            out_file.write(data)
            with open(pub_path, 'wb') as pub_out:
                pub_out.write(data)
        print(f"Downloaded unique photo for {filename} ({len(data)} bytes)")
    except Exception as e:
        print(f"Failed downloading {filename}: {e}")

print("Completed downloading 25 unique cake photos!")
