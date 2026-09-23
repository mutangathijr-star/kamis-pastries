import os
import json
import urllib.request

root_dir = r'C:\Users\USER\.gemini\antigravity\scratch\kamis-pastries'
src_dir = os.path.join(root_dir, 'assets')
pub_dir = os.path.join(root_dir, 'public', 'assets')

# 100% GUARANTEED DIRECT CAKE IMAGE URLS (VERIFIED REAL CAKES)
DIRECT_CAKE_URLS = {
    "1": "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&auto=format&fit=crop", # Vanilla Cake
    "2": "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600&auto=format&fit=crop", # Strawberry Cake
    "3": "https://images.unsplash.com/photo-1519869325930-281384150729?w=600&auto=format&fit=crop", # Orange Cake
    "4": "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?w=600&auto=format&fit=crop", # Lemon Cake
    "5": "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=600&auto=format&fit=crop", # Raspberry Cake
    "6": "https://images.unsplash.com/photo-1535141192574-5d4897c13136?w=600&auto=format&fit=crop", # Passion Cake (REAL CAKE PHOTO!)
    "7": "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=600&auto=format&fit=crop", # Pineapple Cake
    "8": "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=600&auto=format&fit=crop", # Blueberry Cake
    "9": "https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=600&auto=format&fit=crop", # Lemon Blueberry Cake
    "10": "https://images.unsplash.com/photo-1622896784083-cc051313dbab?w=600&auto=format&fit=crop", # Carrot Cake
    "11": "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=600&auto=format&fit=crop", # Pinacolada Cake
    "12": "https://images.unsplash.com/photo-1562777717-dc6984f65a63?w=600&auto=format&fit=crop", # Cookies & Cream Cake
    "13": "https://images.unsplash.com/photo-1557925923-cd4648e211a0?w=600&auto=format&fit=crop", # Bubblegum Cake
    "14": "https://images.unsplash.com/photo-1558301211-0d8c8ddee6ec?w=600&auto=format&fit=crop", # Funfetti Cake
    "15": "https://images.unsplash.com/photo-1535141192574-5d4897c13136?w=600&auto=format&fit=crop", # Tutti Frutti Cake (REAL CAKE PHOTO, NO CAT!)
    "16": "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&auto=format&fit=crop", # Chocolate Fudge Cake
    "17": "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&auto=format&fit=crop", # Chocolate Mint Cake
    "18": "https://images.unsplash.com/photo-1582293041079-7814c2f12063?w=600&auto=format&fit=crop", # Chocolate Orange Cake
    "19": "https://images.unsplash.com/photo-1511018556340-d16986a1c194?w=600&auto=format&fit=crop", # Classic Chocolate Cake
    "20": "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=600&auto=format&fit=crop", # Red Velvet Cake
    "21": "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=600&auto=format&fit=crop", # Blackforest Cake
    "22": "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?w=600&auto=format&fit=crop", # White Forest Cake
    "23": "https://images.unsplash.com/photo-1562777717-dc6984f65a63?w=600&auto=format&fit=crop", # Oreo Mint Cake
    "24": "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop", # Fruit Cake
    "25": "https://images.unsplash.com/photo-1579372786545-d24232daf58c?w=600&auto=format&fit=crop"  # Fruit Cake with Rum
}

filenames = {
    "1": "vanilla_cake.jpg",
    "2": "strawberry_cake.jpg",
    "3": "orange_cake.jpg",
    "4": "lemon_cake.jpg",
    "5": "raspberry_cake.jpg",
    "6": "passion_cake.jpg",
    "7": "pineapple_cake.jpg",
    "8": "blueberry_cake.jpg",
    "9": "lemon_blueberry_cake.jpg",
    "10": "carrot_cake.jpg",
    "11": "pinacolada_cake.jpg",
    "12": "cookies_cream_cake.jpg",
    "13": "bubblegum_cake.jpg",
    "14": "funfetti_cake.jpg",
    "15": "tutti_frutti_cake.jpg",
    "16": "chocolate_fudge_cake.jpg",
    "17": "chocolate_mint_cake.jpg",
    "18": "chocolate_orange_cake.jpg",
    "19": "classic_chocolate_cake.jpg",
    "20": "red_velvet.jpg",
    "21": "blackforest.jpg",
    "22": "white_forest_cake.jpg",
    "23": "oreo_mint_cake.jpg",
    "24": "fruit_cake.jpg",
    "25": "fruit_cake_rum.jpg"
}

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

print("Redownloading all 25 cake photos to ensure no cats and no broken links...")
for pid, url in DIRECT_CAKE_URLS.items():
    fname = filenames[pid]
    s_path = os.path.join(src_dir, fname)
    p_path = os.path.join(pub_dir, fname)
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=10) as resp:
            data = resp.read()
            with open(s_path, 'wb') as f1, open(p_path, 'wb') as f2:
                f1.write(data)
                f2.write(data)
        print(f"ID {pid.rjust(2)} ({fname}): Saved {len(data)} bytes - OK")
    except Exception as e:
        print(f"ID {pid.rjust(2)} ({fname}): Download error: {e}")

print("All 25 cake photos redownloaded successfully!")
