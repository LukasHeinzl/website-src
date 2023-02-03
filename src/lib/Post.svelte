<script>
    import SvelteMarkdown from "svelte-markdown";
    import Tags from "$lib/Tags.svelte";
    import ArrowLeft from "svelte-material-icons/ArrowLeft.svelte";
    import ArrowRight from "svelte-material-icons/ArrowRight.svelte";

    export let type;
    export let src;

    async function loadPost() {
        let data = await fetch("/posts/" + type + "/data.json");

        if (data.ok) {
            data = await data.json()
            let post = data.posts[src];
            let keys = Object.keys(data.posts);
            let idx = keys.indexOf(src);

            if (idx > 0) {
                post.previousPost = data.posts[keys[idx - 1]];
                post.previousPostHref = keys[idx - 1];
            }

            if (idx > -1 && idx < keys.length - 1) {
                post.nextPost = data.posts[keys[idx + 1]];
                post.nextPostHref = keys[idx + 1];
            }

            let text = await fetch("/posts/" + type + "/" + src + ".md");
            post.content = await text.text();
            return post;
        }

        throw new Error();
    }
</script>

{#await loadPost(src) then post}
    <h1>{post.title}</h1>
    <div id="metadata">
        <span>Published: {post.published}</span>
        <Tags tags={post.tags}/>
    </div>
    <SvelteMarkdown source={post.content}/>

    <div class="prevNext">
        {#if post.previousPost !== undefined}
            <a href="../{post.previousPostHref}/" class="prev">
                <span class="arrow"><ArrowLeft/></span>
                <span class="title">{post.previousPost.title}</span>
                <span class="type">Previous</span>
            </a>
        {:else}
            <span></span>
        {/if}

        {#if post.nextPost !== undefined}
            <a href="../{post.nextPostHref}/" class="next">
                <span class="title">{post.nextPost.title}</span>
                <span class="type">Next</span>
                <span class="arrow"><ArrowRight/></span>
            </a>
        {:else}
            <span></span>
        {/if}
    </div>
{:catch e}
    An error occurred during loading {e}
{/await}

<style>
    #metadata {
        margin-bottom: 1rem;
    }

    .prevNext {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        gap: 0.5rem;
    }

    .prevNext .prev {
        display: grid;
        column-gap: 0.4rem;
        min-width: 10rem;
        grid-template-areas:
            "arrow title"
            "arrow type";
    }

    .prevNext .next {
        display: grid;
        column-gap: 0.4rem;
        grid-template-areas:
            "title arrow"
            "type arrow";
        text-align: right;
        margin-left: auto;
    }

    .prevNext .arrow {
        grid-area: arrow;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .prevNext .title {
        grid-area: title;
    }

    .prevNext .type {
        grid-area: type;
        font-size: 90%;
        font-style: italic;
    }
</style>