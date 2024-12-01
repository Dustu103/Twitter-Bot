import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
  manifest: {
        "name": "Twitter Follow bot",
        "version": "0.1.0",
        "description": "",
        "permissions": ["scripting", "activeTab", "tabs"],
        "host_permissions": ["https://x.com/*"],
        "background": {
          "service_worker": "background.js"
        },
        "content_scripts": [
          {
            "matches": ["https://x.com/*"],
            "js": ["content-scripts/content.js"]
          }
        ],
        "web_accessible_resources": [
          {
            "resources": [
              "icon/16.png",
              "icon/32.png",
              "icon/48.png",
              "icon/96.png",
            ],
            "matches": ["https://x.com/*"]
          }
        ],
        "action": {
          "default_icon": {
            "16": "icon/16.png",
            "24": "icon/32.png",
            "32": "icon/48.png"
          },
          "default_title": "My YT Bookmarks",
          "default_popup": "popup.html"
        },
        "manifest_version": 3
 } 
});
