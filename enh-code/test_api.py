#!/usr/bin/env python3
"""
DELM API Test Script
Tests all API endpoints with various examples
"""

import requests
import json
import time
import sys

BASE_URL = "http://127.0.0.1:3005"

# Colors for terminal output
class Colors:
    GREEN = '\033[92m'
    RED = '\033[91m'
    YELLOW = '\033[93m'
    BLUE = '\033[94m'
    RESET = '\033[0m'
    BOLD = '\033[1m'

def print_header(text):
    print(f"\n{Colors.BOLD}{Colors.BLUE}{'='*60}{Colors.RESET}")
    print(f"{Colors.BOLD}{Colors.BLUE}{text}{Colors.RESET}")
    print(f"{Colors.BOLD}{Colors.BLUE}{'='*60}{Colors.RESET}\n")

def print_success(text):
    print(f"{Colors.GREEN}✓ {text}{Colors.RESET}")

def print_error(text):
    print(f"{Colors.RED}✗ {text}{Colors.RESET}")

def print_info(text):
    print(f"{Colors.YELLOW}→ {text}{Colors.RESET}")

def test_endpoint(name, method, endpoint, data=None, expected_status=200):
    """Test an API endpoint and return success status"""
    url = f"{BASE_URL}{endpoint}"
    print_info(f"Testing: {name}")

    try:
        if method == "GET":
            response = requests.get(url, timeout=60)
        else:
            response = requests.post(url, json=data, timeout=120)

        if response.status_code == expected_status:
            print_success(f"Status: {response.status_code}")
            return True, response.json()
        else:
            print_error(f"Status: {response.status_code} (expected {expected_status})")
            print(f"  Response: {response.text[:200]}")
            return False, None
    except requests.exceptions.ConnectionError:
        print_error("Connection failed - is the server running?")
        return False, None
    except requests.exceptions.Timeout:
        print_error("Request timed out")
        return False, None
    except Exception as e:
        print_error(f"Error: {str(e)}")
        return False, None

def main():
    print_header("DELM API Test Suite")

    results = []

    # ========================================
    # Test 1: Root endpoint
    # ========================================
    print_header("1. Root Endpoint")
    success, data = test_endpoint(
        "GET /",
        "GET",
        "/"
    )
    results.append(("Root endpoint", success))
    if success:
        print(f"  Message: {data.get('message')}")
        print(f"  Version: {data.get('version')}")

    # ========================================
    # Test 2: Health check
    # ========================================
    print_header("2. Health Check")
    success, data = test_endpoint(
        "GET /health",
        "GET",
        "/health"
    )
    results.append(("Health check", success))
    if success:
        print(f"  Status: {data.get('status')}")
        print(f"  Model loaded: {data.get('model_loaded')}")
        print(f"  Patterns count: {data.get('patterns_count')}")

    # ========================================
    # Test 3: Get categories
    # ========================================
    print_header("3. Get Categories")
    success, data = test_endpoint(
        "GET /categories",
        "GET",
        "/categories"
    )
    results.append(("Get categories", success))
    if success:
        print(f"  Categories: {', '.join(data.get('categories', []))}")

    # ========================================
    # Test 4: Get pattern count
    # ========================================
    print_header("4. Pattern Count")
    success, data = test_endpoint(
        "GET /patterns/count",
        "GET",
        "/patterns/count"
    )
    results.append(("Pattern count", success))
    if success:
        print(f"  Count: {data.get('count')}")

    # ========================================
    # Test 5: Add a custom pattern
    # ========================================
    print_header("5. Add Custom Pattern")
    success, data = test_endpoint(
        "POST /patterns",
        "POST",
        "/patterns",
        {
            "pattern_id": "test-comp-001",
            "name": "Test Badge Component",
            "category": "components",
            "tags": ["badge", "label", "status"],
            "content": """import React from 'react';
import { clsx } from 'clsx';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md'
}) => {
  const variants = {
    default: 'bg-gray-100 text-gray-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    error: 'bg-red-100 text-red-800'
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm'
  };

  return (
    <span className={clsx(
      'inline-flex items-center font-medium rounded-full',
      variants[variant],
      sizes[size]
    )}>
      {children}
    </span>
  );
};"""
        }
    )
    results.append(("Add pattern", success))
    if success:
        print(f"  {data.get('message')}")

    # ========================================
    # Test 6: Search patterns
    # ========================================
    print_header("6. Search Patterns")

    # Test 6a: General search
    success, data = test_endpoint(
        "Search for button components",
        "POST",
        "/search",
        {
            "query": "button with variants and sizes",
            "top_k": 3
        }
    )
    results.append(("Search patterns", success))
    if success:
        print(f"  Found: {data.get('count')} patterns")
        for pattern in data.get('patterns', []):
            print(f"    - {pattern.get('metadata', {}).get('name')} ({pattern.get('id')})")

    # Test 6b: Category-filtered search
    print()
    success, data = test_endpoint(
        "Search with category filter",
        "POST",
        "/search",
        {
            "query": "responsive grid",
            "category": "layouts",
            "top_k": 2
        }
    )
    if success:
        print(f"  Found: {data.get('count')} layout patterns")

    # ========================================
    # Test 7: Generate Component
    # ========================================
    print_header("7. Generate Component")

    print_info("Generating: Button with loading state...")
    print("  (This may take 30-60 seconds on first run)\n")

    start_time = time.time()
    success, data = test_endpoint(
        "Generate button component",
        "POST",
        "/generate",
        {
            "prompt": "Create a button component with loading spinner, disabled state, and primary/secondary/outline variants",
            "type": "component",
            "category": "components"
        }
    )
    elapsed = time.time() - start_time
    results.append(("Generate component", success))

    if success:
        print(f"  Generation time: {elapsed:.2f}s")
        print(f"  Patterns used: {data.get('patterns_used')}")
        print(f"  Pattern IDs: {', '.join(data.get('pattern_ids', []))}")
        print(f"\n  Output preview (first 500 chars):")
        print(f"  {'-'*50}")
        output = data.get('output', '')[:500]
        for line in output.split('\n'):
            print(f"  {line}")
        if len(data.get('output', '')) > 500:
            print(f"  ... ({len(data.get('output', '')) - 500} more characters)")

    # ========================================
    # Test 8: Generate Styles
    # ========================================
    print_header("8. Generate Styles")

    print_info("Generating: Design tokens...")

    start_time = time.time()
    success, data = test_endpoint(
        "Generate design tokens",
        "POST",
        "/generate",
        {
            "prompt": "Create design tokens for a dark theme with purple accent colors",
            "type": "styles"
        }
    )
    elapsed = time.time() - start_time
    results.append(("Generate styles", success))

    if success:
        print(f"  Generation time: {elapsed:.2f}s")
        print(f"  Patterns used: {data.get('patterns_used')}")
        print(f"\n  Output preview (first 400 chars):")
        print(f"  {'-'*50}")
        output = data.get('output', '')[:400]
        for line in output.split('\n'):
            print(f"  {line}")

    # ========================================
    # Test 9: Generate Layout
    # ========================================
    print_header("9. Generate Layout")

    print_info("Generating: Dashboard layout...")

    start_time = time.time()
    success, data = test_endpoint(
        "Generate dashboard layout",
        "POST",
        "/generate",
        {
            "prompt": "Create a dashboard layout with fixed header, collapsible sidebar, and main content area with breadcrumbs",
            "type": "layout"
        }
    )
    elapsed = time.time() - start_time
    results.append(("Generate layout", success))

    if success:
        print(f"  Generation time: {elapsed:.2f}s")
        print(f"  Patterns used: {data.get('patterns_used')}")
        print(f"\n  Output preview (first 400 chars):")
        print(f"  {'-'*50}")
        output = data.get('output', '')[:400]
        for line in output.split('\n'):
            print(f"  {line}")

    # ========================================
    # Test Summary
    # ========================================
    print_header("Test Summary")

    passed = sum(1 for _, success in results if success)
    total = len(results)

    for name, success in results:
        if success:
            print_success(name)
        else:
            print_error(name)

    print(f"\n{Colors.BOLD}Results: {passed}/{total} tests passed{Colors.RESET}")

    if passed == total:
        print(f"\n{Colors.GREEN}{Colors.BOLD}All tests passed!{Colors.RESET}")
        return 0
    else:
        print(f"\n{Colors.RED}{Colors.BOLD}Some tests failed.{Colors.RESET}")
        return 1

if __name__ == "__main__":
    sys.exit(main())
