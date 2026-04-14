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

def flatten_categories(root):
    queue = deque([root])
    flat = []
    while queue:
        node = queue.popleft()
       
        node_id = node.get("id")
        node_name = node.get("name")
        if not node_id or not node_name:
            
            for child_list_key in ["subCategories", "subcategories", "children"]:
                for child in node.get(child_list_key, []):
                    queue.append(child)
            continue
        flat.append({
            "id": node_id,
            "name": node_name,
            "parentId": node.get("parentId")
        })
        
        for child_list_key in ["subCategories", "subcategories", "children"]:
            for child in node.get(child_list_key, []):
                queue.append(child)
    return 

def fetch_categories():
    try:
        url = "https://api.trendyol.com/integration/product/product-categories"
        res = requests.get(url, headers=generate_headers())
        res.raise_for_status()
        data = res.json()
    
        categories = []
        
        if isinstance(data, list):
            for node in data:
                categories.extend(flatten_categories(node))
        
        elif isinstance(data, dict):       
            candidate_keys = ["categories", "category", "rootCategories"]
            for key in candidate_keys:
                if key in data and isinstance(data[key], list):
                    for node in data[key]:
                        categories.extend(flatten_categories(node))
                    break
            else:            
                categories = flatten_categories(data)
        return categories
    except Exception as e:
        print(f"Kategori API çağrısı başarısız: {e}")
        # Fallback: ürünler dosyasından kategori çıkart
        products_file = "public/urunler.json"
        categories_set = set()
        if os.path.exists(products_file):
            with open(products_file, "r", encoding="utf-8") as f:
                products_data = json.load(f)
            for p in products_data.get("products", []):
                cat = p.get("category")
                if cat:
                    categories_set.add(cat)
        return [{"id": i + 1, "name": name, "parentId": None} for i, name in enumerate(sorted(categories_set))]

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
