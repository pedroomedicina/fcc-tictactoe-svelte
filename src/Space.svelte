<script>
    export let space = '';
    export let winner;

    $: won = winner === space;
</script>

<style>
    .space {
        border: solid 1px gray;
        height: 125px;
        width: 125px;
        flex: 1;
        align-items: center;
        justify-content: center;
        font-size: 75px;
        line-height: 125px;
        text-align: center;
        cursor: pointer;
    }

    .winning{
        color: purple;
    }
</style>

<div class:winning={won} on:click class="space">
    {space}
</div>