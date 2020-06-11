<script>
	import Space from './Space.svelte';
	import gameStore from './game-store.js';
	import { nextMove, newGame } from './requests.js';

	let board = ["", "", "", "", "", "", "", "", ""];
	let nextPlayer = "";
	let winner;
	let numberOfPeeps = 0;
	let errorMessage;

	gameStore.subscribe(data => {
		if(!data){
			return
		}

		board = data.board;
		winner = data.winner;
		nextPlayer = data.nextPlayer;
		numberOfPeeps = data.numberOfPeeps;
	})

	async function takeSpace(space) {
		debugger
		if(winner || !gameStore.isConnected){
			return;
		}

		errorMessage = await nextMove(space);
	}

	async function reset() {
		errorMessage = await newGame();
	}
</script>

<style>
	main{
		width: 475px;
		margin: 0 auto;
		border: black solid;
		height: 1000px;
	}

	.row{
		display: flex;
	}

	button {
		width: 100%;
		margin-top: 20px;
		border-radius: 0;
		background-color: lightblue;
		font-size: 30px;
		cursor: pointer;
	}

	button:hover{
		outline: none;
	}

	.errorMessage{
		color: red;
		font-size: 20px;
	}
</style>

<main>
	<h1>Tic Tac Toe</h1>
	<h2>Number of people playing: {numberOfPeeps}</h2>
	{#if winner === "TIE"}
		<h2>Empate!</h2>
	{:else if winner}
		<h2>¡{winner} ganó!</h2>
	{:else}
		<h2>Player: {nextPlayer} </h2>
	{/if}
	<div class="row">
		<Space {winner} space={board[0]} on:click="{() => takeSpace(0)}"/>
		<Space {winner} space={board[1]} on:click="{() => takeSpace(1)}"/>
		<Space {winner} space={board[2]} on:click="{() => takeSpace(2)}"/>
	</div>
	<div class="row">
		<Space {winner} space={board[3]} on:click="{() => takeSpace(3)}"/>
		<Space {winner} space={board[4]} on:click="{() => takeSpace(4)}"/>
		<Space {winner} space={board[5]} on:click="{() => takeSpace(5)}"/>
	</div>
	<div class="row">
		<Space {winner} space={board[6]} on:click="{() => takeSpace(6)}"/>
		<Space {winner} space={board[7]} on:click="{() => takeSpace(7)}"/>
		<Space {winner} space={board[8]} on:click="{() => takeSpace(8)}"/>
	</div>
	{#if winner}
		<button on:click="{reset}">New Game</button>
	{/if}
	{#if errorMessage}
	<p class="errorMessage">
		{errorMessage}
	</p>
	{/if}
</main>