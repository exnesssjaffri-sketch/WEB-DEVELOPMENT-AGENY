#!/usr/bin/env python3
"""
=============================================================================
 SITEMAP VALIDATOR - Website Development Agency (WDA)
 Validates sitemap.xml for proper structure, no duplicates, and valid URLs.
 
 Usage:
   python scripts/validate-sitemap.py [--file FILE]
   
   --file : Path to sitemap file (default: sitemap.xml)
=============================================================================
"""

import sys
import xml.etree.ElementTree as ET

SITEMAP_FILE = "sitemap.xml"
SITEMAP_NS = "http://www.sitemaps.org/schemas/sitemap/0.9"


def validate_sitemap(filepath):
    """Validate sitemap.xml structure and content."""
    print(f"Validating: {filepath}")
    print()

    try:
        tree = ET.parse(filepath)
        root = tree.getroot()
    except ET.ParseError as e:
        print(f"ERROR: Invalid XML syntax: {e}")
        sys.exit(1)
    except FileNotFoundError:
        print(f"ERROR: File not found: {filepath}")
        sys.exit(1)

    ns = {"sm": SITEMAP_NS}
    urls = root.findall(".//sm:url", ns)

    print(f"Total URLs found: {len(urls)}")
    print()

    errors = []
    urls_seen = set()

    for i, url in enumerate(urls, 1):
        loc = url.find("sm:loc", ns)
        lastmod = url.find("sm:lastmod", ns)
        changefreq = url.find("sm:changefreq", ns)
        priority = url.find("sm:priority", ns)

        # Check loc
        if loc is None or not loc.text:
            errors.append(f"URL {i}: Missing or empty <loc>")
        elif loc.text in urls_seen:
            errors.append(f"Duplicate URL: {loc.text}")
        else:
            urls_seen.add(loc.text)
            # Validate URL format
            if not loc.text.startswith("https://"):
                errors.append(f"URL {i}: Not HTTPS: {loc.text}")

        # Check lastmod
        if lastmod is None or not lastmod.text:
            errors.append(f"URL {i}: Missing or empty <lastmod>")

        # Check changefreq
        if changefreq is None or not changefreq.text:
            errors.append(f"URL {i}: Missing or empty <changefreq>")

        # Check priority
        if priority is None or not priority.text:
            errors.append(f"URL {i}: Missing or empty <priority>")

    if errors:
        print("VALIDATION ERRORS:")
        for error in errors:
            print(f"  - {error}")
        sys.exit(1)
    else:
        print("All URLs validated successfully")
        print("No duplicate URLs found")
        print("All required elements present")
        print()
        print("URLs in sitemap:")
        for url in urls:
            loc = url.find("sm:loc", ns)
            priority = url.find("sm:priority", ns)
            if loc is not None and priority is not None:
                print(f"  Priority {priority.text}: {loc.text}")

    return True


if __name__ == "__main__":
    filepath = sys.argv[2] if len(sys.argv) > 2 and sys.argv[1] == "--file" else SITEMAP_FILE
    validate_sitemap(filepath)