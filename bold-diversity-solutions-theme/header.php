<!DOCTYPE html>
<html lang="en">
    <head>
        <?php wp_head(); ?>
    </head>
    <body>
    <header>
        <nav class="navbar navbar-expand-md navbar-dark bg-transparent">
            <div class="container-fluid">
                <a class="navbar-brand" href="<?php echo home_url(); ?>">Bold Diversity Solutions</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse"
                    aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarCollapse">
                    <ul class="navbar-nav nav nav-fill me-auto mb-2 mb-md-0">
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="<?php echo home_url(); ?>">Home</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="<?php echo get_page_link( get_page_by_title( 'About Us' )->ID ); ?>">About</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Blog</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="<?php echo get_page_link( get_page_by_title( 'Contact Us' )->ID ); ?>">Contact</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </header>