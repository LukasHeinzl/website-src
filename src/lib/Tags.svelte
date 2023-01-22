<script>
    import Label from "svelte-material-icons/Label.svelte";

    export let tags;
</script>

<div class="tags">
    <Label/> Tags:
    <div class="list">
        {#each tags as tag}
            <span class="hover">{tag}</span>
        {:else}
            None
        {/each}
    </div>
</div>

<style>
    .tags {
        display: flex;
        align-items: center;
        padding: 0.4rem 0;
    }

    .tags > .list {
        margin-left: 0.5rem;
        display: flex;
        gap: 0.5rem
    }

    .tags > .list > span {
        background: var(--link-col);
        color: white;
        padding: 0.3rem 0.7rem;
        border-radius: 0.4rem;
    }
</style>