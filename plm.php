<?php
/*
	Template Name: Archives - colores
*/

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

use PintucoIcons\Icons;
require_once(__DIR__ . '/pintuco-icons.php');

$requested_uri = $_SERVER['REQUEST_URI'];

$products_main_category;
$products_main_category_name;
$products_main_category_id;

$products_second_category = null;
$products_second_category_id = null;
$products_third_category = null;
$products_third_category_id = null;
$products_fourth_category = null;
$products_fifth_category = null;
$products_sixth_category = null;

$category_products_to_get = null;
$terms = get_terms( array(
	'taxonomy' => 'cat_colores',
	'hide_empty' => false,
) );

if($terms){
	foreach ($terms as $term) {
		if ($term->parent == 0) {
			if (strrpos($requested_uri, 'colores/'.$term->slug)) {
				$products_main_category = $term->slug;
				$products_main_category_name = $term->name;
				$products_main_category_id = $term->term_id;
				$category_products_to_get = $term->slug;		
				break;
			}
		}
	}
}

// primera linea, soluciones construccion, automotriz, industrial etc(menu filtros)
$args = array(
	'taxonomy' => 'cat_colores',
	'hide_empty' => false,
	'orderby' => 'name',
    'order' => 'ASC',
	'parent' => $products_main_category_id
);

$actual_link = "http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";

$terms_children = get_terms( $args );

foreach ($terms_children as $term_children) {
	if ($term_children->parent == $products_main_category_id) {
		if (strrpos($requested_uri, 'colores/'. $products_main_category . '/' . $term_children->slug)) {			
			$products_second_category = $term_children->slug;
			$products_second_category_id = $term_children->term_id;
			$category_products_to_get = $term_children->slug;
		}
	}
}

if ($products_second_category != null) {
	$terms_children_third = get_terms( array(
		'taxonomy' => 'cat_colores',
		'hide_empty' => false,
		'orderby' => 'name',
		'order' => 'ASC',
		'parent' => $products_second_category_id
	) );


	
	if ($terms_children_third) {
		foreach ($terms_children_third as $term_children_third) {
			if (strrpos($requested_uri, 'colores/'. $products_main_category . '/' . $products_second_category . '/' . $term_children_third->slug)) {
				$products_third_category = $term_children_third->slug;
				$products_third_category_id = $term_children_third->term_id;
				$category_products_to_get = $term_children_third->slug;
			}
		}
	}
}

if ($products_third_category != null) {
	$terms_children_fourth = get_terms( array(
		'taxonomy' => 'cat_colores',
		'hide_empty' => false,
		'orderby' => 'name',
		'order' => 'ASC',
		'parent' => $products_third_category_id
	) );

	
	if ($terms_children_fourth) {
		foreach ($terms_children_fourth as $term_children_fourth) {
			if (strrpos($requested_uri, 'colores/'. $products_main_category . '/' . $products_second_category . '/' . $products_third_category . '/' . $term_children_fourth->slug)) {
				$products_fourth_category = $term_children_fourth->slug;
				$products_fourth_category_id = $term_children_fourth->term_id;
				$category_products_to_get = $term_children_fourth->slug;
			}
		}
	}
}

if ($products_fourth_category != null) {
	$terms_children_fifth = get_terms( array(
		'taxonomy' => 'cat_colores',
		'hide_empty' => false,
		'orderby' => 'name',
		'order' => 'ASC',
		'parent' => $products_fourth_category_id
	) );

	
	if ($terms_children_fifth) {
		foreach ($terms_children_fifth as $term_children_fifth) {
			if (strrpos($requested_uri, 'colores/'. $products_main_category . '/' . $products_second_category . '/' . $products_third_category . '/' . $products_fourth_category . '/' . $term_children_fifth->slug)) {
				$products_fifth_category = $term_children_fifth->slug;
				$products_fifth_category_id = $term_children_fifth->term_id;
				$category_products_to_get = $term_children_fifth->slug;
			}
		}
	}
}

if ($products_fifth_category != null) {
	$terms_children_sixth = get_terms( array(
		'taxonomy' => 'cat_colores',
		'hide_empty' => false,
		'orderby' => 'name',
		'order' => 'ASC',
		'parent' => $products_fifth_category_id
	) );

	
	if ($terms_children_sixth) {
		foreach ($terms_children_sixth as $term_children_sixth) {
			if (strrpos($requested_uri, 'colores/'. $products_main_category . '/' . $products_second_category . '/' . $products_third_category . '/' . $products_fourth_category . '/' . $products_fifth_category . '/' . $term_children_sixth->slug)) {
				$products_sixth_category = $term_children_sixth->slug;
				$products_sixth_category_id = $term_children_sixth->term_id;
				$category_products_to_get = $term_children_fifth->slug;
			}
		}
	}
}


$args = array(  
	'post_type' => 'colores',
	'post_status' => 'publish',
	'posts_per_page' => -1,        
	'order' => 'DESC',
	'tax_query' => array(array(
		'taxonomy' => 'cat_colores',
		'field' => 'slug',
		'terms' => $category_products_to_get
	))
);

$first_view = array(  
	'post_type' => 'colores',
	'post_status' => 'publish',
	'posts_per_page' => 12, 
	'order' => 'ASC',
	'tax_query' => array(array(
		'taxonomy' => 'cat_colores',
		'field' => 'slug',
		'terms' => $category_products_to_get
	))
);

$query_posts = new WP_Query( $args );

$first_posts = new WP_Query( $first_view );


get_header();
$slider_color = get_field('lista_colores','option');
?>
<script>
var icon_facebook = `<?= Icons::Facebook_Social(); ?>`;
var icon_twitter = `<?= Icons::Twitter_Social(); ?>`;
var icon_whatsapp = `<?= Icons::Whatsapp_Social(); ?>`;
</script>

<link rel="stylesheet" href="<?php echo get_template_directory_uri() ?>/css/archive-colors.css">
<link rel="stylesheet" href="<?php echo get_template_directory_uri().'/css/rad-industrial.css' ?>">


<?php if($slider_color['slider_colores_escritorio'] || $slider_color['slider_colores_mobile']): ?>
<div class="container-fluid banner" >
	<div class="row">
		<div class="col-md-12">
            <div class="carousel-escritorio">
            <?php if ($slider_color['slider_colores_escritorio']) : ?>
                <?php foreach($slider_color['slider_colores_escritorio'] as $slide) : ?>
                <div class="slide-desktop">
                	<?php if($slide['url']): ?>
                    <a target="_blank" href="<?= $slide['url']; ?>">
                    <?php endif; ?>
                        <img class="w-100" src="<?php echo $slide['imagen'] ?>">
                    </a>
                </div>
                <?php endforeach; ?>
            <?php endif; ?>
			</div>
			<div class="carousel-mobile" style="display: none;">
            <?php if ($slider_color['slider_colores_mobile']) : ?>
                <?php foreach($slider_color['slider_colores_mobile'] as $slide_mobile) : ?>
                <div class="slide-mobile">
                	<?php if($slide_mobile['url_mobile']):?>
                    <a href="<?= $slide_mobile['url_mobile'];?>">
                    <?php endif;?>
                        <img class="w-100" src="<?php echo $slide_mobile['imagen_mobile'] ?>">
                    </a>
                </div>
                <?php endforeach; ?>
            <?php endif; ?>
            </div>
        </div>
	</div>
</div>
<?php endif; ?>



<header class="TitleRAD">
<div class="container">
	<div class="row">
		

		<div class="HeaderRad" style="margin: 0 auto">
	
	<h2>Color en Pintura
		<strong><span class="amarillo"> Electrostática</span></strong></h2>
</div>
	</div>

</div>
</header>

<div class="container">
	<div class="row titulo-colores">
        <div class="col-12">
		<div class="share-header-icons d-none">
			<a class="single-blog-facebook" href="" target="_blank">
				<?= Icons::Facebook_Social(); ?>
			</a>
			<a class="single-blog-twitter" href="" target="_blank">
				<?= Icons::Twitter_Social(); ?>
			</a>
			<a class="single-blog-whatsapp single-blog-whatsapp-movil d-block d-md-none" href="" target="_blank" data-action="share/whatsapp/share"><?= Icons::Whatsapp_Social(); ?></a>
			<a class="single-blog-whatsapp single-blog-whatsapp-desk d-none d-md-block" href="https://api.whatsapp.com/send?text=<?php echo get_permalink(); ?>" target="_blank" data-action="share/whatsapp/share"><?= Icons::Whatsapp_Social(); ?></a>


		</div>
            <h3></h3>
        </div>
        <div class="col-md-12">
            <p>Usa el filtro para encontrar los colores disponibles de acuerdo a la necesidad.<br> *Las muestras de color aquí presentadas son una guía aproximada del color original y pueden variar según la configuración de cada dispositivo.</p>
        </div>                    
    </div>
</div>

<div class="FichaTecnicaRAD">
	<div class="container">
	<div class="row">
		<div class="col-md-12 p-0">
			<div class="row">
				<div class="col-md-2"></div>
				<div class="col-md-4"><h3 class="tituloBuscador">buscador de <span class="bold">colores</span></h3></div>

				<div class="col-md-4"><div class="row search-form-container">
			  <?php 
			    $form = get_search_form( false );
				$form = str_replace( '<input id="searchsubmit" value="Buscar" type="submit">', '<input type="hidden" name="post_type" value="colores"><input id="searchsubmit" value="Buscar" type="submit">', $form );
				echo $form;
			 ?>      
	        </div></div>

	        <div class="col-md-2"></div>

	        <hr class="lineaRAD">
			</div>

		</div>
		<div class="col-md-3 p-0">
			<div class="menu-busqueda-colores">
				<ul class="list-products-main">	
                    <li style="background: #6b6b6b; color: white;">
						<h3>
							FILTRAR
							<br>
							<span class="bold">TU BÚSQUEDA</span>
						</h3>
					</li>
					<?php if ($terms_children) : ?>
						<?php foreach ($terms_children as $key_second_level => $term_children) : ?>
						<li class="list-term-filter-first-child">
							<?php 
							$query = new WP_Query( array(
								'post_type' => 'colores',
								'post_status' => 'publish',
								'posts_per_page' => -1,        
								'order' => 'DESC',
								'tax_query' => array(array(
									'taxonomy' => 'cat_colores',
									'field' => 'slug',
									'terms' => $term_children->slug
								))
							) ); 
							
							$term_first_child_id = $term_children->term_id;
							?>
								<?php echo '<a id="opener-'.$term_children->slug.'"  data-toggle="collapse" href="#list-second-'.$term_children->slug.$key_second_level.'" aria-expanded="false">' . $term_children->name  . '</a>'?> 
								<?php // . '(' . $query->found_posts . ')' //Cantidad del primer filtro ?>
								<?php //print_r($term_children); ?>
								<?php 
								// onclick="filterColors(`'.$term_children->slug.'`, this)"
								
								$term_arg = array(
									'taxonomy' => 'cat_colores',
									'hide_empty' => false,
									'orderby' => 'name',
									'order' => 'ASC',
									'parent' => $term_first_child_id
								);

								if($term_children->term_id == 39){
									$term_arg['order'] = 'DESC';
								}
								
								$terms_children_second_level = get_terms( $term_arg ); 

								if ($terms_children_second_level) {
								?>
									<ul id="list-second-<?php echo $term_children->slug . $key_second_level; ?>" class="panel-collapse collapse">
								<?php
									foreach($terms_children_second_level as $key_third_level => $term_children_second_level) {
										$query = new WP_Query( array(
											'post_type' => 'colores',
											'post_status' => 'publish',
											'posts_per_page' => -1,        
											'order' => 'ASC',
											'tax_query' => array(array(
												'taxonomy' => 'cat_colores',
												'field' => 'slug',
												'terms' => $term_children_second_level->slug
											))
										) ); 

										echo '<li class="term-list-second-level">';										
										echo '<a id="opener-'.$term_children_second_level->slug.'" onclick="filterColors(`'.$term_children_second_level->slug.'`, this)" data-toggle="collapse" href="#list-third-'.$term_children_second_level->slug.$key_third_level.'" aria-expanded="false">' . $term_children_second_level->name . ' (' . $query->found_posts . ')' . '</a>';
										
										$terms_children_third_level = get_terms( array(
											'taxonomy' => 'cat_colores',
											'hide_empty' => false,
											'orderby' => 'name',
											'order' => 'ASC',
											'parent' => $term_children_second_level->term_id
										) );
										
										if ($terms_children_third_level) { ?>
											<ul id="list-third-<?php echo $term_children_second_level->slug.$key_third_level; ?>" class="panel-collapse collapse">
										<?php
											foreach($terms_children_third_level as $key_fourth_level => $term_children_third_level) {
												$query = new WP_Query( array(
													'post_type' => 'colores',
													'post_status' => 'publish',
													'posts_per_page' => -1,        
													'order' => 'ASC',
													'tax_query' => array(array(
														'taxonomy' => 'cat_colores',
														'field' => 'slug',
														'terms' => $term_children_third_level->slug
													))
												) ); 
												echo '<li class="term-list-third-level">';										
												echo '<a id="opener-'.$term_children_third_level->slug.'" onclick="filterColors(`'.$term_children_third_level->slug.'`, this)" data-toggle="collapse" href="#list-fourth-'.$term_children_third_level->slug.$key_fourth_level.'" aria-expanded="false">' . $term_children_third_level->name  . ' (' . $query->found_posts . ')' . '</a>';

												$terms_children_fourth_level = get_terms( array(
													'taxonomy' => 'cat_colores',
													'hide_empty' => false,
													'orderby' => 'name',
													'order' => 'ASC',
													'parent' => $term_children_third_level->term_id
												) );

												if ($terms_children_fourth_level) { ?>
													<ul id="list-fourth-<?php echo $term_children_third_level->slug.$key_fourth_level; ?>" class="panel-collapse collapse">
												<?php
													foreach($terms_children_fourth_level as $key_fifth_level => $term_children_fourth_level) {
														$query = new WP_Query( array(
															'post_type' => 'colores',
															'post_status' => 'publish',
															'posts_per_page' => -1,        
															'order' => 'ASC',
															'tax_query' => array(array(
																'taxonomy' => 'cat_colores',
																'field' => 'slug',
																'terms' => $term_children_fourth_level->slug
															))
														) ); 
														
														echo '<li class="term-list-fourth-level">';										
														echo '<a id="opener-'.$term_children_fourth_level->slug.'" onclick="filterColors(`'.$term_children_fourth_level->slug.'`, this)" data-toggle="collapse" href="#list-fifth-'.$term_children_fourth_level->slug.$key_fifth_level.'" aria-expanded="false">' . $term_children_fourth_level->name  . ' (' . $query->found_posts . ')' . '</a>';
														
														$terms_children_fifth_level = get_terms( array(
															'taxonomy' => 'cat_colores',
															'hide_empty' => false,
															'orderby' => 'name',
															'order' => 'ASC',
															'parent' => $term_children_fourth_level->term_id
														) );

														if ($terms_children_fifth_level) { ?>
															<ul id="list-fifth-<?php echo $term_children_fourth_level->slug.$key_fifth_level; ?>" class="panel-collapse collapse">
														<?php
															foreach($terms_children_fifth_level as $key_sixth_level => $term_children_fifth_level) {
																$query = new WP_Query( array(
																	'post_type' => 'colores',
																	'post_status' => 'publish',
																	'posts_per_page' => -1,        
																	'order' => 'ASC',
																	'tax_query' => array(array(
																		'taxonomy' => 'cat_colores',
																		'field' => 'slug',
																		'terms' => $term_children_fifth_level->slug
																	))
																) ); 
																
																echo '<li class="term-list-fifth-level">';										
																echo '<a id="opener-'.$term_children_fifth_level->slug.'" onclick="filterColors(`'.$term_children_fifth_level->slug.'`, this)" data-toggle="collapse" href="#list-sixth-'.$term_children_fifth_level->slug.$key_sixth_level.'" aria-expanded="false">' . $term_children_fifth_level->name  . ' (' . $query->found_posts . ')' . '</a>';

																$terms_children_sixth_level = get_terms( array(
																	'taxonomy' => 'cat_colores',
																	'hide_empty' => false,
																	'orderby' => 'name',
																	'order' => 'ASC',
																	'parent' => $term_children_fifth_level->term_id
																) );

																if ($terms_children_sixth_level) { ?>
																	<ul id="list-sixth-<?php echo $term_children_fifth_level->slug.$key_sixth_level; ?>" class="panel-collapse collapse">
																<?php
																	foreach($terms_children_sixth_level as $term_children_sixth_level) {
																		$query = new WP_Query( array(
																			'post_type' => 'colores',
																			'post_status' => 'publish',
																			'posts_per_page' => -1,        
																			'order' => 'ASC',
																			'tax_query' => array(array(
																				'taxonomy' => 'cat_colores',
																				'field' => 'slug',
																				'terms' => $term_children_sixth_level->slug
																			))
																		) ); 
																		
																		echo '<li class="term-list-sixth-level">';										
																		echo '<a id="opener-'.$term_children_sixth_level->slug.'" onclick="filterColors(`'.$term_children_sixth_level->slug.'`, this)" href="#" aria-expanded="false">' . $term_children_sixth_level->name  . ' (' . $query->found_posts . ')' . '</a>';
																		echo '</li>';
																	}
																?>
																	</ul>
																<?php
																}
																echo '</li>';
															}
														?>		
															</ul>	
														<?php
														}
														echo '</li>';
													}
												?>
													</ul>
												<?php
												}
												echo '</li>';
											}
										?>
											</ul>
										<?php
										}
										echo '</li>';
									}
								?>
									</ul>
								<?php
								}
								?>							
						</li>
						<?php endforeach ?>
					<?php endif ?>
					<?php wp_reset_postdata(); ?>
				</ul>
			</div>
		</div>
		<div class="col-md-9 products-list polvosPintuco">
			
			
			<div class="container-fluid">
				<div class="row">
					<div class="col-md-12 text-center">
						<h3>Resultados de tu búsqueda: <span id="counter-products"><?php echo count($query_posts->posts); ?></span> colores</h3>
					</div>
				</div>
				<div id="coloresGrid">
				</div>
			</div>
		</div>
	</div>
</div>
</div>

<?php // echo get_template_directory_uri(); ?>
<div class="overlay-colors">
<!-- 	<div class="spinner topSpinner">
		<span>
			<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" focusable="false">
				<circle cx="14" cy="14" r="12" fill="none" stroke="#000" stroke-width="4" opacity=".15"/>
				<circle pathLength="1" cx="14" cy="14" r="12" fill="none" stroke="#163288" stroke-width="4" stroke-dasharray="27 57" stroke-linecap="round" stroke-linejoin="round" />
			</svg>
		</span>
	</div> -->
</div>

<div class="btn-contactanos">
	<a href="https://pintuco.com.co/formulario-contacto-pintura-polvo/">¡Contáctenos! Pintuco te acompaña </a>
</div>



<script src="<?php echo get_template_directory_uri() ?>/js/archive-colores.js"></script>

<script type="text/javascript">
	jQuery(window).ready(function() {
		var urlLocation = window.location;
		// var hash = getParameterByName('categoria-color');
        var hash = window.location.hash.substring(1);
        var filterEl = jQuery('#opener-'+hash);
		if (filterEl && hash) {
			filterEl.click();
			filterEl.parent().parent().collapse('show');
			filterEl.parent().parent().parent().parent().collapse('show');
		} else{
			filterColors('all');
		}
		jQuery('.single-blog-facebook').attr('href','http://www.facebook.com/sharer.php?u='+urlLocation);
		jQuery('.single-blog-twitter').attr('href','http://twitter.com/share?url='+urlLocation);
		jQuery('.single-blog-whatsapp-movil').attr('href','whatsapp://send?text='+urlLocation);
		jQuery('.single-blog-whatsapp-desk').attr('href','https://api.whatsapp.com/send?text='+urlLocation);
		
	});
	
	
		
	/* Script for responsive menu */
	const clicToMenu = document.querySelector('h3.menu-internal-menu');
	console.log(clicToMenu);
	
	clicToMenu.addEventListener('click', function(){
		let addMenuClass = document.querySelector('.MenuRAD ul');
		
		if(addMenuClass.classList.contains('show-menu')){
			addMenuClass.classList.remove('show-menu');
		}else{
			addMenuClass.classList.add("show-menu");
		}
		
	})

</script>
<?php get_footer(); ?>