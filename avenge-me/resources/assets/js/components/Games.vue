<template lang="jade">
div()
	p()
		router-link(:to="{ name: 'players', params: { id: 'all' } }") All Games
	router-link(:to="{ name: 'players', params: { id: game.id } }", v-for="game in games", class="col-xs-6")
		div(class="game-cover", :style="{backgroundImage: 'url(' + game.thumb + ')'}")
			div(class="game-title") {{ game.title }}
</template>

<script>
import { mapState } from 'vuex'

export default {
	computed: mapState({
		games: (state) => state.games 
	})	
}
</script>

