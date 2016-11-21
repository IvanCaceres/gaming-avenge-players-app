<template lang="jade">
div()
	h1() Add a player to the revenge list
	form(class="add-player", method="post", enctype="multipart/form-data", v-on:submit.prevent="submitPlayer")
		div(class="row")
			input(name="name", class="game-title-input form-control", placeholder='enter player name', v-model="player_name")
			select(name="game_id", class="choose-game", v-model="gameChosen", placeholder="TEST", required)
				option(value="", disabled) Choose a game
				option(v-for="option in games", v-bind:value="option.id") {{ option.title }}
			textarea(name="description", class="game-title-input form-control", placeholder='enter description', v-model="description")
		input(class="submit-game", type="submit")
</template>

<script>
import { mapState } from 'vuex'

export default {
	data: function() {
		return {
			player_name: null,
			gameChosen: "",
			description: null
		}
	},
	computed: mapState({
		games: (state) => state.games,
		token: (state) => state.auth.token
	}),
	methods:{
		cleanForm(){
			this.imgUpload = null;
			this.imgData = null;
			this.title = null;
		},
		submitPlayer(e){
			var that = this;
			var playerData = new FormData(e.target)
			
			$.ajax({
		        url: 'api/games/add_player',
		        type: 'POST',
		        data: playerData,
		        async: true,
		        success: function (data) {
		        	swal({
		        		title: 'Yay',
		        		text: "The new player: " + data.data.name + " was added.",
		        		type: 'success'
		        	})
		        	that.cleanForm()
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

