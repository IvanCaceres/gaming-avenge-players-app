<template lang="jade">
div()
	h1() Add a new game
	form(method="post", enctype="multipart/form-data", v-on:submit.prevent="submitGame")
		div(v-show="!imgData", class="cover-placeholder")
			h3() Upload Cover
			input(name="files", type="file", id="imageUpload", v-on:change="imgChange")
		img(id="cover-upload-preview", v-if="imgData", :src="imgData")
		div(class="row")
			input(name="title", class="game-title-input form-control", placeholder='enter game title', v-model="title")
		input(class="submit-game", type="submit")
</template>

<script>
import { mapState } from 'vuex'

export default {
	data: function() {
		return {
			title: null,
			imgData: null
		}
	},
	mounted(){
		console.log("mounted the add game module")
	},
	computed: mapState({
		games: (state) => state.games,
		token: (state) => state.auth.token
	}),
	methods:{
		imgChange(e){
			var that = this
			console.log("img file changing", e)
			that.imgData = URL.createObjectURL(e.target.files[0])
		},
		cleanForm(){
			this.imgUpload = null;
			this.imgData = null;
			this.title = null;
		},
		submitGame(e){
			var that = this;
			var gameData = new FormData(e.target)
			console.log("show gameData", gameData)
			console.log("within submit game callback show that", that.token)
			
			$.ajax({
		        url: 'api/games',
		        type: 'POST',
		        data: gameData,
		        async: true,
		        success: function (data) {
		        	that.$store.commit('ADD_GAME', data.data)
		        	swal({
		        		title: 'Yay',
		        		text: "The new game: " + data.data.title + " was added.",
		        		type: 'success'
		        	})
		        	that.cleanForm()
		        	console.log("created the new game show data", data)
		        },
		        error: function(jqXHR, textStatus, errorThrown){
		        	console.log("error callback!!!!", jqXHR)
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

			// client({ path: 'api/games', entity: gameData }).then(
		 //        function (response) {
		 //          console.log("show the response dude", response)
		 //          commit(types.USER_TOKEN_FETCHED, response.entity.token)
		 //          dispatch('fetchUserData')
		 //        },
		 //        function (response) {
		 //          // that.messages = []
		 //          // if (response.status && response.status.code === 401) that.messages.push({type: 'danger', message: 'Sorry, you provided invalid credentials'})
		 //          // that.loggingIn = false
		 //        }
			// )
		}
	}	
}
</script>

