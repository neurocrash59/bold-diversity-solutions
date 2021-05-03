<?php

    function boldDivSol_styles() {
        wp_enqueue_script('boldDivSol_main_js', get_theme_file_uri('/js/script.js'), NULL, '1.0', true);
        wp_enqueue_style( 'bootstrap', 'https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css' );
        wp_enqueue_style('boldDivSol_main_styles', get_stylesheet_uri());
    }
    
    add_action('wp_enqueue_scripts', 'boldDivSol_styles');

?>