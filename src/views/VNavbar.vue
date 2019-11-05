<template>
	<!-- Vertical navbar -->
	<div class="vertical-nav bg-white" id="sidebar">

<!-- 		<p class="text-gray font-weight-bold text-uppercase px-3 small pb-4 mb-0">Main</p> -->

		<ul class="nav flex-column bg-white mb-0">
			<li class="nav-item">
				<router-link to="/accounts" class="nav-link text-dark font-italic bg-light">
					<i class="fa fa-th-large mr-3 text-primary fa-fw"></i>
					Счета
				</router-link>
			</li>
			<li class="nav-item">
				<router-link to="/opdays" class="nav-link text-dark font-italic bg-light">
					<i class="fa fa-address-card mr-3 text-primary fa-fw"></i>
					Операционные дни
				</router-link>
			</li>
			<li class="nav-item">
				<router-link to="/operations" class="nav-link text-dark font-italic bg-light">
					<i class="fa fa-address-card mr-3 text-primary fa-fw"></i>
					Операции
				</router-link>
			</li>
		</ul>
	</div>
</template>

<style>
.vertical-nav {
	/*min-width: 17rem;*/
	width: 15rem;
	height: 100vh;
	/*position: fixed;*/
	top: 0;
	left: 0;
	box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.1);
	transition: all 0.4s;
}
</style>