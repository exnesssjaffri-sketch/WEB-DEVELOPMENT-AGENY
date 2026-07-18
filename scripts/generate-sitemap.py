#!/usr/bin/env python3
"""
=============================================================================
 SITEMAP GENERATOR - Website Development Agency (WDA)
 Automatically generates sitemap.xml by scanning the project directory.
 
 Usage:
   python scripts/generate-sitemap.py [--domain DOMAIN] [--output OUTPUT]
   
   --domain   : Production domain (default: https://wda.com)
   --output   : Output file path (default: sitemap.xml)
   
 Example:
   python scripts/generate-sitemap.py --domain https://example.com
=============================================================================
"""

import os
import sys
import argparse
import xml.etree.ElementTree as ET
from xml.dom import minidom
from datetime import datetime, timezone
from pathlib import Path

# ============================================
# CONFIGURATION
# ============================================

# Default domain (can be overridden via --domain flag)
DEFAULT_DOMAIN = "https://wda.com"

# Pages to exclude from sitemap
EXCLUDED_PAGES = {
    "google*.html",
    "404.html",
    "500.html",
    "error.html",
    "maintenance.html",
    "coming-soon.html",
}

# Directories to exclude from scanning
EXCLUDED_DIRS = {
    "admin",
    "dashboard",
    "login",
    "api",
    "private",
    "tmp",
    "drafts",
    "preview",
    "node_modules",
    "vendor",
    "storage",
    "cache",
    "logs",
    ".git",
    ".github",
    ".vscode",
    "scripts",
    "assets",
    "images",
    "img",
    "fonts",
    "icons",
}

# File extensions to include
INCLUDE_EXTENSIONS = {".html", ".htm", ".php", ".asp", ".aspx", ".jsp"}

# Priority mapping based on URL patterns
PRIORITY_MAP = [
    (lambda path: path == "index.html" or path == "", 1.0),
    (lambda path: path.startswith("services"), 0.9),
    (lambda path: path.startswith("portfolio") and "/" not in path, 0.9),
    (lambda path: path.startswith("about"), 0.8),
    (lambda path: path.startswith("blog") and "/" not in path, 0.8),
    (lambda path: path.startswith("pricing"), 0.7),
    (lambda path: path.startswith("contact"), 0.7),
    (lambda path: path.startswith("faq"), 0.6),
    (lambda path: path.startswith("gallery"), 0.6),
    (lambda path: path.startswith("testimonials"), 0.6),
    (lambda path: path.startswith("careers"), 0.5),
    (lambda path: path.startswith("team"), 0.5),
    (lambda path: path.startswith("privacy"), 0.3),
    (lambda path: path.startswith("terms"), 0.3),
    (lambda path: True, 0.5),  # Default priority
]

# Changefreq mapping based on URL patterns
CHANGEFREQ_MAP = [
    (lambda path: path == "index.html" or path == "", "weekly"),
    (lambda path: path.startswith("blog"), "weekly"),
    (lambda path: path.startswith("portfolio"), "weekly"),
    (lambda path: path.startswith("services"), "monthly"),
    (lambda path: path.startswith("about"), "monthly"),
    (lambda path: path.startswith("contact"), "monthly"),
    (lambda path: path.startswith("pricing"), "monthly"),
    (lambda path: path.startswith("privacy"), "yearly"),
    (lambda path: path.startswith("terms"), "yearly"),
    (lambda path: True, "monthly"),  # Default changefreq
]


def get_priority(relative_path):
    """Determine priority based on URL pattern."""
    normalized = relative_path.replace("\\", "/").lower()
    for matcher, priority in PRIORITY_MAP:
        if matcher(normalized):
            return priority
    return 0.5


def get_changefreq(relative_path):
    """Determine changefreq based on URL pattern."""
    normalized = relative_path.replace("\\", "/").lower()
    for matcher, freq in CHANGEFREQ_MAP:
        if matcher(normalized):
            return freq
    return "monthly"


def get_lastmod(file_path):
    """Get last modification date of a file."""
    try:
        timestamp = os.path.getmtime(file_path)
        dt = datetime.fromtimestamp(timestamp, tz=timezone.utc)
        return dt.strftime("%Y-%m-%d")
    except (OSError, ValueError):
        return datetime.now(timezone.utc).strftime("%Y-%m-%d")


def should_include(file_path, base_dir):
    """Check if a file should be included in the sitemap."""
    # Get relative path
    rel_path = os.path.relpath(file_path, base_dir)
    rel_path = rel_path.replace("\\", "/")

    # Check if file has valid extension
    ext = os.path.splitext(file_path)[1].lower()
    if ext not in INCLUDE_EXTENSIONS:
        return False

    # Check if file is in excluded directories
    parts = rel_path.split("/")
    for part in parts:
        if part in EXCLUDED_DIRS:
            return False

    # Check if file matches excluded patterns
    filename = os.path.basename(file_path)
    for pattern in EXCLUDED_PAGES:
        if pattern.endswith("*"):
            if filename.startswith(pattern[:-1]):
                return False
        elif filename == pattern:
            return False

    return True


def build_url(domain, relative_path):
    """Build the full URL from domain and relative path."""
    # Normalize path
    rel_path = relative_path.replace("\\", "/")

    # Handle index.html -> root
    if rel_path == "index.html":
        return domain + "/"

    # Remove leading ./ or .\
    if rel_path.startswith("./"):
        rel_path = rel_path[2:]

    return domain + "/" + rel_path


def generate_sitemap(base_dir, domain, output_path):
    """Generate sitemap.xml by scanning the project directory."""
    print(f"🔍 Scanning: {base_dir}")
    print(f"🌐 Domain: {domain}")
    print(f"📄 Output: {output_path}")
    print()

    # Create root element
    urlset = ET.Element("urlset")
    urlset.set("xmlns", "http://www.sitemaps.org/schemas/sitemap/0.9")
    urlset.set("xmlns:xhtml", "http://www.w3.org/1999/xhtml")
    urlset.set(
        "xmlns:image", "http://www.google.com/schemas/sitemap-image/1.1"
    )

    urls_found = 0
    urls_included = 0

    # Walk through directory
    for root, dirs, files in os.walk(base_dir):
        # Remove excluded directories from traversal
        dirs[:] = [d for d in dirs if d not in EXCLUDED_DIRS]

        for file in sorted(files):
            file_path = os.path.join(root, file)
            urls_found += 1

            if not should_include(file_path, base_dir):
                continue

            # Get relative path
            rel_path = os.path.relpath(file_path, base_dir)
            rel_path = rel_path.replace("\\", "/")

            # Build URL
            loc = build_url(domain, rel_path)

            # Get metadata
            lastmod = get_lastmod(file_path)
            changefreq = get_changefreq(rel_path)
            priority = get_priority(rel_path)

            # Create URL entry
            url_elem = ET.SubElement(urlset, "url")

            loc_elem = ET.SubElement(url_elem, "loc")
            loc_elem.text = loc

            lastmod_elem = ET.SubElement(url_elem, "lastmod")
            lastmod_elem.text = lastmod

            changefreq_elem = ET.SubElement(url_elem, "changefreq")
            changefreq_elem.text = changefreq

            priority_elem = ET.SubElement(url_elem, "priority")
            priority_elem.text = f"{priority:.1f}"

            urls_included += 1
            print(f"  ✅ {loc} (priority: {priority:.1f}, freq: {changefreq})")

    # Generate pretty XML
    rough_string = ET.tostring(urlset, encoding="unicode")
    reparsed = minidom.parseString(rough_string)
    pretty_xml = reparsed.toprettyxml(indent="    ", encoding="UTF-8")

    # Write to file
    with open(output_path, "wb") as f:
        f.write(pretty_xml)

    print()
    print("=" * 60)
    print(f"✅ SITEMAP GENERATED SUCCESSFULLY!")
    print(f"   Total files found: {urls_found}")
    print(f"   URLs included: {urls_included}")
    print(f"   URLs excluded: {urls_found - urls_included}")
    print(f"   Output: {output_path}")
    print("=" * 60)

    return urls_included


def main():
    parser = argparse.ArgumentParser(
        description="Generate sitemap.xml for WDA website"
    )
    parser.add_argument(
        "--domain",
        type=str,
        default=DEFAULT_DOMAIN,
        help=f"Production domain (default: {DEFAULT_DOMAIN})",
    )
    parser.add_argument(
        "--output",
        type=str,
        default="sitemap.xml",
        help="Output file path (default: sitemap.xml)",
    )
    parser.add_argument(
        "--base-dir",
        type=str,
        default=".",
        help="Base directory to scan (default: current directory)",
    )

    args = parser.parse_args()

    # Resolve base directory
    base_dir = os.path.abspath(args.base_dir)

    # Ensure domain doesn't have trailing slash
    domain = args.domain.rstrip("/")

    # Generate sitemap
    generate_sitemap(base_dir, domain, args.output)


if __name__ == "__main__":
    main()