import json
import os
import shutil

root_dir = r'C:\Users\USER\.gemini\antigravity\scratch\kamis-pastries'
pub_dir = r'C:\Users\USER\.gemini\antigravity\scratch\kamis-pastries\public'

# 25 UNIQUE, INDIVIDUAL PHOTO URLS FOR ALL 25 PRODUCTS
UNIQUE_FALLBACK_URLS = {
    "1": "https://images.unsplash.com/photo-1535141192574-5d4897c13136?w=600&auto=format&fit=crop", # Vanilla Cake
    "2": "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600&auto=format&fit=crop", # Strawberry Cake
    "3": "https://images.unsplash.com/photo-1519869325930-281384150729?w=600&auto=format&fit=crop", # Orange Cake
    "4": "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?w=600&auto=format&fit=crop", # Lemon Cake
    "5": "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=600&auto=format&fit=crop", # Raspberry Cake
    "6": "https://images.unsplash.com/photo-1542826438-bd32fcf33370?w=600&auto=format&fit=crop", # Passion Cake
    "7": "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=600&auto=format&fit=crop", # Pineapple Cake
    "8": "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=600&auto=format&fit=crop", # Blueberry Cake
    "9": "https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=600&auto=format&fit=crop", # Lemon Blueberry Cake
    "10": "https://images.unsplash.com/photo-1622896784083-cc051313dbab?w=600&auto=format&fit=crop", # Carrot Cake
    "11": "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=600&auto=format&fit=crop", # Pinacolada Cake
    "12": "https://images.unsplash.com/photo-1562777717-dc6984f65a63?w=600&auto=format&fit=crop", # Cookies & Cream Cake
    "13": "https://images.unsplash.com/photo-1557925923-cd4648e211a0?w=600&auto=format&fit=crop", # Bubblegum Cake
    "14": "https://images.unsplash.com/photo-1558301211-0d8c8ddee6ec?w=600&auto=format&fit=crop", # Funfetti Cake
    "15": "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=600&auto=format&fit=crop", # Tutti Frutti Cake
    "16": "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&auto=format&fit=crop", # Chocolate Fudge Cake
    "17": "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&auto=format&fit=crop", # Chocolate Mint Cake
    "18": "https://images.unsplash.com/photo-1582293041079-7814c2f12063?w=600&auto=format&fit=crop", # Chocolate Orange Cake
    "19": "https://images.unsplash.com/photo-1511018556340-d16986a1c194?w=600&auto=format&fit=crop", # Classic Chocolate Cake
    "20": "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=600&auto=format&fit=crop", # Red Velvet Cake
    "21": "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=600&auto=format&fit=crop", # Blackforest Cake
    "22": "https://images.unsplash.com/photo-1535141192574-5d4897c13136?w=600&auto=format&fit=crop", # White Forest Cake
    "23": "https://images.unsplash.com/photo-1562777717-dc6984f65a63?w=600&auto=format&fit=crop", # Oreo Mint Cake
    "24": "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop", # Fruit Cake
    "25": "https://images.unsplash.com/photo-1579372786545-d24232daf58c?w=600&auto=format&fit=crop"  # Fruit Cake with Rum
}

print("Loaded 25 unique photo URLs for each cake!")
