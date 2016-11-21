<template lang="jade">
div()
	nav-html()
	//- div(class="container app-screen")
	//- 	h1() TEST TEST TEST
	//- 	//- <!-- Tabs -->
	//- 	div(class="col-md-3")
	//- 		div(class="panel panel-default panel-flush")
	//- 			div(class="panel-heading") Home
	//- 			div(class="panel-body")
	//- 				div(class="app-tabs")
	//- 					ul(class="nav app-tabs-stacked")
	//- 						li()
	//- 							router-link(:to="{ path: '/home/welcome' }")
	//- 								i(class="fa fa-btn fa-fw fa-list")
	//- 								span() &nbsp;Welcome
	//- 						li()
	//- 							router-link(:to="{ path: '/home/about'}")
	//- 								i(class="fa fa-btn fa-fw fa-lightbulb-o")
	//- 								span() &nbsp;About us
	//- 	//- <!-- Tab Panes -->
	//- 	div(class="col-md-9")
	//- 		div(class="tab-content")
	//- 			div(class="tab-pane")
	//- 				div(class="panel panel-default")
	//- 					router-view()
	div(class="container")
		div(class="content")
			div(class="title m-b-md") Zac's List
			//- div(class="links")
			//- 	a(href="https://laravel.com/docs") Documentation
			//- 	a(href="https://laracasts.com") Laracasts
			//- 	a(href="https://laravel-news.com") News
			//- 	a(href="https://forge.laravel.com") Forge
			//- 	a(href="https://github.com/laravel/laravel") GitHub
			router-view()
		router-link(class="submit-game avenge-me noselect", :to="{ path: '/add' }")
			img(src="/img/Salvaged_Sword_icon.png")
			span() Avenge Me
</template>

<script>
import NavHtml from './Nav.vue'

    export default {
    	components:{
    		NavHtml
    	},
        mounted() {
            console.log('Home Component ready dawg.')
        }
    }
</script>
