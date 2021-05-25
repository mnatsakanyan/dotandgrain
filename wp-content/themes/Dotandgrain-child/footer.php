<?php
/**
 * The template for displaying the footer
 *
 * Contains the closing of the #content div and all content after.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package WordPress
 * @subpackage Twenty_Twenty_One
 * @since Twenty Twenty-One 1.0
 */

?>
			</main><!-- #main -->
		</div><!-- #primary -->
	</div><!-- #content -->
<?php if(is_front_page() ) { ?>
    <footer id="colophon" class="fm-site-footer aaaa" role="contentinfo">
        <?php echo do_shortcode('[elementor-template id="396"]')?>
    </footer><!-- #colophon -->
<?php } else { ?>
    <footer id="colophon" class="fm-site-footer bbbb" role="contentinfo">
        <?php echo do_shortcode('[elementor-template id="958"]')?>
        <?php echo do_shortcode('[elementor-template id="961"]')?>
        <?php echo do_shortcode('[elementor-template id="396"]')?>
    </footer><!-- #colophon -->
<?php } ?>


</div><!-- #page -->

<?php wp_footer(); ?>

</body>
</html>
