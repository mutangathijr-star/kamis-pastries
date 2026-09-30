import urllib.request
import json
import os

# 25 TESTED REAL CAKE URLS ON HIGH-SPEED RELIABLE CDNS
TEST_URLS = {
    "1": ("Vanilla Cake", "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=600&auto=format&fit=crop"),
    "2": ("Strawberry Cake", "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600&auto=format&fit=crop"),
    "3": ("Orange Cake", "https://images.unsplash.com/photo-1519869325930-281384150729?w=600&auto=format&fit=crop"),
    "4": ("Lemon Cake", "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?w=600&auto=format&fit=crop"),
    "5": ("Raspberry Cake", "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600&auto=format&fit=crop"),
    "6": ("Passion Cake", "https://images.unsplash.com/photo-1535141192574-5d4897c13136?w=600&auto=format&fit=crop"),
    "7": ("Pineapple Cake", "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=600&auto=format&fit=crop"),
    "8": ("Blueberry Cake", "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=600&auto=format&fit=crop"),
    "9": ("Lemon Blueberry Cake", "https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=600&auto=format&fit=crop"),
    "10": ("Carrot Cake", "https://images.unsplash.com/photo-1622896784083-cc051313dbab?w=600&auto=format&fit=crop"),
    "11": ("Pinacolada Cake", "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=600&auto=format&fit=crop"),
    "12": ("Cookies & Cream Cake", "https://images.unsplash.com/photo-1562777717-dc6984f65a63?w=600&auto=format&fit=crop"),
    "13": ("Bubblegum Cake", "https://images.unsplash.com/photo-1557925923-cd4648e211a0?w=600&auto=format&fit=crop"),
    "14": ("Funfetti Cake", "https://images.unsplash.com/photo-1558301211-0d8c8ddee6ec?w=600&auto=format&fit=crop"),
    "15": ("Tutti Frutti Vanilla Cake", "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=600&auto=format&fit=crop"),
    "16": ("Chocolate Fudge Cake", "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&auto=format&fit=crop"),
    "17": ("Chocolate Mint Cake", "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&auto=format&fit=crop"),
    "18": ("Chocolate Orange Cake", "https://images.unsplash.com/photo-1582293041079-7814c2f12063?w=600&auto=format&fit=crop"),
    "19": ("Classic Chocolate Cake", "https://images.unsplash.com/photo-1511018556340-d16986a1c194?w=600&auto=format&fit=crop"),
    "20": ("Red Velvet Cake", "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=600&auto=format&fit=crop"),
    "21": ("Blackforest Cake", "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=600&auto=format&fit=crop"),
    "22": ("White Forest Cake", "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?w=600&auto=format&fit=crop"),
    "23": ("Oreo Mint Cake", "https://images.unsplash.com/photo-1562777717-dc6984f65a63?w=600&auto=format&fit=crop"),
    "24": ("Fruit Cake", "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop"),
    "25": ("Fruit Cake with Rum", "https://images.unsplash.com/photo-1579372786545-d24232daf58c?w=600&auto=format&fit=crop")
}

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

print("Verifying HTTP status of all 25 cake photo URLs...")
all_valid = True
for pid, (name, url) in TEST_URLS.items():
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=8) as resp:
            status = resp.status
            size = len(resp.read())
            print(f"ID {pid.rjust(2)} | {name.ljust(26)} | Status: {status} | Size: {size} bytes - OK")
    except Exception as e:
        print(f"ID {pid.rjust(2)} | {name.ljust(26)} | ERROR: {e}")
        all_valid = False

print("\nURL Verification Complete. All 25 valid:", all_valid)
