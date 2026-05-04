import json
import os
from pathlib import Path
import xml.etree.ElementTree as ET

def load_product_slugs(json_path: Path):
    slugs = []
    if json_path.exists():
        try:
            data = json.loads(json_path.read_text(encoding="utf-8"))
        except json.JSONDecodeError:
            data = []
        products = data.get("products") or data
        if isinstance(products, list):
            for item in products:
                slug = item.get("slug") or item.get("url") or item.get("permalink")
                if slug:
                    slugs.append(str(slug).lstrip("/"))
                elif item.get("id") is not None:
                    slugs.append(f"urun/{item['id']}")
    return slugs

def build_sitemap(base_url, static_paths, product_slugs):
    urlset = ET.Element("urlset", attrib={"xmlns": "http://www.sitemaps.org/schemas/sitemap/0.9"})
    def add_url(path):
        url_elem = ET.SubElement(urlset, "url")
        loc = ET.SubElement(url_elem, "loc")
        if path == "":
            loc.text = base_url.rstrip("/")
        else:
            loc.text = f"{base_url.rstrip('/')}/{path.lstrip('/')}"
    for path in static_paths:
        add_url(path)
    for slug in product_slugs:
        add_url(slug)
    return ET.tostring(urlset, encoding="utf-8", xml_declaration=True).decode("utf-8")

def build_llms_text(base_url, static_paths, product_slugs):
    lines = []
    lines.append("# OzkanWood Online Store")
    lines.append("> OzkanWood sells handcrafted wooden products and furniture in Turkey.  This e‑commerce site includes product listings, company info and legal pages.")
    lines.append("")
    lines.append("## Ana Sayfalar")
    for path in static_paths:
        if path == "":
            name, link = "Anasayfa", base_url
        else:
            seg = path.strip("/")
            name, link = seg.replace("-", " ").title(), f"{base_url.rstrip('/')}/{seg}"
        lines.append(f"- [{name}]({link})")
    lines.append("")
    if product_slugs:
        lines.append("## Örnek Ürünler")
        for slug in list(product_slugs)[:50]:
            title = slug.split("/")[-1].replace("-", " ").title()
            url = f"{base_url.rstrip('/')}/{slug}"
            lines.append(f"- [{title}]({url})")
        lines.append("")
    lines.append("## Hakkında")
    lines.append("Bu dosya, LLM'lerin siteyi daha kolay anlamasına yardımcı olmak için oluşturulmuştur.  `sitemap.xml` ile birlikte kullanıldığında, arama motorları ve büyük dil modelleri sitenin yapısını ve önemli sayfalarını daha iyi keşfedebilir.")
    return "\n".join(lines)

def main():
    repo_root = Path(__file__).resolve().parent.parent
    public_dir = repo_root / "public"
    products_json_path = public_dir / "urunler.json"
    base_url = os.environ.get("BASE_URL", "https://ozkanwood.netlify.app")
    static_paths = ["", "urunler", "hakkimizda", "iletisim", "gizlilik", "kullanim-sartlari"]
    product_slugs = load_product_slugs(products_json_path)
    sitemap = build_sitemap(base_url, static_paths, product_slugs)
    (public_dir / "sitemap.xml").write_text(sitemap, encoding="utf-8")
    llms = build_llms_text(base_url, static_paths, product_slugs)
    (public_dir / "llms.txt").write_text(llms, encoding="utf-8")
    print(f"Generated {len(product_slugs)} product URLs.")

if __name__ == "__main__":
    main()
