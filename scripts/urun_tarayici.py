import os
import json
import requests
from datetime import datetime

API_KEY = os.getenv("TRENDYOL_API_KEY")
API_SECRET = os.getenv("TRENDYOL_API_SECRET")
SUPPLIER_ID = os.getenv("TRENDYOL_SUPPLIER_ID")

def generate_headers():
    import base64
    credentials = f"{API_KEY}:{API_SECRET}"
    encoded = base64.b64encode(credentials.encode()).decode()
    return {
        "Authorization": f"Basic {encoded}",
        "Content-Type": "application/json",
        "Accept": "application/json"
    }

def get_all_products():
    base_url = f"https://api.trendyol.com/integration/product/sellers/{SUPPLIER_ID}/products"
    page = 0
    size = 100
    all_products = []

    while True:
        params = {
            "approved": "true",
            "page": page,
            "size": size,
            "supplierId": SUPPLIER_ID
        }

        res = requests.get(base_url, headers=generate_headers(), params=params)
        if res.status_code != 200:
            print("HATA:", res.text)
            break

        data = res.json()
        for p in data.get("content", []):
            all_products.append({
                "id": p.get("id"),
                "title": p.get("title"),
                "brand": p.get("brand"),
                "description": p.get("description"),
                "price": p.get("listPrice"),
                "salePrice": p.get("salePrice"),
                "quantity": p.get("quantity"),
                "images": [img["url"] for img in p.get("images", [])],
                "category": p.get("categoryName"),
                "url": p.get("productUrl")
            })

        if page + 1 >= data.get("totalPages", 1):
            break
        page += 1

    return all_products

def main():
    urunler = get_all_products()
    output = {
        "updatedAt": datetime.utcnow().isoformat(),
        "products": urunler
    }

    os.makedirs("public", exist_ok=True)
    with open("public/urunler.json", "w", encoding="utf-8") as f:
        json.dump(output, f, ensure_ascii=False, indent=2)
 

    print(f"{len(urunler)} ürün public/urunler.json dosyasına yazıldı.")

if __name__ == "__main__":
    main()
