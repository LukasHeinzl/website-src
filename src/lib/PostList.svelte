<script>
    import PostListEntry from "$lib/PostListEntry.svelte";
    import Pin from "svelte-material-icons/Pin.svelte";
    import ArrowUp from "svelte-material-icons/ArrowUp.svelte";
    import ArrowDown from "svelte-material-icons/ArrowDown.svelte";

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
        return Object.entries(data.posts).sort((a, b) => {
            let date1 = Date.parse(a[1].published.split(".").reverse().join("-"))
            let date2 = Date.parse(b[1].published.split(".").reverse().join("-"))

            return sortOrder === "newest" ? date2 - date1 : date1 - date2;
        });
    }
</script>

<div>
    <h1>{title}</h1>

    {#await loadData(src) then data}
        {#if data.hasOwnProperty("pinned") && data.posts.hasOwnProperty(data.pinned)}
            <span class="h2 divider-top"><Pin/>Pinned post</span>
            <PostListEntry href={data.pinned} post={data.posts[data.pinned]}/>
            <span class="divider-bottom spacer"></span>
        {/if}

        <button on:click={() => toggleSortOrder()}>
            {#if sortOrder === "newest"}
                <ArrowDown/>
                Newest
            {:else}
                <ArrowUp/>
                Oldest
            {/if}
        </button>

        {#key sortOrder}
            {#each getPostsSorted(data) as [href, post]}
                <PostListEntry {href} {post}/>
            {:else}
                Nothing to show
            {/each}
        {/key}
    {:catch e}
        An error occurred loading the data :(
    {/await}
</div>

<style>
    .divider-top {
        padding-top: 0.5rem;
        border-top: 2px solid gray;
        width: 100%;
        display: block;
    }

    .divider-bottom {
        padding-top: 0.5rem;
        border-bottom: 2px solid gray;
        width: 100%;
        display: block;
    }

    .spacer {
        margin-bottom: 3rem;
    }

    span.h2 {
        display: flex;
        align-items: center;
    }

    button {
        background: white;
        border: 1px solid var(--link-col);
        border-radius: 0.2rem;
        margin-bottom: 0.5rem;
        padding: 0.3rem 0.5rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    button:hover {
        cursor: pointer;
        color: var(--hover-col);
        border-color: var(--hover-col);
    }
</style>