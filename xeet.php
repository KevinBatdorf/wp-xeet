<?php
/**
 * Plugin Name:       Xeet WP
 * Description:       Embed a Tweet/Xeet without an iframe
 * Requires at least: 5.8
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Kevin Batdorf
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       xeet-wp
 *
 * @package           kevinbatdorf
 */

add_action('init', function () {
    register_block_type(__DIR__ . '/build');
    wp_set_script_translations('kevinbatdorf/xeet-wp', 'xeet-wp');
	wp_add_inline_style('kevinbatdorf-xeet-style', file_get_contents(__DIR__ . '/build/xeet.css'));
});
