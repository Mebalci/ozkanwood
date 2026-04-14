import os
import json
import requests
from datetime import datetime
from collections import deque

API_KEY = os.getenv("TRENDYOL_API_KEY")
API_SECRET = os.getenv("TRENDYOL_API_SECRET")

def generate_headers():
    import base64
    credentials = f"{API_KEY}:{API_SECRET}"
    encoded = base64.b64encode(credentials.encode()).decode()
    return {
        "Authorization": f"Basic {encoded}",
        "Content-Type": "application/json",
        "Accept": "application/json",
        "storeFrontCode": "tr"
    }

def flatten_categories(cat):
 
    queue = deque([cat])
    flat = []
    while queue:
        node = queue.popleft()
        flat.append({"id": node["id"], "name": node["name"], "parentId": node["parentId"]})
        for sub in node.get("subCategories", []):
            queue.append(sub)
    return flat

def fetch_categories():
    url = "https://api.trendyol.com/integration/product/product-categories"
    res = requests.get(url, headers=generate_headers())
    res.raise_for_status()
    data = res.json()
   
    categories = []
    if isinstance(data, list):
        for cat in data:
            categories.extend(flatten_categories(cat))
    else:
        categories = flatten_categories(data)
    return categories

def main():
    kategoriler = fetch_categories()
    output = {
        "updatedAt": datetime.utcnow().isoformat(),
        "categories": kategoriler
    }
    os.makedirs("public", exist_ok=True)
    with open("public/kategoriler.json", "w", encoding="utf-8") as f:
        json.dump(output, f, ensure_ascii=False, indent=2)
    print(f"{len(kategoriler)} kategori public/kategoriler.json dosyasına yazıldı.")

if __name__ == "__main__":
    main()
