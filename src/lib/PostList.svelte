<script>
    import PostListEntry from "$lib/PostListEntry.svelte";
    import Pin from "svelte-material-icons/Pin.svelte";
    import ArrowUp from "svelte-material-icons/ArrowUp.svelte";
    import ArrowDown from "svelte-material-icons/ArrowDown.svelte";
    import NewspaperVariantOutline from 'svelte-material-icons/NewspaperVariantOutline.svelte';

    export let title;
    export let src;

    let sortOrder = "newest";

    async function loadData(src) {
        let data = await fetch("/posts/" + src + "/data.json");

        if (data.ok) {
            return await data.json();
        }

        throw new Error();
    }

    function toggleSortOrder() {
        sortOrder = sortOrder === "newest" ? "oldest" : "newest";
    }

    function getPostsSorted(data) {
        data = Object.entries(data.posts);
        return sortOrder === "newest" ? data.reverse() : data;
    }
</script>

<div>
    <h1>{title}</h1>

    <p class="title h2">
        <span class="icon">
            <Pin/>
        </span>
        <span class="caption">
            Pinned post
        </span>
    </p>
    {#await loadData(src) then data}
        {#if data.hasOwnProperty("pinned") && data.posts.hasOwnProperty(data.pinned)}
            <div class="post pinned">
                <PostListEntry href={data.pinned} post={data.posts[data.pinned]}/>
            </div>
        {/if}

        <p class="title h2">
        <span class="icon">
            <NewspaperVariantOutline/>
        </span>
            <span class="caption">
            Recent posts
        </span>
        </p>

        <button on:click={() => toggleSortOrder()}>
            {#if sortOrder === "newest"}
                <ArrowDown/>
                <strong>Newest</strong> first
            {:else}
                <ArrowUp/>
                <strong>Oldest</strong> first
            {/if}
        </button>

        {#key sortOrder}
            {#each getPostsSorted(data) as [href, post]}
                <div class="post">
                    <PostListEntry {href} {post}/>
                </div>
            {:else}
                Nothing to show
            {/each}
        {/key}
    {:catch e}
        An error occurred loading the data :(
    {/await}
</div>

<style>
    .post {
        margin-bottom: 2rem;
        background-color: var(--bg-main);
        border-radius: .7rem;
        padding: 2rem;
        box-shadow: 2px 3px 5px rgba(0, 0, 0, 0.2);
    }

    .title {
        display: flex;
        flex-flow: row nowrap;
        justify-content: flex-start;
        align-items: flex-start;
        gap: .7rem;
    }

    button {
        color: var(--link-col);
        background: transparent;
        border: 2px solid var(--link-col);
        border-radius: 0.2rem;
        margin-bottom: 0.5rem;
        padding: .5rem .8rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        cursor: pointer;

        transition: all 200ms ease-out;
    }

    button:hover {
        color: var(--bg-main);
        border-color: transparent;
        background-color: var(--link-col);
    }
</style>