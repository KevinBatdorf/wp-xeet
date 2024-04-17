=== Static Posts for Twitter - Embed x.com Tweets without an iframe ===
Contributors:      kbat82
Tags:              block, tweet, twitter, social, embed
Tested up to:      6.5
Stable tag:        1.0.1
License:           GPL-2.0-or-later
License URI:       https://www.gnu.org/licenses/gpl-2.0.html

Embed x.com Tweets without an iframe. No more cookies and save 500kb from your page load!

== Description ==

The standard Tweet, or Post (or Xeet?), loads in 500kb of front end JavaScript, tracking cookies, and lots of noise. This plugin avoids all of that by pre-rendering the entire Tweet statically. Say goodbye to bulky Tweets!

[https://github.com/KevinBatdorf/wp-xeet](https://github.com/KevinBatdorf/wp-xeet)

= Features =
* Embed a Tweet/Post/Xeet without an iframe
* Save 500kb of page load
* No Twitter/X cookies, tracking, JavaScript, etc
* Static - Twitter/X changes won't affect your site
* Dark/light auto mode

= Vercel =
The Tweets are parsed on a server hosted on [Vercel](https://vercel.com/). Using this service, and thus connecting to their servers, you agree to their [privacy policy](https://vercel.com/legal/privacy-policy) and [terms](https://vercel.com/legal/terms).

*NOTE:* Your frontend does not rely on any api calls, and if the Vercel api shuts down tomorrow, your site will not be affected in any way.

== Installation ==

1. Activate the plugin through the 'Plugins' screen in WordPress


== Frequently Asked Questions ==

= Self host the API? =

Coming soon, but you will be able to self host the backend API, which requires a basic Node.JS server. Open an issue on GitHub if you are interested in this.

= Persist Dark mode? =

If you add `data-theme="light"` (or 'dark') anywhere above the block (for example, on the body tag), the block will respect that theme. There is also an override "per block" if needed

== Screenshots ==

1. Screenshot 1

== Changelog ==

= 1.0.1 - 2024-02-19 =
- Updates the block.json file with a better title
