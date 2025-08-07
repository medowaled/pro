from playwright.sync_api import sync_playwright, expect

def run_verification():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        try:
            # Go to a protected admin route
            print("Navigating to protected admin route...")
            page.goto("http://localhost:9002/admin/dashboard", wait_until="networkidle")

            # Expect to be redirected to the login page
            print("Checking for redirection to login page...")
            expect(page).to_have_url("http://localhost:9002/login?redirect=%2Fadmin%2Fdashboard")
            print("Successfully redirected to login page.")

            # Fill in the login form
            print("Filling login form...")
            page.get_by_label("رقم الهاتف").fill("966500000000")
            page.get_by_label("كلمة المرور").fill("admin123")

            # Click the login button
            print("Clicking login button...")
            page.get_by_role("button", name="دخول").click()

            # Expect to be redirected back to the original admin page
            print("Waiting for redirection to original page...")
            expect(page).to_have_url("http://localhost:9002/admin/dashboard")
            print("Successfully redirected to /admin/dashboard.")

            # Take a screenshot
            screenshot_path = "jules-scratch/verification/verification.png"
            print(f"Taking screenshot at {screenshot_path}...")
            page.screenshot(path=screenshot_path)
            print("Screenshot taken.")

        except Exception as e:
            print(f"An error occurred: {e}")
            # Take a screenshot on error as well for debugging
            page.screenshot(path="jules-scratch/verification/error.png")

        finally:
            browser.close()

if __name__ == "__main__":
    run_verification()
