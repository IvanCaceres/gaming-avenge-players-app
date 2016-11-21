<template lang="jade">
div(class="players-table single-result")
		div() Player Report: \#{{player.id}}
		h3() Name:
		p() {{player.name}}
		h3() Game:
		p() {{player.game_title}}
		h3() Added by:
		p() {{player.user_added}}
		h3() Date Added:
		p() {{ player.added }}
		h3() Description:
		p() {{ player.description }}
		h3() Avenged:
		p() {{ player.avenged }}

		p() I have exacted revenge and crushed your enemy
			br()
			span() (click to complete)
		button(v-if="!player.avenged",class="avenged-btn", :disabled="player.avenged", v-on:click.prevent="submit") Avenged
		button(v-if="player.avenged",class="avenged-btn completed", v-on:click.prevent="") Completed

	//- router-link(:to="{ path: '/auth/login' }", v-for="player in players", class="results-row")
	//- 	div(class="username") {{player.name}}
	//- 	div(class="game") {{player.game_title}}
	//- 	div(class="added-user") {{player.user_added}}
	//- 	div(class="players-date") {{ player.added }}
	//- 	div(class="players-description") {{ player.description }}
	//- 	div(class="players-avenged") {{ player.avenged }}
</template>

<script>
import { mapState } from 'vuex'

export default {
	data: function(){
		return {
			player: {
				name: null,
				avenged: false
			},
			initialFetch: null
		}
	},
	watch: {
		'$route': 'filterData'
	},
	computed: mapState({
		players: (state) => state.players,
		token: (state) => state.auth.token 
	}),
	created(){
		var that = this;
		console.log("in the player!! module")
		client({ path: 'api/player/' +  this.$route.params.id}).then(
			function (response) {
				console.log("show the single player response", response)
				that.player = response.entity.data
			},
			function (response) {
			}
		)
	},
	methods: {
		submit(){
			var that = this;
			var reqForm = new FormData();
			reqForm.append("name", that.player.name)
			reqForm.append("avenged", true)
			reqForm.append("game_id", that.player.game_id)
			$.ajax({
		        url: 'api/player/' + that.$route.params.id,
		        type: 'POST',
		        data: reqForm,
		        async: true,
		        success: function (data) {
		        	swal({
		        		title: 'Yay',
		        		text: "This player case has been avenged. VICTORYYYYYY!",
		        		type: 'success'
		        	})
		        	that.player.avenged = true;
		        },
		        error: function(jqXHR, textStatus, errorThrown){
		        	swal({
		        		title: 'Oops!',
		        		text: jqXHR.responseJSON.error || jqXHR.responseJSON.message,
		        		type: 'error'
		        	})
		        },
		        cache: false,
		        contentType: false,
		        processData: false,
		        headers: {"Authorization": "Bearer " + that.token}
		    })
		}
	}
}
</script>

