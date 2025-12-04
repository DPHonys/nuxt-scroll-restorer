import { expect, test } from '@nuxt/test-utils/playwright'

test.describe('Scroll Restoration', () => {
  test.beforeEach(async ({ goto }) => {
    // Reset state between tests by navigating to home
    await goto('/', { waitUntil: 'hydration' })
  })

  test('saves and restores scroll position on back navigation', async ({
    page,
    goto,
  }) => {
    // Navigate to high page
    await goto('/high', { waitUntil: 'hydration' })

    // Scroll down
    await page.evaluate(() => window.scrollTo(0, 500))
    await page.waitForTimeout(700) // Wait for throttled scroll save

    // Navigate to home
    await page.click('a[href="/"]')
    await page.waitForURL('/')

    // Go back
    await page.goBack()
    await page.waitForURL('/high')

    // Wait for scroll restoration
    await page.waitForTimeout(500)

    // Check scroll position was restored (with some tolerance)
    const scrollY = await page.evaluate(() => window.scrollY)
    expect(scrollY).toBeGreaterThan(400)
    expect(scrollY).toBeLessThan(600)
  })

  test('scrolls to anchor on direct navigation', async ({ page, goto }) => {
    // Navigate directly to anchor
    await goto('/high#section-1', { waitUntil: 'hydration' })

    // Wait for scroll to anchor
    await page.waitForTimeout(500)

    // Check that section-1 is in view
    const isVisible = await page.evaluate(() => {
      const element = document.getElementById('section-1')
      if (!element) return false
      const rect = element.getBoundingClientRect()
      return rect.top >= -100 && rect.top <= window.innerHeight
    })
    expect(isVisible).toBe(true)
  })

  test('waits for lazy element and scrolls to anchor', async ({
    page,
    goto,
  }) => {
    // Navigate to lazy section (appears after 1s delay)
    await goto('/high#lazy-section', { waitUntil: 'hydration' })

    // Wait for lazy content to load and scroll (1s delay + buffer)
    await page.waitForSelector('#lazy-section', { timeout: 5000 })
    await page.waitForTimeout(500)

    // Check that lazy-section is in view
    const isVisible = await page.evaluate(() => {
      const element = document.getElementById('lazy-section')
      if (!element) return false
      const rect = element.getBoundingClientRect()
      return rect.top >= -100 && rect.top <= window.innerHeight
    })
    expect(isVisible).toBe(true)
  })

  test('waits for async content and scrolls to anchor', async ({
    page,
    goto,
  }) => {
    // Navigate to async page with item anchor (items load after 2s)
    await goto('/async#item-5', { waitUntil: 'hydration' })

    // Wait for async content to load (2s delay + buffer)
    await page.waitForSelector('#item-5', { timeout: 10000 })
    await page.waitForTimeout(500)

    // Check that item-5 is in view
    const isVisible = await page.evaluate(() => {
      const element = document.getElementById('item-5')
      if (!element) return false
      const rect = element.getBoundingClientRect()
      return rect.top >= -100 && rect.top <= window.innerHeight
    })
    expect(isVisible).toBe(true)
  })

  test('scrolls to top on forward navigation', async ({ page, goto }) => {
    // Navigate to high page and scroll down
    await goto('/high', { waitUntil: 'hydration' })
    await page.evaluate(() => window.scrollTo(0, 800))
    await page.waitForTimeout(700)

    // Verify we scrolled
    const scrollBefore = await page.evaluate(() => window.scrollY)
    expect(scrollBefore).toBeGreaterThan(700)

    // Navigate forward to async page via link click (not back/forward)
    await page.click('a[href="/"]')
    await page.waitForURL('/')
    await page.waitForTimeout(500)

    // Check we're at the top (fresh forward navigation should scroll to top)
    const scrollY = await page.evaluate(() => window.scrollY)
    expect(scrollY).toBeLessThan(50)
  })

  test('anchor in same page scrolls to element', async ({ page, goto }) => {
    // Navigate to home
    await goto('/', { waitUntil: 'hydration' })

    // Click on internal anchor link
    await page.click('a[href="/#section-1"]')
    await page.waitForTimeout(500)

    // Check that section-1 is in view
    const isVisible = await page.evaluate(() => {
      const element = document.getElementById('section-1')
      if (!element) return false
      const rect = element.getBoundingClientRect()
      return rect.top >= -100 && rect.top <= window.innerHeight
    })
    expect(isVisible).toBe(true)
  })
})
