/**
 * Services Pages Tests (AFOB-3)
 * Tests for dedicated services pages with pricing
 */

const fs = require('fs');
const path = require('path');

class ServicesPageTests {
  constructor() {
    this.passed = 0;
    this.failed = 0;
    this.tests = [];
  }

  test(name, fn) {
    try {
      fn();
      this.passed++;
      this.tests.push({ name, status: 'PASS' });
      console.log(`✅ ${name}`);
    } catch (error) {
      this.failed++;
      this.tests.push({ name, status: 'FAIL', error: error.message });
      console.log(`❌ ${name}: ${error.message}`);
    }
  }

  assert(condition, message) {
    if (!condition) {
      throw new Error(message);
    }
  }

  assertIncludes(content, substring, message) {
    if (!content.includes(substring)) {
      throw new Error(message || `Expected content to include: ${substring}`);
    }
  }

  assertMatch(content, regex, message) {
    if (!regex.test(content)) {
      throw new Error(message || `Expected content to match: ${regex}`);
    }
  }

  loadFile(filePath) {
    const fullPath = path.join(__dirname, '..', filePath);
    if (!fs.existsSync(fullPath)) {
      throw new Error(`File not found: ${filePath}`);
    }
    return fs.readFileSync(fullPath, 'utf-8');
  }

  // Test file existence
  testFileExists(filePath) {
    const fullPath = path.join(__dirname, '..', filePath);
    this.assert(fs.existsSync(fullPath), `File should exist: ${filePath}`);
  }

  // Test service page structure
  testServicePage(filePath, serviceName, priceRange, services) {
    this.test(`${serviceName} page exists`, () => {
      this.testFileExists(filePath);
    });

    this.test(`${serviceName} page has proper meta tags`, () => {
      const content = this.loadFile(filePath);
      this.assertIncludes(content, '<title>', 'Should have title tag');
      this.assertIncludes(content, serviceName, 'Title should include service name');
      this.assertIncludes(content, 'meta name="description"', 'Should have meta description');
    });

    this.test(`${serviceName} page displays pricing`, () => {
      const content = this.loadFile(filePath);
      this.assertIncludes(content, priceRange, `Should display price range: ${priceRange}`);
    });

    this.test(`${serviceName} page has service descriptions`, () => {
      const content = this.loadFile(filePath);
      services.forEach(service => {
        this.assertIncludes(content, service, `Should describe service: ${service}`);
      });
    });

    this.test(`${serviceName} page has duration estimates`, () => {
      const content = this.loadFile(filePath);
      this.assertMatch(content, /\d+\s*(hour|min|hr)/i, 'Should show duration estimates');
    });

    this.test(`${serviceName} page has booking CTA`, () => {
      const content = this.loadFile(filePath);
      this.assertMatch(content, /(Book|Schedule|Appointment)/i, 'Should have booking call-to-action');
    });

    this.test(`${serviceName} page has images`, () => {
      const content = this.loadFile(filePath);
      this.assertIncludes(content, '<img', 'Should have images');
      this.assertIncludes(content, 'assets/images', 'Should reference asset images');
    });

    this.test(`${serviceName} page has schema markup`, () => {
      const content = this.loadFile(filePath);
      this.assertIncludes(content, 'application/ld+json', 'Should have structured data');
      this.assertIncludes(content, '@type', 'Should have schema type');
    });
  }

  runAll() {
    console.log('\n🧪 Running Services Pages Tests (AFOB-3)\n');

    // Test main services page
    this.test('Main services page exists', () => {
      this.testFileExists('services.html');
    });

    this.test('Main services page has all categories', () => {
      const content = this.loadFile('services.html');
      this.assertIncludes(content, 'Wig Styling', 'Should have Wig Styling');
      this.assertIncludes(content, 'Braiding', 'Should have Braiding');
      this.assertIncludes(content, 'Hair Cuts', 'Should have Hair Cuts');
      this.assertIncludes(content, 'Nail Services', 'Should have Nail Services');
    });

    // Test individual service pages
    this.testServicePage(
      'services/wigs.html',
      'Wig Styling',
      '$150',
      ['installation', 'styling', 'customization', 'maintenance', 'lace front']
    );

    this.testServicePage(
      'services/braiding.html',
      'Braiding',
      '$100',
      ['box braids', 'knotless', 'cornrows', 'passion twists', 'boho', 'fulani']
    );

    this.testServicePage(
      'services/cuts.html',
      'Hair Cuts',
      '$45',
      ['precision', 'pixie', 'bob', 'trim', 'shape']
    );

    this.testServicePage(
      'services/nails.html',
      'Nail Services',
      '$35',
      ['gel manicure', 'acrylic', 'nail art', 'pedicure']
    );

    // Mobile responsive tests
    this.test('Pages have responsive viewport meta', () => {
      const pages = ['services.html', 'services/wigs.html', 'services/braiding.html', 'services/cuts.html', 'services/nails.html'];
      pages.forEach(page => {
        const content = this.loadFile(page);
        this.assertIncludes(content, 'viewport', `${page} should have viewport meta`);
      });
    });

    // Summary
    console.log('\n' + '='.repeat(50));
    console.log(`Tests completed: ${this.passed + this.failed}`);
    console.log(`✅ Passed: ${this.passed}`);
    console.log(`❌ Failed: ${this.failed}`);
    console.log('='.repeat(50) + '\n');

    return this.failed === 0;
  }
}

// Run tests if called directly
if (require.main === module) {
  const tester = new ServicesPageTests();
  const success = tester.runAll();
  process.exit(success ? 0 : 1);
}

module.exports = ServicesPageTests;
