=== Static Xeets for Twitter - Embed x.com Tweets without an iframe ===
Contributors:      kbat82
Tags:              block, tweet, twitter, x, xeet, embed
Tested up to:      6.3
Stable tag:        1.0.0
License:           GPL-2.0-or-later
License URI:       https://www.gnu.org/licenses/gpl-2.0.html

Say goodbye to bulky iFrames! Embed a Tweet/Xeet and save 500kb page load!

== Description ==

The standard Tweet, or Xeet, loads in 500kb of client-side JavaScript. By pre-rendering the embed statically beforehand, you save 500kb of page load.

[https://github.com/KevinBatdorf/wp-xeet](https://github.com/KevinBatdorf/wp-xeet)

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

= What is a Xeet? =

I'm not entirely sure, but calling it a "Post" seems too generic, and calling it a "Tweet" is technically inaccurate. So, I'm calling it a "Xeet". This may change in the fuure.

= Self host the API? =

Coming soon, but you will be able to self host the backend API, which requires a basic Node.JS server. Open an issue on GitHub if you are interested in this.

= Persist Dark mode? =

If you add `data-theme="light"` (or 'dark') anywhere above the block (for example, on the body tag), the block will respect that theme. There is also an override "per block" if needed

== Screenshots ==

1. Screenshot 1

== Changelog ==

= 1.0.0 =
* Release
