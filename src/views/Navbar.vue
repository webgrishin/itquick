<template>
	<div>
	<b-navbar toggleable="lg" type="dark" variant="info">
		<b-navbar-brand to="/">
			<img alt="Vue logo" src="../assets/logo.png" height="30">
			ItQuick
		</b-navbar-brand>

		<b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
		<b-collapse id="nav-collapse" is-nav>
			<b-navbar-nav>
				<b-nav-item to="/">Button1</b-nav-item>
        		<b-nav-item to="/" disabled>Button2</b-nav-item>
	        </b-navbar-nav>
        </b-collapse>
	</b-navbar>
</div>
</template>

<script>
export default {
	name: 'navbar',
}
</script>