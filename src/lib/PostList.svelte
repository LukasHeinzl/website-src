<script>
    import Post from "$lib/Post.svelte";
    import Pin from "svelte-material-icons/Pin.svelte";

    export let title;
    export let src;

    async function loadData(src) {
        let data = await fetch("/posts/" + src + ".json");

        if (data.ok) {
            return await data.json();
        }

        throw new Error();
    }
</script>

<div>
    <h1>{title}</h1>

    {#await loadData(src) then data}
        {#if data.hasOwnProperty("pinned") && data.posts.hasOwnProperty(data.pinned)}
            <span class="h2 divider-top"><Pin/>Pinned post</span>
            <Post href={data.pinned} post={data.posts[data.pinned]}/>
            <span class="divider-bottom spacer"></span>
        {/if}

        {#each Object.entries(data.posts) as [href, post]}
            <Post {href} {post}/>
        {/each}
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
</style>