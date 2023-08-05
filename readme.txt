=== WP Xeet ===
Contributors:      kbat82
Tags:              block, tweet, twitter, x, xeet, embed
Tested up to:      6.3
Stable tag:        0.1.0
License:           GPL-2.0-or-later
License URI:       https://www.gnu.org/licenses/gpl-2.0.html

Embed a Tweet/Xeet without an iframe (and save 500kb page load!)

== Description ==

The standard Tweet, or Xeet, loads in 500kb of client-side JavaScript. By pre-rendering the embed statically beforehand, you save 500kb of page load.

= Features =
* Embed a Tweet/Xeet without an iframe
* Save 500kb of page load
* No Twitter/X cookies, tracking, JavaScript, etc
* Static - Twitter/X changes won't affect your site
* Dark/light auto mode

= Vercel =
The Tweets are parsed on a server hosted on [Vercel](https://vercel.com/). Using this service, and thus connecting to their servers, you agree to their [privacy policy](https://vercel.com/legal/privacy-policy) and [terms](https://vercel.com/legal/terms).

== Installation ==

1. Activate the plugin through the 'Plugins' screen in WordPress


== Frequently Asked Questions ==

= Self host the API? =

Coming soon, but you will be able to self host the backend API, which requires a basic Node.JS server.

= Persist Dark mode? =

If you add `data-theme="light"` (or 'dark') anywhere above the block (for example, on the body tag), the block will respect that theme. There is also an override "per block" if needed

== Screenshots ==

1. Screenshot 1

== Changelog ==

= 0.1.0 =
* Release
